import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { useEffect, useMemo, useState } from "react";
import { useFormData, useSocket, useTheme } from "../../hooks";
import Background from "../../components/Background";
import Header from "../../components/Header";
import { IStyles } from "../../contexts/ThemeContext";
import Form from "../../components/Form";
import DropDown from "../../components/DropDown";
import { navigationTypes } from "../../navigation/navigation.types";
import { axiosInstance } from "../../api";
import { useQuery } from "@tanstack/react-query";
import { urls } from "../../api/urls";
import { handleUser } from "../../services/asyncStoryge";

interface IProps {
    navigation: NavigationProp<ParamListBase>
}


export default function FormSelectTypeScreen({ navigation }: IProps) {

    const { colors, isDarkTheme, coefficient } = useTheme();
    const fontSize = (size: number) => size * coefficient;
    const stylesMemo = useMemo(() => styles({ colors, fontSize }), [isDarkTheme, coefficient]);
    const { type, setType, name, email, phoneNumber } = useFormData();
    const { socketId, socket } = useSocket();

    const [dropDownPosition, setDropDownPosition] = useState(0);
    const [visible, setVisible] = useState(false);
    const [userId, setUserId] = useState('');

    const onNextStep = async () => {
        try {
            const checkActiveAdmins = await axiosInstance.post('https://citizenb.trigger.ltd/api/admin/online/exist')
            console.log('111',checkActiveAdmins.data);

            if (name && email && socketId) {
                const res = await axiosInstance.post('https://citizenb.trigger.ltd/api/user/register', {
                    name,
                    email,
                    message_category_id: '2',
                    governing_body: '2',
                    type: "IOS",
                    phone_number: phoneNumber,
                    socket_id: socketId
                })

                
                const user = await handleUser()
                const x = {
                    ...res.data,
                    m_user_id: user?.id
                }
                socket.emit('searchAdmin', x)
                setUserId(res.data.id);
            } else {
                console.log('pakas ban ka');
            }
        } catch (error) {
            console.log({ error: error! })
        }
    }

    useEffect(() => {
        userId && socket.on('roomCreated', (data: any) => {
            console.log('roomCreated --------->', data);
            navigation.navigate(navigationTypes.CHAT, { userId, roomId: data.room });
        })

        return () => {
            socket.off('roomCreated')
        }
    }, [userId])

    const onLayout = (e: LayoutChangeEvent) => {
        setDropDownPosition(e.nativeEvent.layout.y)
    }

    const onPressListItem = (v: string) => {
        setVisible(false);
        setType(v);
    }

    return (
        <Background>
            {
                <View style={stylesMemo.container}  >
                    <Header navigation={navigation} goBackAction />
                    <Form
                        activeStep={4}
                        showGoBackButton={true}
                        navigation={navigation}
                        onNextStep={onNextStep}
                        disabled={false}
                        
                    >
                        <View onLayout={onLayout} >
                            <DropDown
                                top={dropDownPosition}
                                visible={visible}
                                setVisible={setVisible}
                                onPressItem={onPressListItem}
                                selectedCategory={type}
                            />

                        </View>
                    </Form>
                </View>
            }

        </Background>
    )
};


const styles = ({ colors, fontSize }: IStyles) => {
    return StyleSheet.create({
        container: {
            flex: 1,
        },
        padding: {
            paddingHorizontal: 16
        },
        title: {
            fontSize: fontSize(18),
            fontFamily: 'NotoSansArmenian',
            fontWeight: '700',
            textAlign: 'center',
            color: colors.TEXT_COLOR,
            margin: 10
        },
        label: {
            fontSize: fontSize(14),
            fontFamily: 'NotoSansArmenian',
            fontWeight: '400',
            textAlign: 'center',
            color: colors.TEXT_COLOR,
        },

        error: {
            fontSize: fontSize(14),
            fontFamily: 'NotoSansArmenian',
            fontWeight: '500',
            color: colors.ERROR,
            marginVertical: 10
        },

        button: {
            marginTop: 40,
            color: 'white',
            height: 40,
            backgroundColor: '#ec5990',
            borderRadius: 4,
        },

        input: {
            backgroundColor: colors.BACKGROUND_2,
            borderColor: 'none',
            height: 40,
            padding: 10,
            borderRadius: 4,
            color: colors.TEXT_COLOR,
        },
    })
}  