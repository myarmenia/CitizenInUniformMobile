import { StyleSheet, Text, View } from "react-native"
import CustomModal from "./Modal"
import Toast from "react-native-toast-message"
import { toastConfig } from "../utils/toastConfig"
import { useTheme } from "../hooks"
import { useMemo } from "react"
import { IStyles } from "../contexts/ThemeContext"
import { darkColors } from "../assets/appColors"
import { appStyles } from "../styles"


interface IProps {
    children: React.ReactNode
}
export default function Middleware({ children }: IProps) {

    const { colors, isDarkTheme, coefficient } = useTheme();
    const fontSize = (size: number) => size * coefficient;
    const stylesMemo = useMemo(() => styles({ colors, fontSize }), [isDarkTheme, coefficient])

    return (
        <>
            {children}
            <Toast
                config={toastConfig(stylesMemo)}
            />
            <CustomModal />
        </>
    )
}


const styles = ({ colors, fontSize }: IStyles) => {
    return StyleSheet.create({

        customContainer: {
            flex: 1,
            justifyContent: 'center',
            marginBottom: 10,
            gap: 5

        },
        customText1: {
            fontSize: fontSize(18),
            fontWeight: 'bold',
            color: colors.TEXT_COLOR,
        },
        customText2: {
            fontSize: fontSize(14),
            fontWeight: 'bold',
            color: colors.DISABLED,
        },
        wrapper: {
            flexDirection: 'row',
            marginHorizontal: 10,
            backgroundColor: colors.BACKGROUND_2,
            ...appStyles({ colors, fontSize }).shadow,
            borderRadius: 10,
            shadowColor: colors.BUTTON_BORDER

        },
        icon: {
            transform: [{
                scale: .8
            }],
            padding: 10,
            alignItems: 'center', 
            justifyContent: 'center'
        }

    });
};
