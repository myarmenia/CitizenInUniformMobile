import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { useMemo, useState } from "react";
import { useFormData, useTheme } from "../../hooks";
import Background from "../../components/Background";
import Header from "../../components/Header";
import { IStyles } from "../../contexts/ThemeContext";
import Form from "../../components/Form";
import DropDown from "../../components/DropDown";
import { navigationTypes } from "../../navigation/navigation.types";

interface IProps {
    navigation: NavigationProp<ParamListBase>
}

export default function FormSelectTypeScreen({ navigation }: IProps) {

    const { colors, isDarkTheme, coefficient } = useTheme();
    const fontSize = (size: number) => size * coefficient;
    const stylesMemo = useMemo(() => styles({ colors, fontSize }), [isDarkTheme, coefficient]);
    const { type, setType } = useFormData();

    const [dropDownPosition, setDropDownPosition] = useState(0);
    const [visible, setVisible] = useState(false);

    const onNextStep = () => {
        navigation.navigate(navigationTypes.CHAT)
    }

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
                        showGoBackButton={false}
                        navigation={navigation}
                        onNextStep={onNextStep}
                        disabled={!type}
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