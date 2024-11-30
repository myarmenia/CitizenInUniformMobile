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
   rooms: {} as IRooms,
   isUpdate: false,
})


interface IRooms {
    active: IRoom[];
    passive: IRoom[];
}

export const ChatProvider = ({ children }: IProps) => {

    const [user, setUser] = useState<IUser | null>(null);
    const [isUpdate, setIsUpdate] = useState(false);

    const [rooms, setRooms] = useState<IRooms>({
        active: [],
        passive: [],
    });

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
            setRooms(sortedRooms);
            if (sortedRooms?.active) {
                sortedRooms.active.forEach(room => {
                    if(room.activ > 0){
                        console.log('joining room', room.id);
                        
                        socket.emit('operatorJoin', room);
                    }
                    
                })
            }
            return () => {
                socket.off('operatorJoin');
            }
        }
    }, [!!data])

    useEffect(() => {
        socket.on('receive_message', (message: IMessage) => {
            console.log('received message', message.content);
            
            if (rooms) {
                const updatedRooms = { ...rooms };
                let roomIndex = updatedRooms.active.findIndex((room) => room.id === message.room_id);
                if (roomIndex !== -1) {
                    updatedRooms.active[roomIndex].messages.unshift(message);
                    setRooms({...updatedRooms});
                } else {
                    roomIndex = updatedRooms.passive.findIndex((room) => room.id === message.room_id);
                    if (roomIndex !== -1) {
                        updatedRooms.passive[roomIndex].messages.unshift(message);
                        setRooms(updatedRooms);
                    }
                }
            }
            setIsUpdate(!isUpdate)
        })
        
        socket.on('roomEnded', (roomId: string) => {
            refetch()
            
        })
        
        return () => {
            socket.off('receive_message');
            socket.off('end_chat');
        }
    }, []);



    const value = React.useMemo(
        () => ({
            rooms,
            isUpdate
        }),
        [
            rooms,
            isUpdate
        ],
    )

    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}
