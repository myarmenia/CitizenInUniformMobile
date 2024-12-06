import { Alert, LayoutChangeEvent, ScrollView, StyleSheet, View } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { useEffect, useMemo, useState } from "react";
import { useFormData, useSocket, useTheme } from "../../hooks";
import Background from "../../components/Background";
import Header from "../../components/Header";
import { IStyles } from "../../contexts/ThemeContext";
import Form from "../../components/Form";
import DropDown from "../../components/DropDown";
import { navigationTypes } from "../../navigation/navigation.types";
import { handleUser } from "../../services/asyncStoryge";
import { appStrings } from "../../assets/appStrings";
import { checkAvailableAdmins, registerUser } from "../../api/requests";
import RecaptchaComponent from "../../components/Recaptcha";

interface IProps {
    navigation: NavigationProp<ParamListBase>
}


export default function FormSelectTypeScreen({ navigation }: IProps) {

    const { colors, isDarkTheme, coefficient } = useTheme();
    const fontSize = (size: number) => size * coefficient;
    const stylesMemo = useMemo(() => styles({ colors, fontSize }), [isDarkTheme, coefficient]);
    const { type, setType, name, email, phoneNumber, governingBodyID, messageType } = useFormData();
    const { socketId, socket } = useSocket();

    const [dropDownPosition, setDropDownPosition] = useState(0);
    const [visible, setVisible] = useState(false);
    const [userId, setUserId] = useState(0);
    const [showCaptcha, setShowCaptcha] = useState(false);
    const [isCheckedUser, setIsCheckedUser] = useState(false);


    const checkAdmins = async () => {
        try {
            const isActiveOperator = await checkAvailableAdmins()
            if (isActiveOperator) {
                return isActiveOperator
            } else {
                Alert.alert(
                    'Ooooops!',
                    'Active operators is not available',
                );
                return false
            }

        } catch {
            Alert.alert(
                'Ooooops!',
                'Active operators is not available',
            );
        }
    }

    const onCreateChat = async () => {
        try {
            const isActiveOperator = await checkAdmins()
            console.log({ isActiveOperator });

            if (name && email && socketId) {

                if (isActiveOperator) {

                    const res = await registerUser({
                        email,
                        governing_body: governingBodyID.toString(),
                        message_category_id: type.id.toString(),
                        phone_number: phoneNumber,
                        name,
                        socket_id: socketId,
                    })
                    console.log('registered user =============>', res);

                    if (res) {
                        const user = await handleUser()

                        socket.emit('searchAdmin', {
                            ...res,
                            m_user_id: user?.id
                        })
                        console.log('userID', res.id);

                        setUserId(res.id);

                    }

                }

            } else {
                console.log('pakas ban ka');
            }
        } catch (error) {
            console.log({ error: error! })
        }
    }

    useEffect(() => {
        userId && socket.on('roomCreated', (data: any) => {
            console.log('roomCreated --------->', data.room.id);

            navigation.navigate(navigationTypes.CHAT, {
                userId,
                roomId: data.room.id,
                isActive: data.activ !== 0,
                type: data.governing_body_id
            });
        })


        return () => {
            socket.off('roomCreated');
            socket.off('roomId');
        }
    }, [userId])

    const onLayout = (e: LayoutChangeEvent) => {
        setDropDownPosition(e.nativeEvent.layout.y)
    }

    const onPressListItem = (v: { title: string, id: number }) => {
        setVisible(false);
        setType({
            name: v.title,
            id: v.id,
        });
    }

    const onPress = () => {
        if (messageType === appStrings.message) {
            if (isCheckedUser) {
                onCreateChat();

            } else {
                setShowCaptcha(true);
            }
        } else {
            navigation.navigate(navigationTypes.EMAIL_MESSAGE)
        }
    }



    const onVerify = async (token: string) => {
        onCreateChat();
        setIsCheckedUser(true)
    }

    const onExpire = () => {
        console.warn('expired!');
        setIsCheckedUser(true)

    }

    return (
        <Background>
            {
                <ScrollView scrollEnabled={false} style={stylesMemo.container}  >
                    <Header navigation={navigation} goBackAction />
                    <Form
                        activeStep={4}
                        showGoBackButton={true}
                        navigation={navigation}
                        onNextStep={onPress}
                        disabled={type.id == 0}
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
                    <RecaptchaComponent
                        onVerify={onVerify}
                        onExpire={onExpire}
                        open={showCaptcha}
                        setOpen={setShowCaptcha}
                    />
                </ScrollView>
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