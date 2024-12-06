import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { useEffect, useMemo, useState } from "react";
import { useFormData, useTheme } from "../../hooks";
import Background from "../../components/Background";
import Header from "../../components/Header";
import { IStyles } from "../../contexts/ThemeContext";
import { appStrings } from "../../assets/appStrings";
import Form from "../../components/Form";
import { isValidEmail } from "../../helpers";
import { navigationTypes } from "../../navigation/navigation.types";
import { appStyles } from "../../styles";

interface IProps {
    navigation: NavigationProp<ParamListBase>
}

export default function FormEmailScreen({ navigation }: IProps) {

    const { colors, isDarkTheme, coefficient } = useTheme();
    const fontSize = (size: number) => size * coefficient;
    const stylesMemo = useMemo(() => styles({ colors, fontSize }), [isDarkTheme, coefficient]);
    const { email, setEmail } = useFormData();

    const [value, setValue] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        setValue(email)
        setError('');
    }, [email])

    const onNextStep = () => {
        if (value.trim() === '') {
            return;
        }

        if (!isValidEmail(value)) {
            setError(appStrings.emailErrorMessage);
            return;
        } else {
            setError('');
        }
        setEmail(value);
        navigation.navigate(navigationTypes.FORM_PHONE);
    }



    return (
        <Background>
            {
                <ScrollView scrollEnabled={false} style={stylesMemo.container}  >
                    <Header navigation={navigation} goBackAction />
                    <Form
                        activeStep={2}
                        showGoBackButton={true}
                        navigation={navigation}
                        onNextStep={onNextStep}
                        childrenTitle={appStrings.emailAddress}
                    >
                        <TextInput
                            style={stylesMemo.input}
                            defaultValue={email}
                            onChangeText={setValue}
                            autoFocus
                        />
                        {error && <Text style={{ color: colors.ERROR, marginTop: 10 }}>{error}</Text>}
                    </Form>
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
            ...appStyles({ colors, fontSize }).shadow

        },
    })
}  