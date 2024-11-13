

import React, { memo, ReactNode, useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../hooks";
import { IStyles } from "../contexts/ThemeContext";
import { ICategory, ISubcategory } from "../interfaces/data.types";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

interface IProps {
    title?: string;
    onPress?: () => void;
    disabled?: boolean;
    backgroundColor?: string;
    borderColor?: string;
    borderEnabled?: boolean;
    borderWidth?: number;
    children?: ReactNode
}

function Button({ title, backgroundColor, disabled, onPress, borderColor, borderEnabled, borderWidth, children}: IProps) {

    const { colors, isDarkTheme, coefficient } = useTheme();
    const fontSize = (size: number) => size * coefficient;
    const stylesMemo = useMemo(() => styles({ colors, fontSize }), [isDarkTheme, coefficient])
    return (
        <TouchableOpacity
            style={[
                stylesMemo.container, 
                { 
                    backgroundColor: backgroundColor ?? colors.PRIMARY,
                    borderColor: borderEnabled ? borderColor?? backgroundColor ?? colors.PRIMARY : undefined,
                    borderWidth: borderEnabled ? borderWidth ?? 1 : 0,
                }
            ]} 
            onPress={onPress}
            disabled={disabled}
        >
           {!children
           ?  <Text style={stylesMemo.title} >
                {title}
            </Text>
            : children}
        </TouchableOpacity>
    )
}

export default memo(Button);

const styles = ({ colors, fontSize }: IStyles) => {
    return StyleSheet.create({
        container: {
            height: 43,
            paddingHorizontal: 16,
            borderRadius: 6,
            justifyContent: 'center',
            alignItems: 'center',
        },

        title: {
            fontSize: fontSize(16),
            fontWeight: '600',
            lineHeight: 22,
            fontFamily: 'NotoSansArmenian',
            textAlign: 'center',
            color: colors.TEXT_COLOR,
        }
    })
}  