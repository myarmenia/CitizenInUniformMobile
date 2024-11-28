import { Platform } from "react-native";
import { axiosInstance, axiosInstanceBack } from ".";
import { IBaseData, IGoverningBody, IRoom, ISearchOperator } from "../interfaces/data.types";
import { handleUser } from "../services/asyncStoryge";
import { urls } from "./urls";

export const checkAvailableAdmins = async () => {
    try {
        const checkActiveAdmins = await axiosInstanceBack.post<ISearchOperator>(urls.CHECK_AVAILABLE_ADMINS)
        return !!checkActiveAdmins.data.operator.id;
    } catch (error) {
        console.error('checkAvailableAdmins =========>', error)
    }
}


export const getRooms = async () => {
    const user = await handleUser()
    console.log(user?.id, 'userId');

    const res = await axiosInstanceBack.get<IRoom[]>(urls.GET_ROOMS + user?.id);

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
        const res = await axiosInstanceBack.post<IRegisterUser>(urls.REGISTER_USER, {
            name,
            email,
            message_category_id,
            governing_body,
            type: Platform.OS,
            phone_number,
            socket_id,
            // m_user_id
        });

        return res.data;
    } catch (error) {
        console.error('registerUser =============> ', error);
    }
}

export const getGoverningBody = async () => {
    const res = await axiosInstance.get<IBaseData<IGoverningBody[]>>(urls.GOV_BODY);
    return res.data;
}
