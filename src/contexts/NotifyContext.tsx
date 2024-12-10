import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react'
import { Platform } from 'react-native';
import socketIOClient from 'socket.io-client';
import { navigationTypes } from '../navigation/navigation.types';
import { IBaseData, INotification } from '../interfaces/data.types';
import { useQuery } from '@tanstack/react-query';
import { getNotifications } from '../api/requests';
import { AxiosResponse } from 'axios';

export const NotifyContext = React.createContext({
    notifications: [] as INotification[],
    count: 0,
    isFetching: false,
    refetch: () => {}
})

interface IProps {
    children: React.ReactNode;
}

export const NotifyProvider = ({ children }: IProps) => {
    const [count, setCount ] = useState(0);

    const { data: notifications, isError, isFetching, refetch } = useQuery({
        queryKey: ["notifications"],
        queryFn: getNotifications,
        refetchInterval: 60000,
        select: (data) => data,
        initialData: []
    })

    useEffect(() => {
        if (!!notifications?.length){
            console.log(notifications.length);
            
            setCount(notifications?.length)
        }
    }, [notifications?.length])
   
    
    const value = React.useMemo(
        () => ({
            notifications: notifications ? notifications : [], 
            count: count,
            isFetching,
            refetch
        }),
        [
            notifications,
            isFetching,
            count
        ],
    )

    return <NotifyContext.Provider value={value}>{children}</NotifyContext.Provider>
}
