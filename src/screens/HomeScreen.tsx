import { StyleSheet, View } from "react-native";
import Header from "../components/Header";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Footer from "../components/Footer";
import Background from "../components/Background";
import { useTheme } from "../hooks";
import { useMemo } from "react";
import { IStyles } from "../contexts/ThemeContext";
import Menu from "../components/Menu";
import { useQuery } from "@tanstack/react-query";
import { urls } from "../api/urls";
import { ICategoryData } from "../interfaces/data.types";
import Loading from "../components/Loading";
import { axiosInstance } from "../api";
interface IProps {
    navigation: NavigationProp<ParamListBase>
}

const getPosts = async () => {
    return axiosInstance.get<ICategoryData>(urls.CATEGORIES)
}

export default function HomeScreen({ navigation }: IProps) {

    const { colors, isDarkTheme, coefficient } = useTheme();
    const fontSize = (size: number) => size * coefficient;
    const stylesMemo = useMemo(() => styles({ colors, fontSize }), [isDarkTheme, coefficient]);

    const { data, isError, isFetching } = useQuery({
        queryKey: ['posts'],
        queryFn: getPosts,
        select: (data) => data.data,
    });


    return (
        <Background>
            {
                !isFetching
                    ? <>
                        <View style={stylesMemo.container}  >
                            <Header navigation={navigation} goBackAction={false} />
                            <Menu data={data?.result} navigation={navigation} />
                            <Footer
                                navigation={navigation}
                                showActions={false}
                            />
                        </View>
                    </>
                    : <Loading />
            }

        </Background>
    )
};


const styles = ({ colors, fontSize }: IStyles) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        },
        title: {
            fontSize: 24,
            fontFamily: 'NotoSansArmenian',
            fontWeight: '400',
            textAlign: 'center',
        }
    })
}  