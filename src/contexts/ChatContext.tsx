import React, { useEffect, useState } from 'react';
import { useSocket } from '../hooks';
import { IMessage, IRoom } from '../interfaces/data.types';
import { getRooms } from '../api/requests';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { sortRooms, sortRoomsList } from '../helpers';
import { AppState } from 'react-native';

interface IProps {
    children: React.ReactNode;
}

export const ChatContext = React.createContext({
    activeRooms: [] as IRoom[],
    passiveRooms: [] as IRoom[],
    activeRoomID: -1,
    setActiveRoomID: (id: number) => { },
    refetch: () => { }
})


export const ChatProvider = ({ children }: IProps) => {

    const [activeRoomID, setActiveRoomID] = useState(-1);
    const [openedApp, setOpenedApp] = useState(AppState.currentState !== 'background');
    const [activeRooms, setActiveRooms] = useState<IRoom[]>([]);
    const [passiveRooms, setPassiveRooms] = useState<IRoom[]>([]);

    const queryClient = useQueryClient();

    const { data, isFetching, refetch } = useQuery({
        queryKey: ['rooms'],
        queryFn: getRooms,
        select: (data) => data?.data,
    })

    const { socket } = useSocket();

    useEffect(() => {
        if (data) {
            const sortedRooms = sortRooms(data);
            setActiveRooms(sortedRooms.active);
            setPassiveRooms(sortedRooms.passive);
        }
    }, [data])


    useEffect(() => {
        const appStateListener = AppState.addEventListener('change', (nextAppState) => {
            if (nextAppState === 'active') {
                setOpenedApp(true);
                refetch()
            } else if (nextAppState === 'background') {
                setOpenedApp(false)
            }
        });

        return () => {
            appStateListener.remove();
        };
    }, []);

    useEffect(() => {
        if (activeRooms && openedApp) {
            console.log('taza kpav');

            activeRooms.map(room => {
                socket.emit('operatorJoin', room);
            })
            return () => {
                socket.off('operatorJoin');
            }
        }
    }, [!!activeRooms.length, openedApp])
    
    const handleNewMessage = (newMessage: IMessage) => {
        setActiveRooms((prevRooms) => {
            const updatedRooms = prevRooms.map((room: IRoom) => {
                if (room.id === newMessage.room_id) {
                    return {
                        ...room,
                        messages: [newMessage, ...room.messages],
                    };
                }
                return room;
            });

            return sortRoomsList(updatedRooms);
        });
    };



    useEffect(() => {
        socket.on('receive_message', (message: IMessage) => {
            console.log('received message', message.content);
            handleNewMessage(message);
        })

        socket.on('roomEnded', (roomId: number) => {
            queryClient.invalidateQueries({ queryKey: ['rooms'] })
        })

        socket.on('userMessageAlreadyReaded', (r: IRoom) => {
            const roomId = r.id;
            setActiveRooms((prevRooms) => {
                return prevRooms.map((room) => {
                    if (room.id === roomId) {
                        return {
                            ...room,
                            messages: room.messages.map((message) => ({
                                ...message,
                                readed: 1,
                            })),
                        };
                    }
                    return room;
                });
            });
        })

        socket.on('messageRead', (r: IRoom) => {
            console.log('messageRead');
            
            const roomId = r.id;
            if (activeRoomID === roomId) {
                setActiveRooms((prevRooms) => {
                    return prevRooms.map((room) => {
                        if (room.id === roomId) {
                            const newMessages = [...room.messages];
                            const firstMessage = {...newMessages[0], readed: 1}
                            newMessages.splice(0, 1, firstMessage);
                            return {
                                ...room,
                                messages: newMessages

                            };
                        }
                        return room;
                    });
                });
            }
        })

        return () => {
            socket.off('receive_message');
            socket.off('roomEnded');
            socket.off('userMessageAlreadyReaded');
            socket.off('messageRead');
        }
    }, []);


    const value = React.useMemo(
        () => ({
            activeRooms,
            passiveRooms,
            activeRoomID,
            setActiveRoomID,
            refetch
        }),
        [
            activeRooms,
            passiveRooms,
            activeRoomID,
            data
        ],
    )

    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}
