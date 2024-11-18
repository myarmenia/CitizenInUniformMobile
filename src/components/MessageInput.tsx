import { memo, useMemo } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useTheme } from "../hooks";
import { IStyles } from "../contexts/ThemeContext";
import { IMessage } from "../interfaces/data.types";
import { sendIcon } from "../assets/icons/sendIcon";
import { appStyles } from "../styles";
import { SafeAreaInsetsContext, useSafeAreaInsets } from "react-native-safe-area-context";
import { appStrings } from "../assets/appStrings";


interface IProps {
    value: string;
    setValue: (text: string) => void,
    onSend: () => void,
}

function Message({ value, setValue, onSend }: IProps) {

    const { colors, isDarkTheme, coefficient } = useTheme();
    const fontSize = (size: number) => size * coefficient;
    const stylesMemo = useMemo(() => styles({ colors, fontSize }), [isDarkTheme, coefficient]);

    const MAX_HEIGHT = 5 * 26 + 30;
    const insets = useSafeAreaInsets()
    const bottom = insets ? insets.bottom + 20 : 20;
    return (
        <View style={[stylesMemo.container, { marginBottom: bottom }]}  >
            <View style={{ flex: 1, borderRadius: 8 }} >
                <TextInput
                    style={[stylesMemo.input, stylesMemo.label, { maxHeight: MAX_HEIGHT }]}
                    multiline
                    placeholder={appStrings.sendMessage}
                    onChangeText={setValue}
                    value={value}
                />
            </View>
            <TouchableOpacity
                onPress={onSend}
                style={stylesMemo.button}
            >
                {sendIcon()}
            </TouchableOpacity>
        </View>
    )
}

export default memo(Message);

const styles = ({ colors, fontSize }: IStyles) => {
    return StyleSheet.create({
        container: {
            minHeight: 56,
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            ...appStyles({ colors, fontSize }).shadow,
            marginBottom: 40,
            backgroundColor: colors.BACKGROUND_2,
            marginHorizontal: 16,
            borderRadius: 8,
            marginTop: 16
        },
        label: {
            fontSize: fontSize(16),
            fontFamily: 'NotoSansArmenian',
            fontWeight: '400',
            color: colors.TEXT_COLOR,
            lineHeight: 26
        },
        input: {
            // backgroundColor: 'red',
            paddingVertical: 15,
            borderRadius: 8,
            paddingHorizontal: 16

        },
        button: {
            padding: 16
        }
    })
}
