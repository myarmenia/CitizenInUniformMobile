import { useMemo, } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../hooks";
import { IStyles } from "../contexts/ThemeContext";
import { IFAQ, ISubFAQ } from "../interfaces/data.types";
import FACRenderItem from "./FACRenderItem";
import { appStyles } from "../styles";

interface IProps {
    data: IFAQ
}

function FACItem({ data }: IProps) {

    const { colors, isDarkTheme, coefficient } = useTheme();
    const fontSize = (size: number) => size * coefficient;
    const stylesMemo = useMemo(() => styles({ colors, fontSize }), [isDarkTheme, coefficient]);

    const renderItem = ({ item, index }: { item: ISubFAQ, index: number }) => {
        return (
            <FACRenderItem
                data={item}
                isLastItem={index === data.f_a_q_sub_categories.length - 1}
            />
        )
    }

    return (
        <View style={stylesMemo.container}>
            <View style={stylesMemo.titleBox}>
                <Text style={stylesMemo.title}>{data.title}</Text>
            </View>
            <FlatList
                data={data.f_a_q_sub_categories}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ paddingHorizontal: 20 }}
            />
        </View>
    );
}

export default FACItem;

const styles = ({ colors, fontSize }: IStyles) => {
    return StyleSheet.create({
        container: {
            backgroundColor: colors.BACKGROUND_2,
            marginBottom: 20,
            borderRadius: 8,
            ...appStyles({colors, fontSize}).shadow

        },
        title: {
            fontSize: fontSize(18),
            fontFamily: "NotoSansArmenian",
            fontWeight: "700",
            color: colors.TEXT_COLOR,
        },
        titleBox: {
            padding: 10
        }
    })
}
