import React from 'react';
import { View, Text, Pressable } from 'react-native';
import {ToastConfigParams } from 'react-native-toast-message';
import { chatIcon, errorIcon } from '../assets/icons';

export const toastConfig = (stylesMemo: any) => {
    return {
        custom: ({ text1, text2, onPress, hide }: ToastConfigParams<any>) => (
            <Pressable style={stylesMemo.wrapper} onPress={() => {
                onPress()
                hide()
            }} >
                <View style={stylesMemo.icon} >
                    {chatIcon()}
                </View>
                <View style={stylesMemo.customContainer}>
                    <Text numberOfLines={1} style={stylesMemo.customText1}>{text1}</Text>
                    <Text numberOfLines={1}  style={stylesMemo.customText2}>{text2}</Text>
                </View>
            </Pressable>
        ),

        error: ({ text1, text2, onPress, hide }: ToastConfigParams<any>) => (
            <Pressable style={stylesMemo.wrapper} onPress={() => {
                hide()
            }} >
                <View style={stylesMemo.icon} >
                    {errorIcon()}
                </View>
                <View style={stylesMemo.customContainer}>
                    <Text numberOfLines={1} style={stylesMemo.customText1}>{text1}</Text>
                    <Text numberOfLines={1}  style={stylesMemo.customText2}>{text2}</Text>
                </View>
            </Pressable>
        ),
    }
};

