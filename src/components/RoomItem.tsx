import { memo, useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { useTheme } from "../hooks";
import { IStyles } from "../contexts/ThemeContext";
import { navigationTypes } from "../navigation/navigation.types";
import { IRoom } from "../interfaces/data.types";
import { appStrings } from "../assets/appStrings";
import { handleTime, toCountUnreadMessages } from "../helpers";

interface IProps {
    navigation: NavigationProp<ParamListBase>,
    room: IRoom
}

export const handleTitle = (id: number) => {
    let title = '';
    if (id == 1) title = appStrings.pn
    else if (id == 2) title = appStrings.mip
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
            isActive: room.activ !== 0,
            type: room.governing_body_id
        });
    }

    const count = useMemo(() => toCountUnreadMessages(room), [room])

    return (
        <TouchableOpacity style={stylesMemo.container} onPress={onPress} >
            <View style={stylesMemo.row}>
            <View style={{flex: 1}} >

                <Text style={stylesMemo.title} numberOfLines={1} >
                    {handleTitle(room.governing_body_id)}
                </Text>
                </View>
               {room.messages[0]?.created_at && <Text style={stylesMemo.date} numberOfLines={1}>
                    {handleTime(room.messages[0].created_at)}
                </Text>}
            </View>
            <View style={stylesMemo.row}>
                <View style={{flex: 1}} >
                    {room.messages[0] && <Text style={stylesMemo.message} numberOfLines={1}>
                        {room.messages[0]?.content}
                    </Text>}
                </View>
                { !!count && <View style={stylesMemo.indicator}>
                    <Text style={[stylesMemo.indicatorText]}>
                        {count}
                    </Text>
                </View>}
            </View>
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
            fontFamily: 'NotoSansArmenian',
            lineHeight: fontSize(20),
        },
        date: {
            fontSize: fontSize(14),
            fontWeight: '300',
            color: colors.DISABLED,
            fontFamily: 'NotoSansArmenian'
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16
        },

        indicator: {
            minWidth: 30,
            minHeight: 30,
            borderRadius: 30,
            backgroundColor: colors.PRIMARY,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 5
        },
        indicatorText: {
            fontSize:14,
            fontWeight: '600',
            color: colors.WHITE,
            fontFamily: 'NotoSansArmenian',
            lineHeight: 18,
            textAlignVertical: 'center',
            textAlign: 'center'
        },
    })
}


