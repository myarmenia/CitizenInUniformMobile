import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import { NavigationProp, ParamListBase, RouteProp, useIsFocused } from "@react-navigation/native";
import Background from "../components/Background";
import { useNotify, useSocket, useTheme } from "../hooks";
import { useEffect, useMemo, useState } from "react";
import { IStyles } from "../contexts/ThemeContext";
import Loading from "../components/Loading";
import ChatList from "../components/ChatList";
import MessageInput from "../components/MessageInput";
import { IMessage, IRoom } from "../interfaces/data.types";
import { axiosInstanceBack } from "../api";
import { navigationTypes } from "../navigation/navigation.types";
import { useChat } from "../hooks/useChat";
import { handleTitle } from "../components/RoomItem";
import { useQueryClient } from "@tanstack/react-query";
import { updateSituation } from "../api/requests";

interface IProps {
    navigation: NavigationProp<ParamListBase>
    route: RouteProp<any>
}

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function sendMessageToBack({ room_id, writer_id, content, writer }: any) {
    try {
        const data = await axiosInstanceBack.post("/api/message/create", { room_id, writer_id, content, writer })
        return data.data;

    } catch (error) {
        console.error(error)
    }
}

export default function ChatScreen({ navigation, route }: IProps) {

    const { colors, isDarkTheme, coefficient } = useTheme();
    const fontSize = (size: number) => size * coefficient;
    const stylesMemo = useMemo(() => styles({ colors, fontSize }), [isDarkTheme, coefficient]);
    const { socket, socketId } = useSocket();    
    const { setEnabled } = useNotify();

    const isFocused = useIsFocused();
    const { activeRooms, activeRoomID, setActiveRoomID, refetch } = useChat();


    const userId = route.params?.userId;
    const roomId = route.params?.roomId;
    const isActive = route.params?.isActive;
    const type = route.params?.type;

    let messagesList = route.params?.messages;
    const queryClient = useQueryClient();

    const room = useMemo(() => {

        return activeRooms.find(room => room.id === roomId) as IRoom;
    }, [activeRooms]);

    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<IMessage[]>(messagesList ? [...messagesList] : []);
    const [value, setValue] = useState('');

    useEffect(() => {
        if (isFocused) {
            onRead();
        }
    }, [isFocused, messages])

    useEffect(() => {
        if (isFocused) {
            setActiveRoomID(roomId)
        } else {
            setActiveRoomID(-1)
        }
    }, [isFocused])



    useEffect(() => {
        if (messages?.length) {
            messages.forEach(async message => {
                if (message?.readed === 0 && message?.writer === 'operator') {
                    try {
                        console.log('is read: ', message.content);
                        await updateSituation(message);
                    } catch {
                        console.log('messsge situation is not supdated');
                    }
                }
            });
        }
    }, [!!messages])

    useEffect(() => {
        const lastMessage = messages[0];
        if (lastMessage?.readed === 0 && lastMessage?.writer === 'operator') {
            updateSituation(lastMessage);
        }
    }, [messages])

    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: ['rooms'] })
        const focus = navigation.addListener('focus', () => {
            console.log('focus');
            
            setEnabled(false);
        })
        const blur = navigation.addListener('blur', () => {
            setEnabled(true);
            console.log('blur');
            
        })

        return () => {
            focus();
            blur();
        }
        
    }, [])

    useEffect(() => {
        if (room) {
            setMessages(room.messages);
        }
    }, [room])

    const onRead = async () => {
        try {
            socket.emit("operatorMessageWasReaded", { id: roomId })
            refetch()
        } catch (error) {
            console.error(error)
        }
    };

    const onSend = async () => {
        try {
            if (value.trim().length === 0) {
                return;
            }
            const newMessage = {
                writer_id: userId,
                writer: 'user',
                content: value,
                room_id: roomId,
            };

            const data = await sendMessageToBack(newMessage)
            
            socket.emit('create_message', data.message)
            console.log('create_message',socket.id , data.message);
            setValue('');
        } catch (error) {
            console.log('ERROR: onSend', error);
        }

    }

    return (
        <Background>
            {
                !isLoading
                    ? <>
                        <View style={stylesMemo.container}  >
                            <Header navigation={navigation} goBackAction={true} />
                            {(room || type) && <Text style={stylesMemo.title}>
                                {handleTitle(room?.governing_body_id ?? type)}
                            </Text>}
                            <KeyboardAvoidingView
                                behavior="padding"
                                style={{ flex: 1 }}
                                keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : undefined}
                                enabled={Platform.OS === 'ios'}
                            >
                                <ChatList
                                    messages={messages}
                                />
                                <MessageInput
                                    value={value}
                                    setValue={setValue}
                                    onSend={onSend}
                                    disabled={!(isActive !== false)}
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