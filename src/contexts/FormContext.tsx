import React, { useEffect, useState } from 'react';

export const FormContext = React.createContext({
    phoneNumber: '',
    setPhoneNumber: (value: string) => { },
    name: '',
    setName: (value: string) => { },
    email: '',
    setEmail: (value: string) => { },
    type: {
        id: 0,
        name: ''
    },
    setType: (value: {
        id: number,
        name: string
    }) => { },
    messageType: '',
    setMessageType: (value: string) => { },
    messageTo: '',
    setMessageTo: (value: string) => { },
    clearState: () => { },
    setGoverningBodyID: (value: number) => { },
    governingBodyID: 0,
})

interface IProps {
    children: React.ReactNode;
}

export const CustomFormProvider = ({ children }: IProps) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [type, setType] = useState({
        id: 0,
        name: ''
    });
    const [messageType, setMessageType] = useState('');
    const [messageTo, setMessageTo] = useState('');
    const [governingBodyID, setGoverningBodyID] = useState(0);

    const clearState = () => {
        setName('');
        setEmail('');
        setPhoneNumber('');
        setType({
            id: 0,
            name: ''
        });
        setMessageType('');
        setMessageTo('');
        setGoverningBodyID(0);
    }

    const value = React.useMemo(
        () => ({
            name,
            setName,
            email,
            setEmail,
            phoneNumber,
            setPhoneNumber,
            type,
            setType,
            clearState,
            setMessageTo,
            messageTo,
            messageType,
            setMessageType,
            governingBodyID,
            setGoverningBodyID,
        }),
        [
            name,
            email,
            phoneNumber,
            type,
            messageTo,
            messageType,
            governingBodyID
        ],
    )

    return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}
