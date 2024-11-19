import { memo, useMemo } from "react";
import { Alert, Appearance, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { alertIcon, arrowLeftIcon, settingsIcon } from "../assets/icons";
import { appStrings } from "../assets/appStrings";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { useModal, useTheme } from "../hooks";
import { questionIcon } from "../assets/icons/questionIcon";
import { ColorScheme, IStyles } from "../contexts/ThemeContext";
import { navigationTypes } from "../navigation/navigation.types";
import { appStyles } from "../styles";

interface IProps {
    navigation: NavigationProp<ParamListBase>,
    goBackAction?: boolean,
    showSettings?: boolean,
    showNotification?: boolean,
}

function Header({
    navigation,
    goBackAction = true,
    showSettings = true,
    showNotification = true,
}: IProps) {
    const { showModal } = useModal();
    const { colors, isDarkTheme, coefficient, toggleTheme } = useTheme()
    const fontSize = (size: number) => size * coefficient;
    const stylesMemo = useMemo(() => styles({ colors, fontSize }), [isDarkTheme, coefficient])

    const onGoToHamePage = () => {
        if (goBackAction) {
            navigation.navigate(navigationTypes.HOME);
        } else {
            Alert.alert('Oooops!', 'FAQ page is not available')
        }
    }

    const onGoToSettingsPage = () => {
        navigation.navigate(navigationTypes.SETTINGS);
        console.log('Settings');
    }

    const onGoToNotificationPage = () => {
        // navigation.navigate('Notification');
        console.log('Notification');
        showModal(false);
    }

    return (
        <View style={stylesMemo.padding} >
            <View style={stylesMemo.container} >
                <TouchableOpacity
                    onPress={onGoToHamePage}
                    style={stylesMemo.leftContent}
                >
                    {goBackAction
                        ? <>
                            {arrowLeftIcon(colors.ICON_COLOR)}
                            <Text style={stylesMemo.title} >
                                {appStrings.homePage}
                            </Text>
                        </>
                        : questionIcon(colors.ICON_COLOR)
                    }
                </TouchableOpacity>
                <View style={stylesMemo.rightContent} >
                    {showNotification && <TouchableOpacity
                        onPress={onGoToNotificationPage}
                    >
                        {alertIcon(89)}
                    </TouchableOpacity>}
                    {showSettings && <TouchableOpacity
                        onPress={onGoToSettingsPage}
                    >
                        {settingsIcon(colors.ICON_COLOR)}
                    </TouchableOpacity>}
                </View>
            </View>
        </View>
    )
}

export default memo(Header);


const styles = ({ colors, fontSize }: IStyles) => {

    return StyleSheet.create({
        container: {
            width: '100%',
            paddingVertical: 8,
            backgroundColor: colors.BACKGROUND_2,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 16,
            height: 50,
            borderRadius: 4,
            marginTop: 10,
            ...appStyles({ colors, fontSize }).shadow
        },
        title: {
            fontSize: fontSize(14),
            fontWeight: '400',
            color: colors.TEXT_COLOR,
        },
        subTitle: {
            fontSize: 18,
            marginBottom: 10,
        },
        button: {
            padding: 10,
            borderRadius: 5,
            marginBottom: 10,
        },
        leftContent: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10
        },
        rightContent: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 16,
            justifyContent: 'flex-end',

        },
        padding: {
            paddingHorizontal: 16,
            zIndex: 2
        }
    })
}


