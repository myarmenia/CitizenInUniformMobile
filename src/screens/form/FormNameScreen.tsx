import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { useMemo } from "react";
import { useFormData, useTheme } from "../../hooks";
import Background from "../../components/Background";
import Header from "../../components/Header";
import { IStyles } from "../../contexts/ThemeContext";
import { appStrings } from "../../assets/appStrings";
import Form from "../../components/Form";
import { navigationTypes } from "../../navigation/navigation.types";
import { appStyles } from "../../styles";

interface IProps {
    navigation: NavigationProp<ParamListBase>
}

export default function FormNameScreen({ navigation }: IProps) {

    const { colors, isDarkTheme, coefficient } = useTheme();
    const fontSize = (size: number) => size * coefficient;
    const stylesMemo = useMemo(() => styles({ colors, fontSize }), [isDarkTheme, coefficient]);
    const { setName, name } = useFormData();

    const onNextStep = () => {
        setName(name);
        navigation.navigate(navigationTypes.FORM_EMAIL);
    }

    return (
        <Background>
            {
                <ScrollView scrollEnabled={false} style={stylesMemo.container}  >
                    <Header navigation={navigation} goBackAction />
                    <Form
                        activeStep={1}
                        showGoBackButton={false}
                        navigation={navigation}
                        onNextStep={onNextStep}
                        disabled={!name.trim()}
                        childrenTitle={appStrings.nameLastName}
                    >
                        <TextInput
                            style={stylesMemo.input}
                            defaultValue={name}
                            onChangeText={setName}
                            autoFocus
                        />
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