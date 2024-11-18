import { FlatList, StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Background from "../components/Background";
import { useFormData, useTheme } from "../hooks";
import { useEffect, useMemo, useRef, useState } from "react";
import { IStyles } from "../contexts/ThemeContext";
import Loading from "../components/Loading";
import ChatList from "../components/ChatList";
import MessageInput from "../components/MessageInput";
import { IMessage } from "../interfaces/data.types";
import { fakeMessagesList } from "../data/fakeData";

interface IProps {
    navigation: NavigationProp<ParamListBase>
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default function ChatScreen({ navigation }: IProps) {

    const { colors, isDarkTheme, coefficient } = useTheme();
    const fontSize = (size: number) => size * coefficient;
    const stylesMemo = useMemo(() => styles({ colors, fontSize }), [isDarkTheme, coefficient]);
    const { messageTo } = useFormData();
    const [isLoading, setIsLoading] = useState(true);
    const [ messages, setMessages ] = useState<IMessage[]>([...fakeMessagesList]);
    const [value, setValue] = useState('');

    const flatListRef = useRef<FlatList<IMessage>>(null);

    const onSend = () => {
        if (value.trim().length === 0) {
            return;
        }
        const newMessage: IMessage = {
            id: Math.random().toString(36),
            sender: 'User1',
            message: value,
            createdAt: new Date()
        };
        setMessages([newMessage, ...messages]);
        setValue('');
        flatListRef.current?.scrollToIndex({index: 0, animated: true});
    }

    useEffect(() => {
        (async () => {
            await sleep(3000);
            setIsLoading(false);
        })()
    }, []);

    return (
        <Background>
            {
                !isLoading
                    ? <>
                        <View style={stylesMemo.container}  >
                            <Header navigation={navigation} goBackAction={true} />
                            <Text style={stylesMemo.title}>
                                {messageTo}   
                            </Text>
                            <ChatList
                                messages={messages}
                                flatListRef={flatListRef}
                            />
                            <MessageInput 
                                value={value}
                                setValue={setValue}
                                onSend={onSend}
                            />
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