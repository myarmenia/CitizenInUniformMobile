import { ScrollView, StyleSheet, Text, TextProps, useWindowDimensions, View } from 'react-native';
import Header from '../components/Header';
import {
    NavigationProp,
    ParamListBase,
    RouteProp,
} from '@react-navigation/native';
import Footer from '../components/Footer';
import Background from '../components/Background';
import { useTheme } from '../hooks';
import { useEffect, useMemo, useState } from 'react';
import { IStyles } from '../contexts/ThemeContext';
import { ICategory, ISubcategoryData } from '../interfaces/data.types';
import RenderHTML from 'react-native-render-html';
import { axiosInstance } from '../api';
import { urls } from '../api/urls';
import { useQuery } from '@tanstack/react-query';

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

export default function SubCategoryScreen({ navigation, route }: IProps) {
    const { width } = useWindowDimensions();
    const { colors, isDarkTheme, coefficient } = useTheme();
    const fontSize = (size: number) => size * coefficient;

    const category: ICategory = route.params?.data;
    const { data, error, isFetching } = useQuery({
        queryKey: ['subcategory' + category.id],
        queryFn: async () => await getSubCategory(category?.id),
        select: (data) => data?.data,
    });

    const stylesMemo = useMemo(
        () => styles({ colors, fontSize }),
        [isDarkTheme, coefficient],
    );


    useEffect(() => {
        if (error) {
            console.error({ error });
        }
    }, [error]);


    const htmlComponent = useMemo(() => {
        if (data) {
            return (
                <RenderHTML
                    contentWidth={width - 32}
                    source={{ html: data.result.content }}
                    defaultTextProps={{
                        style: {
                            fontSize: 16,

                        }
                    }}
                />
            )
        }
        return null;

    }, [data])




    return (
        <Background>
            <View style={stylesMemo.container}>
                <Header navigation={navigation} goBackAction={true} />
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{
                        paddingHorizontal: 16,
                        flexGrow: 1,
                        alignItems: 'center',
                        paddingBottom: 200
                    }}>
                    {data?.result.title && <Text style={stylesMemo.title} >
                        {data?.result.title}
                    </Text>}
                    {htmlComponent}
                </ScrollView>
                <Footer navigation={navigation} showActions={false} />
            </View>
        </Background>
    );
}


const tagsStyles = ({ colors, fontSize }: IStyles) => {
    return {
        p: {
            fontSize: 16,
            color: colors.TEXT_COLOR
        },

        h1: {
            fontSize: 24,
            color: colors.TEXT_COLOR

        },
        a: {
            color: 'blue',
            fontSize: 16,
        },
    }

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
