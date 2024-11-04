import React, { useEffect, useRef, useState } from 'react'
import { Platform } from 'react-native';
import socketIOClient from 'socket.io-client';

const env = process.env.BASE_URL;


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
    socket: {},
    socketId: undefined,
    isConnected: false
})

interface IProps {
    children: React.ReactNode;
}

export const SocketProvider = ({ children }: IProps) => {
    const [socketId, setSocketId] = useState(undefined)
    const socket = useRef(socketIOClient(env, connectionConfig));
    const [isConnected, setIsConnected] = useState(false);

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
