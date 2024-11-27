import { memo, useEffect, useMemo, useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useTheme } from "../hooks";
import { IStyles } from "../contexts/ThemeContext";
import { fakeMessagesList } from "../data/fakeData";
import { IMessage } from "../interfaces/data.types";
import Message from "./Message";


interface IProps {
    messages: IMessage[];
    flatListRef: React.RefObject<FlatList<IMessage>>
}

function ChatList({ messages, flatListRef }: IProps) {

    const { colors, isDarkTheme, coefficient } = useTheme();
    const fontSize = (size: number) => size * coefficient;
    const stylesMemo = useMemo(() => styles({ colors, fontSize }), [isDarkTheme, coefficient]);


    useEffect(() => {
        if (flatListRef.current && messages.length) {
            flatListRef.current.scrollToOffset({offset: 0, animated: true });
        }
    }, [messages.length]);


    return (
        <View style={stylesMemo.container}>
            <FlatList
                ref={flatListRef}
                data={messages}
                renderItem={({ item }) => <Message message={item} />}
                keyExtractor={(item, index) => item.id?.toString()!+ item.content }
                style={{ flex: 1 }}
                contentContainerStyle={stylesMemo.contentContainer}
                inverted
            />
        </View>
    );
}

export default ChatList;

const styles = ({ colors, fontSize }: IStyles) => {
    return StyleSheet.create({
        container: {
            flex: 1,
        },
        title: {
            fontSize: fontSize(18),
            fontFamily: "NotoSansArmenian",
            fontWeight: "400",
            textAlign: "center",
            color: colors.TEXT_COLOR,
        },
        contentContainer: {
            paddingHorizontal: 16,
            gap: 10,
            paddingBottom: 0,
            flexGrow: 1
        }
    })
}
