import { memo, useMemo } from "react";
import {  StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { callIcon, chatIcon } from "../assets/icons";
import { appStrings } from "../assets/appStrings";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { appStyles } from "../styles";
import { useTheme } from "../hooks";
import { ColorScheme, IStyles } from "../contexts/ThemeContext";
import { emailIcon } from "../assets/icons/emailIcon";
import { fastConnectIcon } from "../assets/icons/fastConnectIcon";

interface IProps {
    navigation: NavigationProp<ParamListBase>,
    showActions?: boolean,
    selectedItem?: number
}

function Footer({ navigation, showActions = false, selectedItem }: IProps) {


    const { colors, isDarkTheme, coefficient } = useTheme()
    const fontSize = (size: number) => size * coefficient;
    const stylesMemo = useMemo(() => styles({colors, fontSize}), [isDarkTheme, coefficient])
    const appStylesMemo = useMemo(() => appStyles({colors, fontSize}), [isDarkTheme, coefficient])

    const disabledAll = selectedItem == -1;
    const disabled = disabledAll || selectedItem == 2;


    const onPressCall = () => {
        // navigation.navigate('Call');
        console.log('Call');
    }

    const onPressChat = () => {
        navigation.navigate('Messages');
    }

    const onPressEmail = () => {
        // navigation.navigate('Chat');
        console.log('onPressEmail');
    }

    const onPressFastConnect = () => {
        navigation.navigate('SelectConnectionType');
    }

    return (
        <View style={stylesMemo.container} >
            {
                showActions
                    ? <>
                        <TouchableOpacity
                            style={stylesMemo.item}
                            onPress={onPressEmail}
                            disabled={disabledAll}
                        >
                            {emailIcon(disabledAll)}
                            <Text style={appStylesMemo.subTitle} >
                                {appStrings.emailMessage}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={disabled}
                            style={stylesMemo.item}
                            onPress={onPressChat}
                            
                        >
                            {chatIcon(disabled)}
                            <Text style={appStylesMemo.subTitle} >
                                {appStrings.sendMessage}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={disabled}
                            style={stylesMemo.item}
                            onPress={onPressCall}
                        >
                            {callIcon(colors, disabled)}
                            <Text style={appStylesMemo.subTitle} >
                                {appStrings.call}
                            </Text>
                        </TouchableOpacity>
                    </>
                    : <TouchableOpacity
                        style={stylesMemo.item}
                        onPress={onPressFastConnect}
                    >
                        {fastConnectIcon()}
                        <Text style={appStylesMemo.subTitle} >
                            {appStrings.fastConnect}
                        </Text>
                    </TouchableOpacity>
            }
        </View>
    )
}

export default memo(Footer);

const styles = ({colors, fontSize }: IStyles) => {
    return StyleSheet.create({
        container: {
            ...appStyles({colors, fontSize}).shadow,
            backgroundColor: colors.BACKGROUND_2,
            paddingHorizontal: 16,
            paddingVertical: 10,
            flexDirection: 'row',
            justifyContent: 'center',
            borderRadius: 26,
            alignItems: 'center',
            minWidth: '60%',
            position: 'absolute',
            bottom: 20
        },

        item: {
            paddingHorizontal: 10,
            alignItems: 'center',
            justifyContent: 'center',
        },

    })
}