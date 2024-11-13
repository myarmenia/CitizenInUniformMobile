import { memo, useMemo } from "react";
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useModal, useTheme } from "../hooks";
import { closeIcon, errorIcon, successIcon } from "../assets/icons";
import { appStrings } from "../assets/appStrings";
import { NOTO_SANS_ARMENIAN } from "../assets/fonts/fontFamily";
import { ColorScheme, IStyles } from "../contexts/ThemeContext";
;

function CustomModal() {

    const { visible, hideModal, showModal, isSuccess } = useModal();

    const { colors, isDarkTheme, coefficient } = useTheme()
    const fontSize = (size: number) => size * coefficient;
    const stylesMemo = useMemo(() => styles({ colors, fontSize }), [isDarkTheme, coefficient])


    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
        >
            <Pressable
                onPress={hideModal}
                style={stylesMemo.wrapper}
            >
                <Pressable style={stylesMemo.container} >
                    <View style={stylesMemo.header} >
                        <TouchableOpacity style={stylesMemo.close} onPress={hideModal} >
                            {closeIcon()}
                        </TouchableOpacity>
                    </View>
                    <View style={stylesMemo.content} >
                        <View>
                            {isSuccess ? successIcon() : errorIcon()}
                        </View>

                        <Text style={stylesMemo.label} >
                            {isSuccess ? appStrings.emailSuccess : appStrings.emailError}
                        </Text>
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    )
}

export default CustomModal;
const styles = ({ colors, fontSize }: IStyles) => {
    return StyleSheet.create({
        container: {
            height: 200,
            width: '100%',
            backgroundColor: colors.BACKGROUND_2 ,
            borderRadius: 6,
            alignItems: 'center'
        },
        wrapper: {
            flex: 1,
            backgroundColor: 'rgba(35, 35, 35, 0.8)',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 16,
        },
        header: {
            width: '100%',
            alignItems: 'flex-end',
        },
        close: {
            padding: 16
        },
        content: {
            flex: 1,
            alignItems: 'center',
            gap: 20,
        },
        label: {
            fontSize: fontSize(16),
            fontWeight: '400',
            lineHeight: 27,
            fontFamily: NOTO_SANS_ARMENIAN,
            textAlign: 'center',
            color: colors.TEXT_COLOR,

        },
    })
}