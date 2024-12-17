import { StyleSheet, View } from "react-native";
import Header from "../components/Header";
import { NavigationProp, ParamListBase, RouteProp } from "@react-navigation/native";
import Footer from "../components/Footer";
import Background from "../components/Background";
import { useTheme } from "../hooks";
import { useEffect, useMemo } from "react";
import { IStyles } from "../contexts/ThemeContext";
import SliderComponent from "../components/Slider";
import Menu from "../components/Menu";
import { ICategory, ISubcategory } from "../interfaces/data.types";
import { navigationTypes } from "../navigation/navigation.types";
import Toast from "react-native-toast-message";
import messaging from '@react-native-firebase/messaging';

interface IProps {
    navigation: NavigationProp<ParamListBase>
    route: RouteProp<any>
}

export default function CategoryScreen({ navigation, route }: IProps) {

    const { colors, isDarkTheme, coefficient } = useTheme();
    const fontSize = (size: number) => size * coefficient;
    const stylesMemo = useMemo(() => styles({ colors, fontSize }), [isDarkTheme, coefficient]);

    const data: ICategory = route.params?.data;

    const onPress = (item: ISubcategory) => {
        navigation.navigate(navigationTypes.SUB_CATEGORY, {item})
    }

    useEffect(() => {
        

        const unsubscribe =  messaging().onMessage(async (data) => {
            try {                
                Toast.show({
                    text1: data?.notification?.title,
                    text2: data?.notification?.body,
                    type: 'custom',
                    onPress: () => {
                        navigation?.navigate(navigationTypes.MESSAGES)
                    }
                })
            } catch (error) {
                console.log('error', error);
            }
        
        })

        return () => {
            unsubscribe()
        }
    },[])

    return (
        <Background>
            <View style={stylesMemo.container}  >
                <Header navigation={navigation} goBackAction={true} />
                <Menu
                    onPress={onPress}
                    navigation={navigation}
                    data={data.sub_categories}
                    iconUrl={data.icon}
                />
                <Footer
                    navigation={navigation}
                    showActions={false}
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