import React, { useState } from 'react';

export const FormContext = React.createContext({
   phoneNumber: '',
   setPhoneNumber: (value: string) => {},
   name: '',
   setName: (value: string) => {},
   email: '',
   setEmail: (value: string) => {},
   type: '',
   setType: (value: string) => {},
   messageType: '',
   setMessageType: (value: string) => {},
   messageTo: '',
   setMessageTo: (value: string) => {},
   clearState: () => {},
})

interface IProps {
    children: React.ReactNode;
}

export const CustomFormProvider = ({ children }: IProps) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [type, setType] = useState('');
    const [messageType, setMessageType] = useState('');
    const [messageTo, setMessageTo] = useState('');

    const clearState = () => {
        setName('');
        setEmail('');
        setPhoneNumber('');
        setType('');
        setMessageType('');
        setMessageTo('');
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
            setMessageType
        }),
        [
            name,
            email,
            phoneNumber,
            type,
            messageTo,
            messageType
        ],
    )

    return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}
