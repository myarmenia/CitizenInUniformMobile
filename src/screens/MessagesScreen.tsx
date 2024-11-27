import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "../components/Header";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Background from "../components/Background";
import { useTheme } from "../hooks";
import { useEffect, useMemo, useState } from "react";
import { IStyles } from "../contexts/ThemeContext";
import { appStrings } from "../assets/appStrings";
import Button from "../components/Button";
import { plusIcon } from "../assets/icons/plusIcon";
import { navigationTypes } from "../navigation/navigation.types";
import { IMessage, IRoom } from "../interfaces/data.types";
import { useChat } from "../hooks/useChat";
import RoomItem from "../components/RoomItem";

interface IProps {
    navigation: NavigationProp<ParamListBase>
}


export default function MessagesScreen({ navigation }: IProps) {

    const { colors, isDarkTheme, coefficient } = useTheme();
    const fontSize = (size: number) => size * coefficient;
    const stylesMemo = useMemo(() => styles({ colors, fontSize }), [isDarkTheme, coefficient]);

    const [toggleMessages, setToggleMessages] = useState(true);

    const { rooms, isUpdate } = useChat();


    const onNewMessage = () => {
        navigation.navigate(navigationTypes.FORM_NAME);
    }

    useEffect(() => {
         console.log(rooms.active[0]?.messages[0].content);
        
    }, [isUpdate]);


    return (
        <Background>
            <Header
                goBackAction={true}
                navigation={navigation}
            />
            <View style={stylesMemo.container}>
                <Text style={stylesMemo.title} >
                    {appStrings.sendMessage}
                </Text>

                <View style={[stylesMemo.row, {paddingHorizontal: 16}]} >

                    <View style={stylesMemo.row} >
                        <Button
                            title={appStrings.active}
                            backgroundColor={colors.BUTTON}
                            borderEnabled
                            borderColor={toggleMessages ? colors.PRIMARY : colors.BUTTON_BORDER}
                            onPress={() => setToggleMessages(true)}
                            borderWidth={2}
                        />
                        <Button
                            title={appStrings.inactive}
                            backgroundColor={colors.BUTTON}
                            borderEnabled
                            borderColor={!toggleMessages ? colors.PRIMARY : colors.BUTTON_BORDER}
                            onPress={() => setToggleMessages(false)}
                            borderWidth={2}
                        />
                    </View>

                    <Button borderWidth={2} borderEnabled onPress={onNewMessage} >
                        <View style={stylesMemo.row} >
                            {plusIcon(colors.WHITE)}

                            <Text style={stylesMemo.label} >
                                {appStrings.new}
                            </Text>
                        </View>
                    </Button>
                </View>

                {
                    (
                        toggleMessages ? (rooms.active && rooms.active?.length > 0) : (rooms.passive && rooms.passive?.length > 0)
                    )
                        ? <>
                            <FlatList
                                data={toggleMessages ? rooms.active : rooms.passive}
                                renderItem={({ item }) => <RoomItem navigation={navigation} room={item} />}
                                contentContainerStyle={{flexGrow: 1}}
                                extraData={[isUpdate]}
                            />
                        </>

                        : <View style={stylesMemo.empty}>
                            <Text style={stylesMemo.emptyLabel} >
                                {toggleMessages ? appStrings.emptyMessages : appStrings.emptyMessagesInactive}
                            </Text>
                        </View>}

            </View>

        </Background>
    )
};


const styles = ({ colors, fontSize }: IStyles) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            // padding: 16
        },
        title: {
            fontSize: fontSize(18),
            fontFamily: 'NotoSansArmenian',
            fontWeight: '700',
            textAlign: 'center',
            color: colors.TEXT_COLOR,
            marginBottom: 20
        },
        row: {
            flexDirection: 'row',
            gap: 8,
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        empty: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 30
        },
        emptyLabel: {
            fontSize: fontSize(16),
            fontWeight: '500',
            lineHeight: 27,
            fontFamily: 'NotoSansArmenian',
            textAlign: 'center',
            color: colors.TEXT_COLOR,
        },
        label: {
            fontSize: fontSize(16),
            fontWeight: '600',
            lineHeight: 22,
            fontFamily: 'NotoSansArmenian',
            textAlign: 'center',
            color: colors.WHITE,
        }
    })
}  