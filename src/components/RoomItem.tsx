import { memo, useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { useTheme } from "../hooks";
import { IStyles } from "../contexts/ThemeContext";
import { navigationTypes } from "../navigation/navigation.types";
import { IRoom } from "../interfaces/data.types";
import { appStrings } from "../assets/appStrings";

interface IProps {
    navigation: NavigationProp<ParamListBase>,
    room: IRoom
}

export const handleTitle = (room: IRoom) => {
    let title = '';
    if (room.governing_body_id == 1) title = appStrings.pn
    else if (room.governing_body_id == 2) title = appStrings.mip
    return title;
}

function RoomItem({
    navigation,
    room
}: IProps) {
    const { colors, isDarkTheme, coefficient, toggleTheme } = useTheme()
    const fontSize = (size: number) => size * coefficient;
    const stylesMemo = useMemo(() => styles({ colors, fontSize }), [isDarkTheme, coefficient])

    const onPress = () => {
        navigation.navigate(navigationTypes.CHAT, {
            roomId: room.id,
            messages: room.messages,
            userId: room.m_user_id,
            isActive: room.activ !== 0
        });
    }

    return (
        <TouchableOpacity style={stylesMemo.container} onPress={onPress} >
            <Text style={stylesMemo.title} numberOfLines={1} >
                {handleTitle(room)}
            </Text>

            {room.messages[0] && <Text style={stylesMemo.message} numberOfLines={1}>
                {room.messages[0]?.content}
            </Text>}
            {room.messages[0] && <Text style={stylesMemo.date} numberOfLines={1}>
                {new Date(room.messages[0]?.created_at!).toLocaleDateString()}
            </Text>}
        </TouchableOpacity>
    )
}

export default RoomItem;


const styles = ({ colors, fontSize }: IStyles) => {

    return StyleSheet.create({
        container: {
            padding: 16,
            width: '100%',

            borderBottomColor: colors.BUTTON_BORDER,
            borderBottomWidth: 1
        },
        title: {
            fontSize: fontSize(18),
            fontWeight: '600',
            color: colors.TEXT_COLOR,
            marginBottom: 10,
            fontFamily: 'NotoSansArmenian',
        },
        message: {
            fontSize: fontSize(16),
            fontWeight: '400',
            color: colors.TEXT_COLOR,
            marginBottom: 10,
            fontFamily: 'NotoSansArmenian'
        },
        date: {
            fontSize: fontSize(14),
            fontWeight: '300',
            color: colors.DISABLED,
            fontFamily: 'NotoSansArmenian'
        },

    })
}


