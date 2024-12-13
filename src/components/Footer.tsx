import { memo, useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { callIcon, chatIcon } from "../assets/icons";
import { appStrings } from "../assets/appStrings";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { appStyles } from "../styles";
import { useFormData, useTheme } from "../hooks";
import { IStyles } from "../contexts/ThemeContext";
import { emailIcon } from "../assets/icons/emailIcon";
import { fastConnectIcon } from "../assets/icons/fastConnectIcon";
import { navigationTypes } from "../navigation/navigation.types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNetInfo } from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";

interface IProps {
    navigation: NavigationProp<ParamListBase>,
    showActions?: boolean,
    selectedItem?: {
        id: number,
        name: string,
    },
    setCallAction?: (v: boolean) => void,
}

function Footer({ navigation, showActions = false, selectedItem, setCallAction }: IProps) {


    const { colors, isDarkTheme, coefficient } = useTheme()
    const fontSize = (size: number) => size * coefficient;
    const stylesMemo = useMemo(() => styles({ colors, fontSize }), [isDarkTheme, coefficient])
    const appStylesMemo = useMemo(() => appStyles({ colors, fontSize }), [isDarkTheme, coefficient])

    const { setMessageTo, setMessageType, setGoverningBodyID } = useFormData();
    const insets = useSafeAreaInsets();
    const { isConnected } = useNetInfo()

    const disabledAll = selectedItem?.id == -1;
    const disabled = disabledAll || selectedItem?.id == 3;


    const onPressCall = () => {
        setCallAction && setCallAction(true);
    }

    const onPressChat = () => {
        if (selectedItem?.name) {
            setGoverningBodyID(selectedItem.id)
            setMessageTo(selectedItem?.name);
            setMessageType(appStrings.message);
            navigation.navigate(navigationTypes.MESSAGES);
        }
    }

    const onPressEmail = () => {
        if (isConnected) {
            if (selectedItem?.name) {
                setGoverningBodyID(selectedItem.id)
                setMessageTo(selectedItem?.name);
                setMessageType(appStrings.emailMessageLarge);
                navigation.navigate(navigationTypes.FORM_NAME);

            }
        } else {
            Toast.show({
                type: 'error',
                text1: appStrings.hey,
                text2: appStrings.unableInternet,
                topOffset: 10 + insets.top,
            })
        }

    }

    const onPressFastConnect = () => {
        navigation.navigate(navigationTypes.CONNECTION_TYPE);
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

const styles = ({ colors, fontSize }: IStyles) => {
    return StyleSheet.create({
        container: {
            ...appStyles({ colors, fontSize }).shadow,
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