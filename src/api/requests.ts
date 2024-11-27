import { Platform } from "react-native";
import { axiosInstanceBack } from ".";
import { IRoom, ISearchOperator } from "../interfaces/data.types";
import { handleUser } from "../services/asyncStoryge";

export const checkAvailableAdmins = async () => {
    try {
        const checkActiveAdmins = await axiosInstanceBack.post<ISearchOperator>('/api/admin/online/exist')
        return !!checkActiveAdmins.data.operator.id;
    } catch (error) {
        console.error('checkAvailableAdmins =========>', error)
    }
}


export const getRooms = async () => {
    const user = await handleUser()
    console.log(user?.id, 'userId');
    
    const res = await axiosInstanceBack.get<IRoom[]>(`/api/room/get/rooms/user/` + user?.id);
    console.log(res.data);

    res.data.forEach((room) => {
        room.messages = room.messages.reverse();
    })
    
    return res
};

interface IRegisterUser {
    name: string,
    email: string,
    message_category_id: string,
    governing_body: string,
    phone_number: string,
    socket_id: string,
    m_user_id: number
}

export const registerUser = async ({ name, email, governing_body, message_category_id, phone_number, socket_id, m_user_id }: IRegisterUser) => {
    try {
        const res = await axiosInstanceBack.post<IRegisterUser>('/api/user/register', {
            name,
            email,
            message_category_id,
            governing_body,
            type: Platform.OS,
            phone_number,
            socket_id,
            // m_user_id
        });

        return res.data ;
    } catch (error) {
        console.error('registerUser =============> ', error);
    }
}