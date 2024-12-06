import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React, { useMemo, useRef, useState } from "react";
import { useFormData, useModal, useTheme } from "../hooks";
import Background from "../components/Background";
import Header from "../components/Header";
import Form from "../components/Form";
import { appStrings } from "../assets/appStrings";
import { IStyles } from "../contexts/ThemeContext";
import { appStyles } from "../styles";
import { axiosInstance } from "../api";
import { handleUser } from "../services/asyncStoryge";
import { IBaseData } from "../interfaces/data.types";
import RecaptchaComponent from "../components/Recaptcha";

interface IProps {
    navigation: NavigationProp<ParamListBase>
}

export default function EmailMessageScreen({ navigation }: IProps) {

    const { colors, isDarkTheme, coefficient } = useTheme();
    const fontSize = (size: number) => size * coefficient;
    const stylesMemo = useMemo(() => styles({ colors, fontSize }), [isDarkTheme, coefficient]);
    const { setName, name, type, email, governingBodyID, phoneNumber, } = useFormData();
    const { showModal, setNavigation, setNavigateToHome } = useModal()
    const [value, setValue] = useState('');
    const [showCaptcha, setShowCaptcha] = useState(false);


    const onNextStep = async () => {
        try {
            await sendEmailMessage();
            setNavigateToHome(true);
            setNavigation(navigation);
            showModal(true);

        } catch (error) {
            showModal(false);
        }
    };

    const sendEmailMessage = async () => {
        try {
            const user = await handleUser()
            const data = {
                "governing_body_id": governingBodyID == 3 ? [1, 2] : governingBodyID,
                "fullname": name,
                "email": email,
                "phone": phoneNumber,
                "message_category_id": type.id,
                "content": value,
                "mobile_user_id": user?.id
            }
            const res = await axiosInstance.post<IBaseData<any>>('/api/mobile/email-messages/store', data)
        } catch (error) {
            console.warn('send email message error', error);
        }
    }

    const onVerify =  async (token: string) => {
        onNextStep();
    }

    const onExpire = () => {
        console.warn('expired!');
    }

    const onPress = () => {
        setShowCaptcha(true);
    }

    return (
        <Background>
                <ScrollView style={stylesMemo.container}  >
                <Header navigation={navigation} goBackAction />
                <Form
                    activeStep={4}
                    showGoBackButton={false}
                    navigation={navigation}
                    onNextStep={onPress}
                    disabled={!value.trim()}
                    childrenTitle={appStrings.message + '*'}
                >
                    <TextInput
                        style={stylesMemo.input}
                        defaultValue={value}
                        onChangeText={setValue}
                        multiline
                        autoFocus

                    />
                    <RecaptchaComponent
                        onVerify={onVerify}
                        onExpire={onExpire}
                        open={showCaptcha}
                        setOpen={setShowCaptcha}
                    />
                   
                </Form>
            </ScrollView>
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

        input: {
            height: '30%',
            padding: 10,
            borderRadius: 4,
            color: colors.TEXT_COLOR,
            textAlign: 'left',
            textAlignVertical: 'top',
            backgroundColor: colors.BACKGROUND_2,
            ...appStyles({ colors, fontSize }).shadow
        },
        capcha: {
            marginTop: 20
        }
    })
}  