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


    // useEffect(() => {
    //     if (flatListRef.current) {
    //         flatListRef.current.scrollToEnd({ animated: false });
    //     }
    // }, [fakeMessagesList]);


    return (
        <View style={stylesMemo.container}>
            <FlatList
                ref={flatListRef}
                data={messages}
                renderItem={({ item }) => <Message message={item} />}
                keyExtractor={(item) => item.id}
                style={{ flex: 1 }}
                contentContainerStyle={stylesMemo.contentContainer}
                inverted
            />
        </View>
    );
}

export default memo(ChatList);

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
            paddingBottom: 40,
            flexGrow: 1
        }
    })
}
