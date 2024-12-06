import { memo, ReactNode, useMemo } from "react";
import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../hooks";
import { IStyles } from "../contexts/ThemeContext";
import { INotification } from "../interfaces/data.types";
import { notifyAlertIcon } from "../assets/icons/notifyAlertIcon";
import { arrowIcon } from "../assets/icons";


interface IProps {
    notify: INotification
}

function NotificationItem({ notify }: IProps) {

    const { colors, isDarkTheme, coefficient } = useTheme();
    const fontSize = (size: number) => size * coefficient;
    const stylesMemo = useMemo(() => styles({ colors, fontSize }), [isDarkTheme, coefficient]);

    return (
        <TouchableOpacity style={stylesMemo.container} >
            <View
                style={stylesMemo.icon}
            >
                {notifyAlertIcon(colors.ICON_COLOR)}
            </View>

            <View
                style={stylesMemo.main}
            >
                <Text style={stylesMemo.title} >
                    {notify.content}
                </Text>

               { <Text style={stylesMemo.time} >
                    {'11:23'}
                </Text> }
            </View>

            <View
                style={stylesMemo.arrowBox}
            >
                {arrowIcon(colors.ICON_COLOR)}
            </View>
        </TouchableOpacity>
    )
}

export default NotificationItem;



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
