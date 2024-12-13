import { Image, ScrollView, StyleSheet, Text, Dimensions, TextProps, useWindowDimensions, View, FlatList } from 'react-native';
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
import { IFiles, ISubcategory, ISubcategoryData } from '../interfaces/data.types';
import RenderHTML from 'react-native-render-html';
import { axiosInstance } from '../api';
import { urls } from '../api/urls';
import { useQuery } from '@tanstack/react-query';
import Loading from '../components/Loading';
import { getSubCategory } from '../api/requests';
import VideoItem from '../components/VideoItem';

interface IProps {
    navigation: NavigationProp<ParamListBase>;
    route: RouteProp<any>;
}


const RenderItem = ({m}: {m:IFiles}) => {

    const [ratio, setRatio] = useState(0)


    
     m.type === 'image' && Image.getSize(m.path, (w, h) => {
        console.log(' -------------------------->', w / h);
        setRatio(w/h)
        return w / h
    })

    return (
        <View>
            {
                m.type === 'image'
                    ?  ratio > 0 && <Image
                        style={{
                            width: '100%',
                            resizeMode: 'contain',
                            aspectRatio: ratio,
                            marginBottom: 16
                        }}
                        source={{ uri: m.path }}
                        resizeMode='cover'

                    />
                    : <View>
                        <VideoItem url={m.path} />
                    </View>
            }
        </View>
    )
}



export default function SubCategoryScreen({ navigation, route }: IProps) {
    const { width } = useWindowDimensions();
    const { colors, isDarkTheme, coefficient } = useTheme();
    const fontSize = (size: number) => size * coefficient;


    const category: ISubcategory = route.params?.item;
    const { data, error, isFetching } = useQuery({
        queryKey: ['subcategory' + category.id],
        queryFn: async () => await getSubCategory(category.id!),
        select: (data) => data as ISubcategory,
    });

    const stylesMemo = useMemo(
        () => styles({ colors, fontSize }),
        [isDarkTheme, coefficient],
    );


    useEffect(() => {
        if (error) {
            console.error({ error });
        } null
    }, [error]);



    const htmlComponent = useMemo(() => {
        if (data) {
            return (
                <RenderHTML
                    contentWidth={width - 32}
                    source={{ html: data.content }}

                    defaultTextProps={{
                        style: {
                            fontSize: 16,
                            color: colors.TEXT_COLOR
                        }
                    }}
                />
            )
        } else {
            return <Loading />
        }


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
                    {data?.title && <Text style={stylesMemo.title} >
                        {data?.title}
                    </Text>}
                    {htmlComponent}
                    {data && data.files.length > 0 &&
                        <FlatList
                            data={data.files}
                            renderItem={({ item }) => <RenderItem m={item} />}
                            keyExtractor={(item) => item.id.toString()}
                            scrollEnabled={false}
                            contentContainerStyle={{ flexGrow: 1 }}
                            style={{ flex: 1 }}
                        />}
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
            alignItems: 'center',
        },
        title: {
            fontSize: fontSize(18),
            fontFamily: 'NotoSansArmenian',
            fontWeight: '700',
            textAlign: 'center',
            color: colors.TEXT_COLOR,
            margin: 20,
        },
        image: {
            width: Dimensions.get('window').width - 32,
            resizeMode: 'contain'
        }
    });
};
