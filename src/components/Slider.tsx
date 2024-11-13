import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useSharedValue, useAnimatedStyle, runOnJS } from 'react-native-reanimated';
import { minusIcon, plusIcon } from '../assets/icons/plusIcon';
import { ColorScheme } from '../contexts/ThemeContext';
import { useTheme } from '../hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IProps {
    stepsCount?: number;
    sliderWidth?: number
}
const SliderComponent = ({ stepsCount = 3, sliderWidth = 200 }: IProps) => {
    const { colors, isDarkTheme, setFontSize } = useTheme()
    const stylesMemo = useMemo(() => styles(colors), [isDarkTheme])


    const maxValue = stepsCount - 1;
    const minValue = 0;

    const [value, setValue] = useState(1);
    const translateX = useSharedValue((value / maxValue) * sliderWidth);

    useEffect(() => {
        AsyncStorage.getItem('font-size').then((value) => {
            if (value) {
                translateX.value = +value * sliderWidth / maxValue
                setValue(+value)
            }
        });
    }, [])

    const panGestureEvent = useAnimatedGestureHandler({
        onStart: (_, ctx) => {
            ctx.startX = translateX.value;
        },
        onActive: (event, ctx) => {
            // @ts-ignore
            translateX.value = Math.min(Math.max(+ctx.startX + event.translationX, 0), sliderWidth);
        },
        onEnd: () => {
            const index = Math.round((translateX.value / sliderWidth) * maxValue)
            runOnJS(setValue)(Math.round((translateX.value / sliderWidth) * maxValue))

            translateX.value = index * sliderWidth / maxValue
            runOnJS(setFontSize)(index)
        },
    });

    const sliderStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });


    const onPressPlus = () => {
        if (value < maxValue) {
            translateX.value = (value + 1) * sliderWidth / maxValue
            setValue(value + 1);
            setFontSize(value + 1)
        }
    };

    const onPressMinus = () => {
        if (value > minValue) {
            translateX.value = (value - 1) * sliderWidth / maxValue
            setValue(value - 1);
            setFontSize(value - 1)
        }
    }


    return (
        <View style={stylesMemo.container}>
            <TouchableOpacity
                style={stylesMemo.button}
                onPress={onPressMinus}
            >
                {minusIcon()}
            </TouchableOpacity>
            <View style={[stylesMemo.sliderContainer, { width: sliderWidth }]}>
                <View style={stylesMemo.sliderTrack} />
                <View style={stylesMemo.stepsBox} >
                    {Array.from({ length: stepsCount }).map((_: any, i: number) => {
                        return <View
                            key={i}
                            style={stylesMemo.step}
                        />
                    })}
                </View>
                <PanGestureHandler onGestureEvent={panGestureEvent}>
                    <Animated.View style={[stylesMemo.sliderThumb, sliderStyle]} />
                </PanGestureHandler>
            </View>
            <TouchableOpacity
                style={stylesMemo.button}
                onPress={onPressPlus}
            >
                {plusIcon()}
            </TouchableOpacity>
        </View>
    );
};

const styles = (appColors: ColorScheme) => {
    return StyleSheet.create({
        container: {
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 10
        },
        label: {
            fontSize: 18,
            marginBottom: 10,
            color: '#ffffff',
        },
        sliderContainer: {
            height: 30,
            justifyContent: 'center',
        },
        sliderTrack: {
            height: 4,
            backgroundColor: appColors.DISABLED,
            borderRadius: 2,
        },
        sliderThumb: {
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: appColors.PRIMARY,
            position: 'absolute',
            top: 4,
            left: -10
        },
        valueText: {
            fontSize: 16,
            marginTop: 10,
            color: '#ffffff',
        },
        step: {
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: appColors.DISABLED,

        },
        stepsBox: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
        },
        button: {
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
        }
    })
}

export default SliderComponent;
