import React, { useEffect, useRef, useState } from 'react'
import { Platform } from 'react-native';
import socketIOClient from 'socket.io-client';

export const ModalContext = React.createContext({
    showModal: (state: boolean) => { },
    hideModal: () => { },
    visible: false,
    isSuccess: false
})

interface IProps {
    children: React.ReactNode;
}

export const ModalProvider = ({ children }: IProps) => {

    const [visible, setVisible] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);


    const showModal = (state: boolean) => {
        setIsSuccess(state);
        setVisible(true);
    }

    const hideModal = () => {
        setVisible(false);
        setIsSuccess(false);
    }

    const value = React.useMemo(
        () => ({
            showModal,
            hideModal,
            visible,
            isSuccess
        }),
        [
            showModal,
            hideModal,
            visible,
            isSuccess
        ],
    )

    return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}
