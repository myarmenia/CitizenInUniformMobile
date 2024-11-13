import { StyleSheet, View } from "react-native";
import Header from "../components/Header";
import { NavigationProp, ParamListBase, RouteProp } from "@react-navigation/native";
import Footer from "../components/Footer";
import Background from "../components/Background";
import { useTheme } from "../hooks";
import { useMemo } from "react";
import { IStyles } from "../contexts/ThemeContext";
import SliderComponent from "../components/Slider";
import Menu from "../components/Menu";
import { ICategory } from "../interfaces/data.types";

interface IProps {
    navigation: NavigationProp<ParamListBase>
    route: RouteProp<any>
}

export default function CategoryScreen({ navigation, route }: IProps) {

    const { colors, isDarkTheme, coefficient } = useTheme();
    const fontSize = (size: number) => size * coefficient;
    const stylesMemo = useMemo(() => styles({ colors, fontSize }), [isDarkTheme, coefficient]);

    const data: ICategory= route.params?.data;

    const onPress = () => {
        console.log('onPress ---->');
    }

    return (
        <Background>
            <View style={stylesMemo.container}  >
                <Header navigation={navigation} goBackAction={true} />
                <SliderComponent/>
                <Menu
                    onPress={onPress}
                    navigation={navigation}
                    data={data.sub_categories}
                    iconUrl={data.icon}
                />
                <Footer
                    navigation={navigation}
                    showActions={true}
                />
            </View>

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