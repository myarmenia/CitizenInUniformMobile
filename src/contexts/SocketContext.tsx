import React, { useEffect, useRef, useState } from 'react'
import { AppState, Platform } from 'react-native';
import socketIOClient, { Socket } from 'socket.io-client';

// const env = 'https://citizenb.trigger.ltd/';
const env = process.env.BASE_URL_BACK;
// const env = 'http://192.168.122.1:4008';


const connectionConfig = {
    jsonp: false,
    reconnection: true,
    autoConnect: true,
    reconnectionDelay: 10000,
    reconnectionAttempts: 1000,
    transports: ['websocket'],
    query: {
        source: 'auction:mobile',
        platform: Platform.OS,
    },
    timeout: 5000

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
    const [appState, setAppState] = useState(AppState.currentState === 'active');



    useEffect(() => {
        const appStateListener = AppState.addEventListener('change', (nextAppState) => {
            console.log(AppState.currentState);
            if (nextAppState === 'active') {
                
                setAppState(true);
            } else if (nextAppState === 'background') {
                setAppState(false);

            }
        });

        return () => {
            appStateListener.remove();
        };
    }, []);



    useEffect(() => {
        if (appState) {
            socket.current.on('connect', () => {
                console.log(`connected ${socket.current.id}`)
                setIsConnected(true);
                if (socket.current.id) {
                    setSocketId(socket.current?.id);
                }
            });

            socket.current.on('disconnect', () => {
                console.log('Disconnected from the server');
                setIsConnected(false);
                setSocketId('');
            });

            return () => {
                socket.current.off('disconnect');
                socket.current.off('connect');
            }
        }
    }, [appState])


    const value ={
            socket: socket.current,
            socketId,
            isConnected
        }

    return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}
