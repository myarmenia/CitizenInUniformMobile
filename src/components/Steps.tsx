import { memo, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import {  useTheme } from "../hooks";
import {IStyles } from "../contexts/ThemeContext";

interface IProps {
    navigation: NavigationProp<ParamListBase>,
    goBackAction?: boolean
}

function Steps({ navigation, goBackAction = true }: IProps) {
    const { colors, isDarkTheme, coefficient } = useTheme()
    const fontSize = (size: number) => size * coefficient;
    const stylesMemo = useMemo(() => styles({ colors, fontSize }), [isDarkTheme, coefficient])


    return (
        <View style={stylesMemo.container} >
            
        </View>
    )
}

export default memo(Steps);


const styles = ({ colors, fontSize }: IStyles) => {

    return StyleSheet.create({
        container: {
          
        },
       
    })
}


