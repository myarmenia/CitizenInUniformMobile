import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { useMemo, useRef, useState } from "react";
import { useFormData, useTheme } from "../../hooks";
import Background from "../../components/Background";
import Header from "../../components/Header";
import { IStyles } from "../../contexts/ThemeContext";
import { appStrings } from "../../assets/appStrings";
import Form from "../../components/Form";
import { navigationTypes } from "../../navigation/navigation.types";
import PhoneInput from "@perttu/react-native-phone-number-input";
import { appStyles } from "../../styles";

interface IProps {
    navigation: NavigationProp<ParamListBase>
}

export default function FormPhoneNumberScreen({ navigation }: IProps) {

    const { colors, isDarkTheme, coefficient } = useTheme();
    const fontSize = (size: number) => size * coefficient;
    const stylesMemo = useMemo(() => styles({ colors, fontSize }), [isDarkTheme, coefficient]);
    const { phoneNumber, setPhoneNumber, setPhoneNumberCropped, phoneNumberCropped } = useFormData();

    const [value, setValue] = useState('');
    const [error, setError] = useState('');

    const phoneInput = useRef<PhoneInput>(null);

    const onNextStep = () => {
        if (value.trim().length < 10) {
            setError(appStrings.numberError)
            return;
        }


        setError('');
        setPhoneNumber(value);
        navigation.navigate(navigationTypes.FORM_SELECT_TYPE);
    }

    return (
        <Background>
            {
                <ScrollView scrollEnabled={false} style={stylesMemo.container}  >
                    <Header navigation={navigation} goBackAction />
                    <Form
                        activeStep={3}
                        showGoBackButton={true}
                        navigation={navigation}
                        onNextStep={onNextStep}
                        childrenTitle={appStrings.number}
                    >
                        <View style={{
                            ...appStyles({ colors, fontSize }).shadow

                        }} >

                            <PhoneInput
                                textInputProps={{
                                    maxLength: 10,
                                    cursorColor: 'grey',
                                    placeholder: ''
                                }}
                                containerStyle={{
                                    backgroundColor: colors.BACKGROUND_2,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    height: 50,
                                    width: Dimensions.get('window').width - 32,
                                    overflow: 'hidden',
                                    borderRadius: 6
                                }}
                                textInputStyle={{
                                    fontSize: 16,
                                    height: 40,
                                    color: colors.TEXT_COLOR
                                }}
                                textContainerStyle={{
                                    paddingHorizontal: 0,
                                    paddingVertical: 0,
                                    backgroundColor: 'transparent'

                                }}
                                codeTextStyle={{
                                    fontSize: 16,
                                    color: colors.TEXT_COLOR
                                }}
                                ref={phoneInput}
                                defaultValue={phoneNumberCropped}
                                defaultCode="AM"
                                layout="first"
                                onChangeFormattedText={(text) => {
                                    setValue(text);
                                }}
                                onChangeText={setPhoneNumberCropped}
                                withDarkTheme={isDarkTheme}
                                withShadow
                                autoFocus
                            />
                        </View>
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
            backgroundColor: 'white',
            borderColor: 'none',
            height: 40,
            padding: 10,
            borderRadius: 4,
            color: 'black',

        },
    })
}  