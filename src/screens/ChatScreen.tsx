import { Alert, FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import { NavigationProp, ParamListBase, RouteProp, useIsFocused } from "@react-navigation/native";
import Background from "../components/Background";
import { useFormData, useSocket, useTheme } from "../hooks";
import { useEffect, useMemo, useRef, useState } from "react";
import { IStyles } from "../contexts/ThemeContext";
import Loading from "../components/Loading";
import ChatList from "../components/ChatList";
import MessageInput from "../components/MessageInput";
import { IMessage } from "../interfaces/data.types";
import { axiosInstance } from "../api";
import { navigationTypes } from "../navigation/navigation.types";
import { useChat } from "../hooks/useChat";
import { handleTitle } from "../components/RoomItem";

interface IProps {
    navigation: NavigationProp<ParamListBase>
    route: RouteProp<any>
}

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function sendMessageToBack({ room_id, writer_id, content, writer }: any) {
    try {
        const data = await axiosInstance.post("https://citizenb.trigger.ltd/api/message/create", { room_id, writer_id, content, writer })
        return data.data

    } catch (error) {
        console.error(error)
    }
}

export default function ChatScreen({ navigation, route }: IProps) {

    const { colors, isDarkTheme, coefficient } = useTheme();
    const fontSize = (size: number) => size * coefficient;
    const stylesMemo = useMemo(() => styles({ colors, fontSize }), [isDarkTheme, coefficient]);
    const { messageTo } = useFormData();
    const { socket } = useSocket();
    const isFocused = useIsFocused();
    const { rooms, isUpdate } = useChat();

    
    const userId = route.params?.userId;
    const roomId = route.params?.roomId;
    const isActive = route.params?.isActive;

    let messagesList = route.params?.messages;

    const room = rooms.active.find(room => room.id === roomId);
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<IMessage[]>(messagesList? [...messagesList]: []);
    const [value, setValue] = useState('');

    const flatListRef = useRef<FlatList<IMessage>>(null);

    useEffect(() => {
        if (isFocused) {
            onRead();
        }
    }, [isFocused])    

    useEffect(() => {
        if (room) {
            setMessages(room.messages);
        } else {
            console.log('No messages');
        }
    }, [room, isUpdate])

    const onRead = async () => {
        try {
            socket.emit("operatorMessageWasReaded", { id: roomId })

        } catch (error) {
            console.error(error)
        }
    };

    const onSend = async () => {
        try {
            if (value.trim().length === 0) {
                return;
            }
            const newMessage: IMessage = {
                writer_id: userId,
                writer: 'user',
                content: value,
                room_id: roomId,
            };

            const data = await sendMessageToBack(newMessage)
            console.log('data.message-------------------------',data.message);

            socket.emit('create_message', data.message)
            setValue('');
            // flatListRef.current?.scrollToEnd({ animated: true });

        } catch (error) {
            console.log('ERROR: onSend', error);
        }

    }

    // useEffect(() => {
    //     socket.on('receive_message', (data: IMessage) => {
    //         setMessages((prev) => {
    //             console.log('message received ---------------->', data);
    //             return [data, ...prev];
    //         });
    //         onRead()
    //         flatListRef.current?.scrollToOffset({offset: 0, animated: true });
    //     })

    //     socket.on('roomEnded', (roomId:string) => {
    //         console.log('endRoom--------',);
            
    //         // Alert.alert(
    //         //     'Alert',
    //         //     'Chat End.',
    //         //     [
    //         //         {
    //         //             text: 'OK',
    //         //             onPress: () => navigation.navigate(navigationTypes.HOME)
    //         //         },
    //         //     ],
    //         //     { cancelable: false }
    //         // );
    //     })

    //     return () => {
    //         socket.off('receive_message');
    //         socket.off('end_chat');
    //     }
    // }, []);


    // useEffect(() => {
    //     (async () => {
    //         await sleep(3000);
    //         setIsLoading(false);
    //     })()
    // }, []);

    return (
        <Background>
            {
                !isLoading
                    ? <>
                        <View style={stylesMemo.container}  >
                            <Header navigation={navigation} goBackAction={true} />
                            {room && <Text style={stylesMemo.title}>
                                {handleTitle(room)}
                            </Text>}
                            <KeyboardAvoidingView
                                behavior="padding"
                                style={{ flex: 1 }}
                                keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : undefined}
                                enabled={Platform.OS === 'ios'}
                            >
                                <ChatList
                                    messages={messages}
                                    flatListRef={flatListRef}
                                />
                                <MessageInput
                                    value={value}
                                    setValue={setValue}
                                    onSend={onSend}
                                    disabled={!isActive}
                                />
                            </KeyboardAvoidingView>
                        </View>
                    </>
                    : <Loading title="Please a wait ..." />
            }

        </Background>
    )
};


const styles = ({ colors, fontSize }: IStyles) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            width: '100%',
            height: '100%',
        },
        title: {
            fontSize: fontSize(18),
            fontFamily: 'NotoSansArmenian',
            fontWeight: '400',
            textAlign: 'center',
            color: colors.TEXT_COLOR,
            marginVertical: 16,
        }
    })
}  