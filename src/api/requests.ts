import { Platform } from 'react-native';
import { axiosInstance, axiosInstanceBack } from '.';
import {
    IBaseData,
    IFAQ,
    IGoverningBody,
    INotification,
    IRegisteredUser,
    IRegisterUser,
    IRoom,
    ISearchOperator,
} from '../interfaces/data.types';
import { handleUser } from '../services/asyncStoryge';
import { urls } from './urls';

export const checkAvailableAdmins = async () => {
    try {
        const checkActiveAdmins = await axiosInstanceBack.post<ISearchOperator>(
            urls.CHECK_AVAILABLE_ADMINS,
        );
        
        return checkActiveAdmins.data.message === 'success';
    } catch (error) {
        console.error('checkAvailableAdmins =========>', error);
    }
};

export const getRooms = async () => {
    const user = await handleUser();
    const res = await axiosInstanceBack.get<IRoom[]>(urls.GET_ROOMS + user?.id);
    
    res.data.forEach(room => {
        room.messages = room.messages.reverse();
    });

    return res;
};

export const registerUser = async ({
    name,
    email,
    governing_body,
    message_category_id,
    phone_number,
    socket_id,
}: IRegisterUser) => {
    try {
        const res = await axiosInstanceBack.post<IRegisteredUser>(
            urls.REGISTER_USER,
            {
                name,
                email,
                message_category_id,
                governing_body,
                type: Platform.OS,
                phone_number,
                socket_id,
            },
        );

        return res.data;
    } catch (error) {
        console.error('registerUser =============> ', error);
    }
};

export const getGoverningBody = async () => {
    const res = await axiosInstance.get<IBaseData<IGoverningBody[]>>(
        urls.GOV_BODY,
    );
    return res.data;
};

export const getFAQs = async () => {
    const res = await axiosInstance.get<IBaseData<IFAQ[]>>(urls.GET_FAQS);
    return res.data;
};

export const updateFMCToken = async (token: string) => {
    try {
        const user = await handleUser();
        if (!user) return;
        const res = await axiosInstance.post<IBaseData<any>>(
            urls.UPDATE_FMC_TOKEN,
            {
                "user_id": user.id,
                "fcm_token": token
            }
        );
        console.log('updateFMCToken =============> ', res.data);
    } catch (error) {
        console.error('updateFMCToken =============> ', error);
    }
}


export const getNotifications = async () => {
    const user = await handleUser();
    if (!user) return;
    return await axiosInstance.post<IBaseData<INotification[]>>(urls.GET_NOTIFICATIONS, {
        "mobile_user_id": user.id
    })
}