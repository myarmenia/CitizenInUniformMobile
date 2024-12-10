import { memo, ReactNode, useMemo } from "react";
import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../hooks";
import { IStyles } from "../contexts/ThemeContext";
import { INotification } from "../interfaces/data.types";
import { notifyAlertIcon } from "../assets/icons/notifyAlertIcon";
import { arrowIcon } from "../assets/icons";
import { handleTime } from "../helpers";
import { notifySettingsIcon } from "../assets/icons/notifySettingsIcon";
import { notifyChatIcon } from "../assets/icons/notifyChatIcon copy";
import { notifyLawIcon } from "../assets/icons/notifyLawIcon";
import { readNorification } from "../api/requests";


interface IProps {
    notify: INotification
}


function NotificationItem({ notify }: IProps) {

    const { colors, isDarkTheme, coefficient } = useTheme();
    const fontSize = (size: number) => size * coefficient;
    const stylesMemo = useMemo(() => styles({ colors, fontSize }), [isDarkTheme, coefficient]);

    const handlePress = async () => {
        // TODO: Navigate to notification details screen
        try {
            const res = await readNorification(notify.id);
            console.log('Notification is readed', res?.data.message)
        } catch (error) {
            console.warn();
        }

    }

    const handleIcon = (id: number) => {
        if (id === 1) return notifySettingsIcon(colors.ICON_COLOR);
        else if (id === 4) return notifyChatIcon(colors.ICON_COLOR);
        else if (id === 5) return notifyLawIcon(colors.ICON_COLOR);
        return notifyAlertIcon(colors.ICON_COLOR);
    }
    return (
        <TouchableOpacity style={stylesMemo.container} onPress={handlePress} >
            <View
                style={stylesMemo.icon}
            >
                {handleIcon(notify.setting_id)}
            </View>

            <View
                style={stylesMemo.main}
            >
                <Text style={stylesMemo.title} >
                    {notify.title}
                </Text>

                <Text style={stylesMemo.title} >
                    {notify.content}
                </Text>

                {<Text style={stylesMemo.time} >
                    {handleTime(notify.created_at)}   2125
                    {new Date(notify.created_at).toLocaleDateString()}
                </Text>}
            </View>

            <View
                style={stylesMemo.arrowBox}
            >
                {arrowIcon(colors.ICON_COLOR)}
            </View>
        </TouchableOpacity>
    )
}

export default memo(NotificationItem);



const styles = ({ colors, fontSize }: IStyles) => {
    return StyleSheet.create({
        container: {
            flexDirection: 'row',
            paddingVertical: 10,
            borderBottomColor: colors.BUTTON_BORDER,
            borderBottomWidth: 1,
            gap: 16
        },
        icon: {

        },
        title: {
            fontSize: fontSize(16),
            fontFamily: 'NotoSansArmenian',
            fontWeight: '400',
            color: colors.TEXT_COLOR,
            lineHeight: 27
        },

        time: {
            fontSize: fontSize(14),
            fontFamily: 'NotoSansArmenian',
            fontWeight: '300',
            color: colors.DISABLED,
            lineHeight: 27
        },
        main: {
            flex: 1,
        },
        arrowBox: {
            alignItems: 'center',
            justifyContent: 'center',
            transform: [{
                rotate: '90deg',
            }]
        }
    })
}
