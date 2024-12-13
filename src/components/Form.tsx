import { memo, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFormData, useTheme } from "../hooks";
import { IStyles } from "../contexts/ThemeContext";
import Steps from "./Steps";
import Button from "./Button";
import { arrowLeftIcon } from "../assets/icons";
import { arrowRightIcon } from "../assets/icons/arrowRight";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { arrowLeftIconBig } from "../assets/icons/arrowLeftIconBig";

interface IProps {
    stepsCount?: number;
    activeStep: number;
    onNextStep?: () => void;
    children?: React.ReactNode;
    showGoBackButton?: boolean;
    navigation?: NavigationProp<ParamListBase>;
    disabled?: boolean;
    childrenTitle?: string;
}

function Form({
    stepsCount = 4,
    activeStep,
    onNextStep,
    children,
    showGoBackButton = true,
    navigation,
    disabled,
    childrenTitle
}: IProps) {

    const { colors, isDarkTheme, coefficient } = useTheme();
    const fontSize = (size: number) => size * coefficient;
    const stylesMemo = useMemo(() => styles({ colors, fontSize }), [isDarkTheme, coefficient]);
    const { messageTo, messageType } = useFormData();    


    const onGoBack = () => {
        navigation?.goBack()
    }

    return (
        <View style={stylesMemo.container}>
            <Steps
                stepsCount={stepsCount}
                activeStep={activeStep}
            />
            <Text style={stylesMemo.title} >
                {messageType}
            </Text>
            <Text style={stylesMemo.label} >
                {messageTo}
            </Text>
            <View style={stylesMemo.row} >
                {childrenTitle && <Text style={stylesMemo.childrenTitle} >
                    {childrenTitle}
                </Text>}
            </View>
            {children}
            <View style={[stylesMemo.row, { marginTop: 20}]} >
               {showGoBackButton && <Button
                    borderEnabled
                    borderColor={colors.PRIMARY}
                    backgroundColor={colors.BUTTON}
                    onPress={onGoBack}
                >
                    {arrowLeftIconBig(colors.ICON_COLOR)}
                    
                </Button>}
                
                <Button
                    borderEnabled
                    style={{flex: 1}}
                    backgroundColor={colors.PRIMARY}
                    onPress={onNextStep}
                    disabled={disabled}
                >
                    {arrowRightIcon(colors.WHITE)}
                    
                </Button>
            </View>

        </View>
    );
}

export default memo(Form);


const styles = ({ colors, fontSize }: IStyles) => {

    return StyleSheet.create({
        container: {
            flex: 1,
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
            marginBottom: 20,
        },
        row: {
            flexDirection: 'row',
            gap: 8,
        },
        wrapper: {
            height: 50,
            paddingHorizontal: 16
        },
        childrenTitle: {
            fontSize: fontSize(16),
            fontFamily: 'NotoSansArmenian',
            fontWeight: '400',
            color: colors.TEXT_COLOR,
            lineHeight: 27
        },
    })
}


