import { StyleSheet, View } from "react-native";
import Header from "../components/Header";
import { NavigationProp, ParamListBase, useIsFocused } from "@react-navigation/native";
import Footer from "../components/Footer";
import Background from "../components/Background";
import { useFormData, useTheme } from "../hooks";
import { useEffect, useMemo } from "react";
import { IStyles } from "../contexts/ThemeContext";
import Menu from "../components/Menu";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading";
import { getCategories } from "../api/requests";

interface IProps {
    navigation: NavigationProp<ParamListBase>
}



export default function HomeScreen({ navigation }: IProps) {

    const { colors, isDarkTheme, coefficient } = useTheme();
    const fontSize = (size: number) => size * coefficient;
    const stylesMemo = useMemo(() => styles({ colors, fontSize }), [isDarkTheme, coefficient]);
    const { clearState } = useFormData();

    const isFocused = useIsFocused();

    const { data, isError, isFetching } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
        select: (data) => data,
    });

    useEffect(() => {
        isFocused && clearState()
    }, [isFocused]);

    return (
        <Background>
            {
                !isFetching
                    ? <>
                        <View style={stylesMemo.container}  >
                            <Header navigation={navigation} goBackAction={false} />
                            <Menu data={data} navigation={navigation} />
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