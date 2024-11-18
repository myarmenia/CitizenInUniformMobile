import { memo, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../hooks";
import { IStyles } from "../contexts/ThemeContext";
import { IMessage } from "../interfaces/data.types";
import { appStyles } from "../styles";


interface IProps {
    message: IMessage
}

function Message({ message}: IProps) {

    const { colors, isDarkTheme, coefficient } = useTheme();
    const fontSize = (size: number) => size * coefficient;
    const stylesMemo = useMemo(() => styles({ colors, fontSize }), [isDarkTheme, coefficient]);

    const user = 'User1';
    const isUserMessage = message.sender === user;

    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: isUserMessage ? 'flex-end' : 'flex-start',
        }} >
            <View style={[
                stylesMemo.message,
                isUserMessage ? stylesMemo.userMessage : stylesMemo.adminMessage,
                appStyles({colors, fontSize}).shadow

            ]}>
                <Text
                    style={isUserMessage ? stylesMemo.userMessageLabel : stylesMemo.messageLabel}
                >
                    {message.message}
                </Text>
            </View>
        </View>
    )
}

export default memo(Message);

const styles = ({ colors, fontSize }: IStyles) => {
    return StyleSheet.create({
        messageLabel: {
            color: colors.TEXT_COLOR,
            fontWeight: "400",
            fontSize: fontSize(16),
            lineHeight: 27,
        },
        userMessageLabel: {
            color: colors.WHITE,
            fontWeight: "400",
            fontSize: fontSize(16),
            lineHeight: 24,
        },
        message: {
            paddingVertical: 12,
            paddingLeft: 10,
            paddingRight: 16,
            width: '75%',
        },
        userMessage: {
            backgroundColor: colors.PRIMARY,
            // borderBottomEndRadius: 8,
            borderBottomStartRadius: 8,
            borderTopStartRadius: 8,
            borderTopEndRadius: 8,
            
        },
        adminMessage: {
            backgroundColor: colors.BACKGROUND_2,
            borderBottomEndRadius: 8,
            borderBottomStartRadius: 8,
            // borderTopStartRadius: 8,
            borderTopEndRadius: 8,
        },

    })
}
