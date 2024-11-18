import React, { useEffect, useState } from 'react'
import { Alert, Appearance, Text, useColorScheme } from 'react-native';
import { darkColors, lightColors } from '../assets/appColors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ColorScheme = typeof darkColors | typeof lightColors

export interface IStyles {
    fontSize: (size: number) => number;
    colors: ColorScheme
}

export const ThemeContext = React.createContext({
    isDarkTheme: false,
    colors: lightColors,
    toggleTheme: () => { },
    setFontSize: (size: number) => { },
    coefficient: 1
})

interface IProps {
    children: React.ReactNode;
}

export const ThemeProvider = ({ children }: IProps) => {

    const colorScheme = useColorScheme();
    const isDarkTheme = colorScheme === 'dark';
    const [isDark, setIsDark] = useState(isDarkTheme);
    const [coefficient, setCoefficient] = useState(1);    

    const colors = isDark ? darkColors : lightColors;

    useEffect(() => {
        getFontSize();
        AsyncStorage.getItem('theme').then(theme => {
            if(theme) {
                setIsDark(theme === 'dark')
            } else {
                setIsDark(isDarkTheme);
                if(colorScheme) {
                    AsyncStorage.setItem('theme', colorScheme)
                }

            }
        })
    }, [isDarkTheme])


    const toggleTheme = () => {
        if (isDarkTheme) {            
            Appearance.setColorScheme('light');
            AsyncStorage.setItem('theme', 'light')
        } else {
            AsyncStorage.setItem('theme', 'dark')
            Appearance.setColorScheme('dark');
        }
    }

    const setFontSize = async (size: number) => {
        try {
            AsyncStorage.setItem('font-size', size.toString());
            handleFontSize(size);

        } catch (error) {
            Alert.alert('error', JSON.stringify(error))
        }
    }

    const handleFontSize = (size: number ) => {
        if (size == 1) {
            setCoefficient(1);
        } else if (size == 2) {
            setCoefficient(1.2);
        } else if (size == 0) {
            setCoefficient(0.8);
        } else {
            setCoefficient(1);
        }
    }

    const getFontSize = async () => {
        try {
            const size = await AsyncStorage.getItem('font-size');
            
            if (size) {
                handleFontSize(+size);
                return parseInt(size);
            } else {
                AsyncStorage.setItem('font-size', (1).toString());
            }

        } catch (error) {
            Alert.alert('error', JSON.stringify(error))

        }
    }

    const value = React.useMemo(
        () => ({
            isDarkTheme: isDark,
            colors,
            toggleTheme,
            setFontSize,
            coefficient
        }),
        [
            isDark,
            colors,
            toggleTheme,
            setFontSize,
            coefficient
        ],
    )

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
