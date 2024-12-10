import React, { useEffect, useState } from 'react';
import { useSocket } from '../hooks';
import { IMessage, IRoom } from '../interfaces/data.types';
import { getRooms } from '../api/requests';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { sortRooms, sortRoomsList } from '../helpers';

interface IProps {
    children: React.ReactNode;
}

export const ChatContext = React.createContext({
    activeRooms: [] as IRoom[],
    passiveRooms: [] as IRoom[],
    endedRoomID: -1,
})


export const ChatProvider = ({ children }: IProps) => {

    const [endedRoomID, setEndedRoomID] = useState(-1);
    const [activeRooms, setActiveRooms] = useState<IRoom[]>([]);
    const [passiveRooms, setPassiveRooms] = useState<IRoom[]>([]);

    const queryClient = useQueryClient();

    const { data, isFetching } = useQuery({
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
        if (activeRooms) {
            activeRooms.map(room => {
                socket.emit('operatorJoin', room);
            })
            return () => {
                socket.off('operatorJoin');
            }
        }
    }, [!!activeRooms.length])


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
            setEndedRoomID(roomId);
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
            const roomId = r.id;

            setActiveRooms((prevRooms) => {
                return prevRooms.map((room) => {
                    if (room.id === roomId) {
                        return {
                            ...room,
                            messages: ((): IMessage[] => {
                                const newMessages = [...room.messages];

                                newMessages[0].readed = 1;
                                return newMessages
                            })()

                        };
                    }
                    return room;
                });
            });
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
            endedRoomID
        }),
        [
            activeRooms,
            passiveRooms,
            endedRoomID,
            data
        ],
    )

    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}
