import { StyleSheet, Text, View } from 'react-native';
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
import Switch from '../components/Switch';
import SliderComponent from '../components/Slider';
import { appStrings } from '../assets/appStrings';
import { getNotifAccessFromAS, getNotifSoundAccessFromAS, setNotifAccessToAS, setNotifSoundAccessToAS } from '../services/asyncStoryge';
import { access } from 'fs';
import { getSettings, updateSettings } from '../api/requests';
import { handleNotificationPermission } from '../helpers';

interface IProps {
    navigation: NavigationProp<ParamListBase>;
    route: RouteProp<any>;
}

export default function SettingsScreen({ navigation, route }: IProps) {
    const { colors, isDarkTheme, coefficient, toggleTheme } = useTheme();
    const fontSize = (size: number) => size * coefficient;

    const [accessNotif, setAccessNotif] = useState<undefined | boolean>(undefined);
    const [accessSound, setAccessSound] = useState<undefined | boolean>(undefined);

    const stylesMemo = useMemo(
        () => styles({ colors, fontSize }),
        [isDarkTheme, coefficient],
    );

    useEffect(() => {
        getParams();

        getSettings().then((settings) => {
           console.log(settings?.data.result);
           
        })
    }, [])


    const getParams = () => {
        try {
            getNotifAccessFromAS().then((access) => {
                setAccessNotif(access);
            })

            getNotifSoundAccessFromAS().then((access) => {
                setAccessSound(access);
            })
        } catch (error) {
            console.error('getParams ------------>', error);
        }
    }

    const onToggleNotifAccess = async () => {
        try {
            const permission = handleNotificationPermission()
            setAccessNotif(!accessNotif);
            await updateSettings(!accessNotif, !!accessSound);
            await setNotifAccessToAS(!accessNotif);
        } catch (error) {
            console.error('onToggleNotifAccess', error);
            
        }
    }

    const onToggleNotifSound = async () => {
        try {
            setAccessSound(!accessSound);
            await updateSettings(!!accessNotif, !accessSound);
            setNotifSoundAccessToAS(!accessSound);

        } catch (error) {
             console.error('onToggleNotifSound', error);
        }
    }

    return (
        <Background>
            <View style={stylesMemo.container}>
                <Header navigation={navigation} showSettings={false} />
                <View style={stylesMemo.main}>
                    <View style={stylesMemo.row}>
                        <View style={{ flex: 1 }} >

                            <Text numberOfLines={1} style={stylesMemo.title} >
                                {appStrings.notifications}
                            </Text>
                        </View>
                        <Switch initialValue={!!accessNotif} onToggle={onToggleNotifAccess} />
                    </View>
                    <View style={stylesMemo.row}>
                        <View style={{ flex: 1 }} >
                            <Text numberOfLines={1} style={stylesMemo.title} >
                                {appStrings.notificationsSound}
                            </Text>
                        </View>

                        <Switch initialValue={!!accessSound} onToggle={onToggleNotifSound} />
                    </View>
                    <View style={stylesMemo.row}>
                        <View style={{ flex: 1 }} >
                            <Text numberOfLines={1} style={stylesMemo.title} >
                                {appStrings.darkMode}
                            </Text>
                        </View>

                        <Switch initialValue={isDarkTheme} onToggle={toggleTheme} />
                    </View>
                    <View style={stylesMemo.row}>
                        <View style={{ flex: 1 }} >
                            <Text numberOfLines={1} style={stylesMemo.title} >
                                {appStrings.fontSize}
                            </Text>

                        </View>
                        <SliderComponent sliderWidth={120} />
                    </View>
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
            alignItems: 'center',
        },
        title: {
            fontSize: fontSize(16),
            fontFamily: 'NotoSansArmenian',
            fontWeight: '700',
            color: colors.TEXT_COLOR,
        },
        main: {
            paddingTop: 20,
            paddingHorizontal: 16,
            gap: 20
        },
        row: {
            flexDirection: 'row',
            gap: 8,
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'
        }
    });
};
