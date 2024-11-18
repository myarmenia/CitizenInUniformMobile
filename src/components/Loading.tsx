import { memo, useMemo } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../hooks";
import { IStyles } from "../contexts/ThemeContext";

function Loading({ title }: { title?: string }) {

    const { colors, isDarkTheme, coefficient } = useTheme();
    const fontSize = (size: number) => size * coefficient;
    const stylesMemo = useMemo(() => styles({ colors, fontSize }), [isDarkTheme, coefficient]);

    return (
        <View style={stylesMemo.wrapper}>
            <ActivityIndicator
                size={"large"}
                color={colors.PRIMARY}
            />
            {title && <Text style={stylesMemo.title} >
                {title}
            </Text>}
        </View>
    );
}

export default memo(Loading);

const styles = ({ colors, fontSize }: IStyles) => {
    return StyleSheet.create({
        wrapper: {
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 100,
            justifyContent: "center",
            alignItems: "center",
            gap: 20
        },
        title: {
            fontSize: fontSize(18),
            fontFamily: "NotoSansArmenian",
            fontWeight: "400",
            textAlign: "center",
            color: colors.TEXT_COLOR,
        }

    })
}
