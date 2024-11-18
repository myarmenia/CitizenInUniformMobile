import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react'
import { Platform } from 'react-native';
import socketIOClient from 'socket.io-client';
import { navigationTypes } from '../navigation/navigation.types';

export const ModalContext = React.createContext({
    showModal: (state: boolean) => { },
    setNavigateToHome: (state: boolean) => { },
    hideModal: () => { },
    visible: false,
    isSuccess: false,
    navigation: undefined as NavigationProp<ParamListBase>  | undefined,
    setNavigation: (v:  NavigationProp<ParamListBase>) => {},
    
})

interface IProps {
    children: React.ReactNode;
}

export const ModalProvider = ({ children }: IProps) => {
    const [navigateToHome, setNavigateToHome ] = useState(false);

    const [visible, setVisible] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [navigation, setNavigation] = useState<NavigationProp<ParamListBase>  | undefined>();
    
    const showModal = (state: boolean) => {
        setIsSuccess(state);
        setVisible(true);
    }

    const hideModal = () => {
        setVisible(false);
        if(navigateToHome) {
            navigation?.navigate(navigationTypes.HOME)
            setNavigateToHome(false);
        }
    }

    const value = React.useMemo(
        () => ({
            showModal,
            hideModal,
            visible,
            isSuccess,
            navigation,
            setNavigation,
            setNavigateToHome
        }),
        [
            showModal,
            hideModal,
            visible,
            isSuccess,
            navigateToHome,
            navigation
        ],
    )

    return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}
