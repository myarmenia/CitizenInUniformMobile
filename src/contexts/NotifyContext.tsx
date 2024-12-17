import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { navigationTypes } from '../navigation/navigation.types';
import { INotification } from '../interfaces/data.types';
import { useQuery } from '@tanstack/react-query';
import { getNotifications } from '../api/requests';
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { removeListener } from 'process';
import { setEnabled } from 'react-native/Libraries/Performance/Systrace';

export const NotifyContext = React.createContext({
    notifications: [] as INotification[],
    count: 0,
    isLoading: false,
    refetch: () => { },    
    setEnabled: (v: boolean) => { },

})

interface IProps {
    children: React.ReactNode;
}

export const NotifyProvider = ({ children }: IProps) => {
    const [count, setCount] = useState(0);
    const [enabled, setEnabled] = useState(true);

    const navigation: NavigationProp<any> = useNavigation()

    const insets = useSafeAreaInsets();

    const { data: notifications, isLoading, refetch } = useQuery({
        queryKey: ["notifications"],
        queryFn: getNotifications,
        refetchInterval: 60000,
        select: (data) => data,
        initialData: []
    })



    useEffect(() => {
        const unsubscribe = messaging().onMessage(async (data) => {
            try {                
                if (enabled) {
                    Toast.show({
                        text1: data?.notification?.title,
                        text2: data?.notification?.body,
                        type: 'custom',
                        topOffset: 10 + insets.top,
                        onPress: () => {
                            navigation?.navigate(navigationTypes.MESSAGES)
                        }
                    })
                }
                refetch()
            } catch (error) {
                console.log('error', error);

            }

        })

        return () => {
            notifee.stopForegroundService()
            unsubscribe()
        }

    }, [enabled])





    useEffect(() => {
        if (!!notifications) {
            setCount(notifications?.length)
        }
    }, [notifications?.length])





    const value = React.useMemo(
        () => ({
            notifications: notifications ? notifications : [],
            count: count,
            isLoading,
            refetch,
            setEnabled
        }),
        [
            notifications,
            isLoading,
            count
        ],
    )

    return <NotifyContext.Provider value={value}>{children}</NotifyContext.Provider>
}
