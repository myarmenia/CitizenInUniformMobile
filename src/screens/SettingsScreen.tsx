import { StyleSheet, View } from 'react-native';
import Header from '../components/Header';
import {
    NavigationProp,
    ParamListBase,
    RouteProp,
} from '@react-navigation/native';
import Footer from '../components/Footer';
import Background from '../components/Background';
import { useTheme } from '../hooks';
import { useMemo } from 'react';
import { IStyles } from '../contexts/ThemeContext';
import { ICategory, ISubcategoryData } from '../interfaces/data.types';
import { axiosInstance } from '../api';
import { urls } from '../api/urls';

interface IProps {
    navigation: NavigationProp<ParamListBase>;
    route: RouteProp<any>;
}

const getSubCategory = async (id?: string) => {
    try {
        if (id) {
            return axiosInstance.get<ISubcategoryData>(urls.SUB_CATEGORY + `${id}/show`)
        }

    } catch (error) {
        console.error(error)
    }
}

export default function SettingsScreen({ navigation, route }: IProps) {
    const category: ICategory = route.params?.data;

    const { colors, isDarkTheme, coefficient } = useTheme();
    const fontSize = (size: number) => size * coefficient;

    const stylesMemo = useMemo(
        () => styles({ colors, fontSize }),
        [isDarkTheme, coefficient],
    );
    return (
        <Background>
            <View style={stylesMemo.container}>
                <Header navigation={navigation} showSettings={false} />
                <View>

                </View>
                <Footer 
                    navigation={navigation} 
                    showActions={false}
                />
            </View>
        </Background>
    );
}

const styles = ({ colors, fontSize }: IStyles) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center'
        },
        title: {
            fontSize: fontSize(18),
            fontFamily: 'NotoSansArmenian',
            fontWeight: '700',
            textAlign: 'center',
            color: colors.TEXT_COLOR,
            margin: 20,
        },
    });
};
