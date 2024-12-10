import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../components/Header';
import {
    NavigationProp,
    ParamListBase,
    RouteProp,
    useIsFocused,
} from '@react-navigation/native';
import Footer from '../components/Footer';
import Background from '../components/Background';
import { useNotify, useTheme } from '../hooks';
import { useEffect, useMemo, useState } from 'react';
import { IStyles } from '../contexts/ThemeContext';
import { fakeNotificationsList } from '../data/fakeData';
import NotificationItem from '../components/NotificationItem';
import { appStrings } from '../assets/appStrings';
import { removeIcon } from '../assets/icons/removeIcon';
import { appStyles } from '../styles';
import Loading from '../components/Loading';
import { removeAllNorifications } from '../api/requests';


interface IProps {
    navigation: NavigationProp<ParamListBase>;
    route: RouteProp<any>;
}

export default function NotificationScreen({ navigation }: IProps) {
    const { colors, isDarkTheme, coefficient } = useTheme();
    const fontSize = (size: number) => size * coefficient;
    const [isLoading, steIsLoading] = useState(false);

    const { notifications, isFetching, refetch } = useNotify();

    const isFocused = useIsFocused();

    useEffect(() => {
        refetch();
    }, [isFocused]);

    const stylesMemo = useMemo(
        () => styles({ colors, fontSize }),
        [isDarkTheme, coefficient],
    );

    const handleRemoveAll =  async () => {
        try {
            steIsLoading(true);
            await removeAllNorifications();
            refetch();
            steIsLoading(false);
        } finally {
            steIsLoading(false);
        }
    }

    return (
        <Background>
            <View style={stylesMemo.container}>
                <Header
                    navigation={navigation}
                    goBackAction={true}
                    showNotification={false}
                />
                <Text style={stylesMemo.title} >
                    {appStrings.notifications}
                </Text>
                {notifications && notifications?.length > 0 && <TouchableOpacity
                    onPress={handleRemoveAll}
                    style={stylesMemo.removeButton}
                >
                    {removeIcon()}
                    <Text style={stylesMemo.buttonLabel}>
                        {appStrings.removeAll}

                    </Text>
                </TouchableOpacity>}
                <View style={{flex: 1}} >
                    {
                        !isFetching
                            ? <FlatList
                                data={notifications}
                                renderItem={({ item }) => <NotificationItem notify={item} />}
                                contentContainerStyle={stylesMemo.contentContainer}
                                style={{ flex: 1 }}
                                keyExtractor={(i) => i.id.toString()}
                            />
                            : <Loading />
                    }

                </View>
                <View style={stylesMemo.footerBox} >
                    <Footer navigation={navigation} showActions={false} />
                </View>
            </View>
        </Background>
    );
}

const styles = ({ colors, fontSize }: IStyles) => {
    return StyleSheet.create({
        container: {
            flex: 1,
        },
        title: {
            fontSize: fontSize(18),
            fontFamily: 'NotoSansArmenian',
            fontWeight: '700',
            textAlign: 'center',
            color: colors.TEXT_COLOR,
            marginVertical: 30
        },
        contentContainer: {
            flexGrow: 1,
            paddingHorizontal: 16,
            paddingBottom: 160
        },
        footerBox: {
            width: '100%',
            alignItems: 'center'
        },
        removeButton: {
            flexDirection: 'row',
            backgroundColor: colors.BACKGROUND_2,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 9,
            gap: 10,
            marginRight: 16,
            alignSelf: 'flex-end',
            ...appStyles({ colors, fontSize }).shadow,
            marginBottom: 10

        },
        buttonLabel: {
            fontSize: fontSize(14),
            fontFamily: 'NotoSansArmenian',
            color: '#BC0606',
            fontWeight: '500'
        }
    });
};
