import React, { useEffect, useState } from 'react'
import { Alert, useColorScheme } from 'react-native';
import { darkColors, lightColors } from '../assets/appColors';
import { handleFontSize } from '../helpers';
import { getFontSize, getThemefromAS, setFontSizeToAS, setThemeToAS } from '../services/asyncStoryge';

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
        getFontSize().then((size) => {
            size && setCoefficient(+size);
        });
        getThemefromAS().then(theme => {
            if (theme) {                
                setIsDark(theme === 'dark')
            } else {
                setIsDark(isDarkTheme);
                setThemeToAS(isDarkTheme ? 'dark' : 'light');

            }
        })
    }, []);


    const toggleTheme = async () => {
        if (isDark) {
            setThemeToAS('light'); 
            setIsDark(false)
            
        } else {
            setThemeToAS('dark');
            setIsDark(true)
        }
    }


    const setFontSize = async (size: number) => {
        try {
            setFontSizeToAS(size)
            setCoefficient(handleFontSize(size));

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
            coefficient
        ],
    )

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
