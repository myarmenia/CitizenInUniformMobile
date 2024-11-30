import { StyleSheet, Text, TextInput, View } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFormData, useModal, useTheme } from "../hooks";
import { navigationTypes } from "../navigation/navigation.types";
import Background from "../components/Background";
import Header from "../components/Header";
import Form from "../components/Form";
import { appStrings } from "../assets/appStrings";
import { IStyles } from "../contexts/ThemeContext";
import { appStyles } from "../styles";
import GoogleRecaptcha, {
    // Enums
    GoogleRecaptchaSize, // Size enum: such GoogleRecaptchaSize.INVISIBLE
    GoogleRecaptchaTheme, // Theme enum: such GoogleRecaptchaTheme.DARK
    GoogleRecaptchaActionName, // Action name enum: such GoogleRecaptchaActionName.LOGIN
    DEFAULT_GSTATIC_DOMAIN,
    DEFAULT_RECAPTCHA_DOMAIN,
    // Types (only typescript)
    GoogleRecaptchaToken,
    GoogleRecaptchaProps,
    GoogleRecaptchaBaseProps,
    GoogleRecaptchaRefAttributes
} from 'react-native-google-recaptcha'
import { axiosInstance } from "../api";
import { handleUser } from "../services/asyncStoryge";
import { IBaseData } from "../interfaces/data.types";

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

    const recaptcha = useRef(null);

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
            const data =  {
                "governing_body_id": governingBodyID == 3 ? [1,2] : governingBodyID,
                "fullname": name,
                "email": email,
                "phone": phoneNumber,
                "message_category_id": type.id,
                "content": value,
                "mobile_user_id": user?.id
            }            
            const res = await axiosInstance.post<IBaseData<any>>('/api/mobile/email-messages/store', data)
            console.log(res.data.message);
        } catch (error) {
            console.log('send email message error', error);   
        }
    }

    const onVerify = (token: string) => {
        console.log('success!', token);
    }

    const onExpire = () => {
        console.warn('expired!');
    }

    return (
        <Background>
            {
                <View style={stylesMemo.container}  >
                    <Header navigation={navigation} goBackAction />
                    <Form
                        activeStep={4}
                        showGoBackButton={false}
                        navigation={navigation}
                        onNextStep={onNextStep}
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
                        {/* <GoogleRecaptcha
                            baseUrl={process.env.BASE_URL!}
                            ref={recaptcha}
                            siteKey=""
                        /> */}
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