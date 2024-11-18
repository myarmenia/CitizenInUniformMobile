import { memo, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../hooks";
import { IStyles } from "../contexts/ThemeContext";

interface IProps {
    stepsCount: number;
    activeStep: number;

}

function Steps({ stepsCount = 4, activeStep = 3 }: IProps) {

    const { colors, isDarkTheme, coefficient } = useTheme();
    const fontSize = (size: number) => size * coefficient;
    const stylesMemo = useMemo(() => styles({ colors, fontSize }), [isDarkTheme, coefficient]);

    return (
        <View style={stylesMemo.container}>
            {Array.from({ length: stepsCount }).map((item, index) => {
                return (
                    <View
                        style={[
                            stylesMemo.step,
                            index < activeStep - 1 && {
                                backgroundColor: colors.PRIMARY,
                                borderColor: colors.PRIMARY
                            },
                            index === activeStep - 1 && {
                                borderColor: colors.PRIMARY
                            }
                        ]}
                        key={index}
                    >

                        <Text style={[
                            stylesMemo.label,
                            index < activeStep - 1 && {
                                color: colors.WHITE
                            },
                            index === activeStep - 1 && {
                                color: colors.PRIMARY
                            }
                        ]}  >
                            {index + 1}
                        </Text>
                    </View>

                )
            })}
            <View style={stylesMemo.linesBox} >
                {Array.from({ length: stepsCount - 1 }).map((item, index) => {
                    return (
                        <View
                            style={[
                                stylesMemo.line,
                                index < activeStep - 1 && {
                                    backgroundColor: colors.PRIMARY,
                                    opacity: 1
                                },
                            ]}
                            key={index}
                        />
                    )
                })}
            </View>
        </View>
    );
}

export default memo(Steps);


const styles = ({ colors, fontSize }: IStyles) => {

    return StyleSheet.create({
        container: {
            height: 80,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 20
        },
        step: {
            width: 40,
            height: 40,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2,
            backgroundColor: colors.BUTTON,
            borderColor: colors.DISABLED,
            borderWidth: 1,
        },
        label: {
            fontSize: 18,
            fontWeight: '400',
            lineHeight: 27,
            color: colors.DISABLED,
            marginBottom: 4,
            textAlign: 'center'
        },
        linesBox: {
            position: 'absolute',
            left: 0,
            right: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: 5
        },
        line: {
            flex: 1,
            backgroundColor: colors.BUTTON,
            height: 5,
            opacity: .5
        }

    })
}


