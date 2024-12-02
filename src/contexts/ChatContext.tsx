import React, { useEffect, useState } from 'react';
import { useSocket } from '../hooks';
import { handleUser } from '../services/asyncStoryge';
import { IMessage, IRoom, IUser } from '../interfaces/data.types';
import { getRooms } from '../api/requests';
import { useQuery } from '@tanstack/react-query';
import { sortRooms } from '../helpers';

interface IProps {
    children: React.ReactNode;
}

export const ChatContext = React.createContext({
    activeRooms: [] as IRoom[],
    passiveRooms: [] as IRoom[],
    isUpdate: false,
})


interface IRooms {
    active: IRoom[];
    passive: IRoom[];
}

export const ChatProvider = ({ children }: IProps) => {

    const [user, setUser] = useState<IUser | null>(null);
    const [isUpdate, setIsUpdate] = useState(false);
    const [activeRooms, setActiveRooms] = useState<IRoom[]>([]);
    const [passiveRooms, setPassiveRooms] = useState<IRoom[]>([]);

    const { data, isError, isFetching, refetch } = useQuery({
        queryKey: ['rooms'],
        queryFn: getRooms,
        select: (data) => data?.data,
    })



    const { socket, socketId } = useSocket();

    useEffect(() => {
        handleUser().then((user) => setUser(user));
    }, []);

    useEffect(() => {
        if (data) {       
            const sortedRooms = sortRooms(data);
            setActiveRooms(sortedRooms.active);
            setPassiveRooms(sortedRooms.passive);
        }
    }, [data])


    useEffect(() => {
        if (activeRooms){
            console.log('activeRooms ka', activeRooms.length);
            
            activeRooms.map(room => {
                console.log('joining room', room.id);
                socket.emit('operatorJoin', room);
            })
            return () => {
                socket.off('operatorJoin');
            }
        }
    }, [!!activeRooms.length])

    const handleNewMessage = (newMessage: IMessage) => {
        setIsUpdate(!isUpdate)
        setActiveRooms((prevRooms) => {
            return prevRooms.map((room: IRoom) => {
                if (room.id === newMessage.room_id) {
                    // Если chat_id совпадает, добавляем новое сообщение в этот чат
                    return {
                        ...room,
                        messages: [ newMessage, ...room.messages],
                    };
                }
                return room;
            });
        });
    };

    useEffect(() => {
        socket.on('receive_message', (message: IMessage) => {
            console.log('received message', message.content);
            handleNewMessage(message);
        })

        socket.on('roomEnded', (roomId: string) => {
            refetch()

        })

        return () => {
            socket.off('receive_message');
            socket.off('end_chat');
        }
    }, []);


    useEffect(() => {
        console.log(activeRooms.length);

    }, [activeRooms])



    const value = React.useMemo(
        () => ({
            activeRooms,
            passiveRooms,
            isUpdate
        }),
        [
            activeRooms,
            passiveRooms,
            isUpdate,
            data
        ],
    )

    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}
