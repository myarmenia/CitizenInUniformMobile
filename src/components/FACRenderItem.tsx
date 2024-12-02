import { memo, useEffect, useMemo, useRef, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import { useTheme } from "../hooks";
import { IStyles } from "../contexts/ThemeContext";
import { IFAQ, ISubFAQ } from "../interfaces/data.types";
import { arrowIcon } from "../assets/icons";
import { appStyles } from "../styles";


interface IProps {
    data: ISubFAQ,
    isLastItem: boolean
}

function FACRenderItem({ data, isLastItem }: IProps) {

    const { colors, isDarkTheme, coefficient } = useTheme();
    const fontSize = (size: number) => size * coefficient;
    const stylesMemo = useMemo(() => styles({ colors, fontSize }), [isDarkTheme, coefficient]);


    const [toggleVisible, setToggleVisible] = useState(false)



    return (
        <Pressable
            onPress={() => setToggleVisible(!toggleVisible)}
            style={[stylesMemo.container, !isLastItem && { borderBottomWidth: 1}]}
        >
            <View style={stylesMemo.wrapper} >
                <View style={stylesMemo.dotBox} >
                    <View style={stylesMemo.dot} />
                </View>
                <View style={{ flex: 1, alignItems: 'flex-start' }} >
                    <Text style={stylesMemo.title}>{data.title}</Text>
                </View>
                <View style={{ paddingHorizontal: 5, transform: [{ rotate: toggleVisible ? '0deg' : '180deg' }] }} >
                    {arrowIcon(colors.TEXT_COLOR)}
                </View>
            </View>
            { toggleVisible && <View style={stylesMemo.context} >
                <Text style={stylesMemo.label} >
                    {data.content}
                </Text>
            </View>}

        </Pressable>
    );
}

export default memo(FACRenderItem);

const styles = ({ colors, fontSize }: IStyles) => {
    return StyleSheet.create({
        container: {
            borderBottomColor: colors.BUTTON_BORDER,
            paddingVertical: 10,
        },
        wrapper: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        title: {
            fontSize: fontSize(16),
            fontFamily: "NotoSansArmenian",
            fontWeight: "600",
            color: colors.TEXT_COLOR,
            lineHeight: fontSize(27)
        },
        label: {
            fontSize: fontSize(16),
            fontFamily: "NotoSansArmenian",
            fontWeight: "400",
            color: colors.TEXT_COLOR,
            lineHeight: fontSize(27)
        },
        dot: {
            width: fontSize(5),
            height: fontSize(5),
            borderRadius: 5,
            backgroundColor: colors.TEXT_COLOR,

            marginTop: (fontSize(27)) / 2 - fontSize(2),
            marginLeft: 14
        },
        dotBox: {
            width: 30,
            alignSelf: 'flex-start'
        },
        context: {
            paddingLeft: 30,
            paddingRight: 30,
            paddingVertical: 10
        }
    })
}
