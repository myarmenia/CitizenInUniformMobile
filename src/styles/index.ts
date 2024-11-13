import { Appearance, StyleSheet } from "react-native";
import { NOTO_SANS_ARMENIAN } from "../assets/fonts/fontFamily";
import { darkColors, lightColors } from "../assets/appColors";
import { ColorScheme, IStyles } from "../contexts/ThemeContext";

export const appStyles = ({ colors, fontSize }: IStyles) => {

    if (!colors) {
        const isDark = Appearance.getColorScheme()
        colors = isDark? darkColors : lightColors;
    }

    return StyleSheet.create({
        shadow: {
            shadowColor: colors?.SHADOW,
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 20
        },

        subTitle: {
            fontSize: fontSize(14),
            fontWeight: "400",
            color: colors?.TEXT_COLOR,
            marginTop: 6,
            lineHeight: 20,
            fontFamily: NOTO_SANS_ARMENIAN,
            textAlign: "center",
        }
    })
} 