import { memo, useEffect, useMemo, useRef, useState } from "react";
import { Animated, Easing, Pressable, StyleSheet, View } from "react-native";
import { appStrings } from "../assets/appStrings";
import { useTheme } from "../hooks";
import {  IStyles } from "../contexts/ThemeContext";
import { appStyles } from "../styles";

interface IProps {
    leftTitle?: string,
    rightTitle?: string,
    initialValue: boolean,
    onToggle: (value: boolean) => void,
}

function Switch({
    leftTitle = appStrings.off,
    rightTitle = appStrings.on,
    initialValue,
    onToggle,
}: IProps) {
    const { colors, isDarkTheme, coefficient, toggleTheme } = useTheme()
    const fontSize = (size: number) => size * coefficient;
    const stylesMemo = useMemo(() => styles({ colors, fontSize }), [isDarkTheme, coefficient])


    const [value, setValue] = useState(initialValue);
    const animatedValue = useRef(new Animated.Value(value ? 1 : 0));


    useEffect(() => {
        animatedValue.current = new Animated.Value(initialValue? 1 : 0)
        setValue(initialValue)
    }, [initialValue])
    
    const toggle = () => {
        const newValue = !value;
        setValue(newValue);
        onToggle(newValue);
        Animated.timing(animatedValue.current, {
            toValue: newValue ? 1 : 0,
            duration: 320,
            useNativeDriver: true,
            easing: Easing.bezier(0.86, 0.07, 0.07, 1.0)
        }).start();
    };

    return (
        <Pressable style={stylesMemo.container} onPress={toggle}  >
            <View style={[stylesMemo.row, { zIndex: 2 }]}>
                <View style={stylesMemo.button} >
                    <Animated.Text style={[stylesMemo.title, {
                        color: value ? colors.BLACK : colors.WHITE
                    }]} numberOfLines={1} >
                        {leftTitle}
                    </Animated.Text>
                </View>
                <View style={[stylesMemo.button]} >
                    <Animated.Text style={[stylesMemo.title, {
                        color: value ? colors.WHITE : colors.BLACK
                    }]} numberOfLines={1} >
                        {rightTitle}
                    </Animated.Text>
                </View>
            </View>
            <View style={[StyleSheet.absoluteFillObject,]}>
                <Animated.View style={[stylesMemo.switch, {
                    backgroundColor: animatedValue.current.interpolate({
                        inputRange: [0, 1],
                        outputRange: [colors.SWITCH_INACTIVE, colors.SWITCH_ACTIVE],
                    }),
                    transform: [{
                        translateX: animatedValue.current.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 85],
                        })
                    }],

                }]}>

                </Animated.View>
            </View>
        </Pressable>
    );
}

export default memo(Switch);


const styles = ({ colors, fontSize }: IStyles) => {

    return StyleSheet.create({
        container: {
            height: 42,
            justifyContent: 'center',
            width: 170,
            backgroundColor: colors.SWITCH,
            overflow: 'hidden',
            borderRadius: 8,
            ...appStyles({colors, fontSize}).shadow
        },

        switch: {
            width: '50%',
            height: 42,
            // borderRadius: 8,
            justifyContent: 'center',
        },

        title: {
            fontSize: 14,
            fontWeight: '400',
            textAlign: 'center',
        },
        row: {
            flexDirection: 'row',
        },
        button: {
            width: '50%',
            height: 42,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 5,
        }
    })
}





// <Animated.View style={[stylesMemo.switchContainer, {
//                     backgroundColor: animatedValue.interpolate({
//                         inputRange: [0, 1],
//                         outputRange: [colors.BACKGROUND_2, colors.PRIMARY],
//                     })
//                 }]} />
//                 <Animated.View style={[stylesMemo.switch, {
//                     transform: [{
//                         translateX: animatedValue.interpolate({
//                             inputRange: [0, 1],
//                             outputRange: [0, coefficient * 100],
//                         })
//                     }]
//                 }]}></Animated.View>