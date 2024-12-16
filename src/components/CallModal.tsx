import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Linking, Modal, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../hooks";
import { IStyles } from "../contexts/ThemeContext";
import { useQuery } from "@tanstack/react-query";
import { getGoverningBody, phoneCallEvent } from "../api/requests";
import { IGoverningBody } from "../interfaces/data.types";
import { appStyles } from "../styles";
import { callFillIcon } from "../assets/icons/callFillIcon";
import { appStrings } from "../assets/appStrings";
import { validateAndFormatPhoneNumber } from "../helpers";

interface IProps {
    visible: boolean;
    setVisible: (value: boolean) => void;
    selectedItem: {
        name: string;
        id: number;
    }
}

function CallModal({
    visible,
    setVisible,
    selectedItem
}: IProps) {
    const { colors, isDarkTheme, coefficient } = useTheme()
    const fontSize = (size: number) => size * coefficient;
    const stylesMemo = useMemo(() => styles({ colors, fontSize }), [isDarkTheme, coefficient])

    const [selectedGov, setSelectedGov] = useState<IGoverningBody>()

    const { data, isFetching, isError } = useQuery({
        queryKey: ['governingBodies'],
        queryFn: getGoverningBody,

    })

    const onPress = (number: string) => {
        onDismiss();
        phoneCallEvent(selectedItem.id, number)
        Linking.openURL(`tel:${number}`)
    }

const number = useCallback((item: any) => {
    return validateAndFormatPhoneNumber(item)
}, [selectedGov])    

    useEffect(() => {
        if (data?.result) {
            const gov = data.result.find(v => v.id === selectedItem.id)
            if (gov) {
                setSelectedGov(gov);
            }

        }
    }, [selectedItem.id, data])

    const onDismiss = () => {
        setVisible(false);
    }

    const renderItem = ({ item }: { item: string }) => (
        <TouchableOpacity
            style={stylesMemo.renderItem}
            onPress={() => onPress(item)}
        >
            {callFillIcon()}
            <Text style={stylesMemo.title} numberOfLines={1}>
                {`${appStrings.calling}  ${number(item)} `}
            </Text>

        </TouchableOpacity>
    )

const numbersIsNotAvailable = useMemo(() => selectedGov?.phone, [selectedGov])

    return (
        <Modal
            transparent
            visible={visible}
            animationType="slide"
        >
            <Pressable
                style={[
                    StyleSheet.absoluteFillObject,
                    stylesMemo.background
                ]}
                onPress={onDismiss}
            >
                <Pressable style={stylesMemo.container}>
                    {numbersIsNotAvailable

                        ? <FlatList
                            data={selectedGov?.phone_numbers}
                            renderItem={renderItem}
                            contentContainerStyle={{gap: 8}}
                        />
                        :
                        <View style={stylesMemo.center}  >
                            {isFetching
                                ? <ActivityIndicator size={'large'} color={colors.PRIMARY} />
                                : <Text style={stylesMemo.title} numberOfLines={1}>
                                    {appStrings.numbersIsNotAvailable}
                                </Text>}
                        </View>

                    }
                    <TouchableOpacity
                        style={[stylesMemo.renderItem, { justifyContent: 'center' }]}
                        onPress={onDismiss}
                    >
                        <Text style={stylesMemo.title} numberOfLines={1}>
                            {appStrings.cancel}
                        </Text>
                    </TouchableOpacity>
                    <SafeAreaView />
                </Pressable>

            </Pressable>
        </Modal>
    )
}

export default memo(CallModal);


const styles = ({ colors, fontSize }: IStyles) => {

    return StyleSheet.create({
        container: {
            width: '100%',
            // height: 300,
            backgroundColor: colors.CALL_MODAL,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            ...appStyles({ colors, fontSize }).shadow,
            shadowColor: colors.TEXT_COLOR,
            paddingHorizontal: 16,
            paddingTop: 20,
            paddingBottom: 10,
            gap: 8
        },
        title: {
            fontSize: fontSize(16),
            fontWeight: '700',
            color: colors.TEXT_COLOR,
        },
        background: {
            justifyContent: 'flex-end',
        },
        renderItem: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 16,
            backgroundColor: colors.BUTTON,
            borderRadius: 8,
            gap: 8
        },
        center: {
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10
        }
    })
}


