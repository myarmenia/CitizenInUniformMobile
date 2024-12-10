import { FlatList, StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Footer from "../components/Footer";
import Background from "../components/Background";
import { useTheme } from "../hooks";
import { useEffect, useMemo } from "react";
import { IStyles } from "../contexts/ThemeContext";
import { useQuery } from "@tanstack/react-query";
import { getFAQs } from "../api/requests";
import { appStrings } from "../assets/appStrings";
import Loading from "../components/Loading";
import FACRenderItem from "../components/FACRenderItem";
import { IBaseData, IFAQ } from "../interfaces/data.types";
import FACItem from "../components/FACItem";
interface IProps {
    navigation: NavigationProp<ParamListBase>
}

export default function FAQScreen({ navigation }: IProps) {

    const { colors, isDarkTheme, coefficient } = useTheme();
    const fontSize = (size: number) => size * coefficient;
    const stylesMemo = useMemo(() => styles({ colors, fontSize }), [isDarkTheme, coefficient]);

    const { data, isError, isFetching } = useQuery({
        queryKey: ['faq'],
        queryFn: getFAQs,
    })

    const renderItem = ({ item, index }: { item: IFAQ, index: number }) => {
        return (
            <FACItem data={item}/>
        )
    }

    return (
        <Background>
            <View style={stylesMemo.container}  >
                <Header navigation={navigation} goBackAction={true} />
                <View style={stylesMemo.main} >
                    <Text style={stylesMemo.title} >
                        {appStrings.answerAndQuestions}
                    </Text>
                    {!isFetching
                        ? <View>
                            <FlatList
                                data={data}
                                renderItem={renderItem}
                                contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1, paddingBottom: 200}}
                            />
                        </View>
                        : <Loading />
                    }
                </View>
                    <View style={stylesMemo.footerBox} >
                        <Footer
                            navigation={navigation}
                            showActions={false}
                        />
                    </View>
            </View>
        </Background>
    )
};


const styles = ({ colors, fontSize }: IStyles) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center'
        },
        title: {
            fontSize: fontSize(18),
            fontFamily: 'NotoSansArmenian',
            fontWeight: '700',
            textAlign: 'center',
            color: colors.TEXT_COLOR,
            marginVertical: 30
        },
        main: {
            flex: 1,
        },
        footerBox: {
            alignItems: 'center'
        }
    })
}  