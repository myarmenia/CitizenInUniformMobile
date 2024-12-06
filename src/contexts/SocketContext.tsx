import React, { useEffect, useRef, useState } from 'react'
import { Platform } from 'react-native';
import socketIOClient, { Socket } from 'socket.io-client';

// const env = 'https://citizenb.trigger.ltd/';
const env = process.env.BASE_URL_BACK;
// const env = 'http://192.168.122.1:4008';


const connectionConfig = {
    jsonp: false,
    reconnection: true,
    autoConnect: true,
    reconnectionDelay: 10000,
    reconnectionAttempts: 0,
    transports: ['websocket'],
    query: {
        source: 'auction:mobile',
        platform: Platform.OS,
    },
    timeout: 60000

};

export const SocketContext = React.createContext({
    socket: {} as Socket<any>,
    socketId: '',
    isConnected: false
})

interface IProps {
    children: React.ReactNode;
}

export const SocketProvider = ({ children }: IProps) => {
    const [socketId, setSocketId] = useState('')
    const socket = useRef(socketIOClient(env, connectionConfig));
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        socket.current.on('connect', () => {
            console.log(`connected ${socket.current.id}`)
            setIsConnected(true);
            if(socket.current.id) {
                setSocketId(socket.current?.id);
            }
        });

        socket.current.on('disconnect', () => {
            console.log('Disconnected from the server');
            setIsConnected(false);
        });

        return () => {
            socket.current.disconnect();
        }
    }, [])


    const value = React.useMemo(
        () => ({
            socket: socket.current,
            socketId,
            isConnected
        }),
        [
            socket.current,
            socketId,
            isConnected
        ],
    )

    return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}
