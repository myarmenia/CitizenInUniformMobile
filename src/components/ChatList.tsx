import { memo, useEffect, useMemo, useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useTheme } from "../hooks";
import { IStyles } from "../contexts/ThemeContext";
import { IMessage } from "../interfaces/data.types";
import Message from "./Message";


interface IProps {
    messages: IMessage[];
}

function ChatList({ messages }: IProps) {

    const { colors, isDarkTheme, coefficient } = useTheme();
    const fontSize = (size: number) => size * coefficient;
    const stylesMemo = useMemo(() => styles({ colors, fontSize }), [isDarkTheme, coefficient]);
    const offsetRef = useRef(0)
    const flatListRef = useRef<FlatList<IMessage>>(null);

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
            paddingBottom: 20,
            flexGrow: 1,
            justifyContent: 'flex-end'
        }
    })
}
