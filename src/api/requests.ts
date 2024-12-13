import { Platform } from 'react-native';
import { axiosInstance, axiosInstanceBack } from '.';
import {
    IBaseData,
    ICategory,
    IFAQ,
    IGoverningBody,
    IMessage,
    INotification,
    IRegisteredUser,
    IRegisterUser,
    IRoom,
    ISearchOperator,
    ISubcategory
} from '../interfaces/data.types';
import { handleUser } from '../services/asyncStoryge';
import { urls } from './urls';
import { checkNetworkStatus } from '../helpers';
import { cacheCategories, cacheFAQs, cacheSubCategory, getCachedCategories, getCachedFAQs, getCachedSubCategory } from '../services/cacheControl';

export const getCategories = async () => {
    const isConnected = await checkNetworkStatus();
    if (isConnected) {
        const res = await axiosInstance.get<IBaseData<ICategory[]>>(urls.CATEGORIES)
        if (res) {
            cacheCategories(res.data.result);
            return res.data.result;
        }
    } else {
        const cachedCategories = await getCachedCategories();
        if (cachedCategories) return cachedCategories;
    }
}

export const getSubCategory = async (id: number) => {
    try {
        const isConnected = await checkNetworkStatus();

        if (isConnected) {
            const res = await axiosInstance.get<IBaseData<ISubcategory>>(urls.SUB_CATEGORY + `${id}/show`)
            if (res) {
                cacheSubCategory(id, res.data.result);
                return res.data.result;
            }
        } else {
            return await getCachedSubCategory(id);
        }
    } catch (error) {
        console.error(error)
    }
}


export const checkAvailableAdmins = async (id: number) => {
    try {
        const checkActiveAdmins = await axiosInstanceBack.post<ISearchOperator>(
            urls.CHECK_AVAILABLE_ADMINS,
            {
                governing_id: id
            }
        );

        console.log(checkActiveAdmins.data);
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
    
    const isConnected = await checkNetworkStatus();
    if (isConnected) {
        const res = await axiosInstance.get<IBaseData<IFAQ[]>>(urls.GET_FAQS);
        cacheFAQs(res.data.result);
        return res.data.result;
    } else {
        const cachedFAQs = await  getCachedFAQs()
        if (cachedFAQs) {
            return cachedFAQs;
        } else {
            throw new Error('No internet connection or cached FAQs not available.');
        }
    }
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
    if (!user) return [];

    const res = await axiosInstance.post<IBaseData<INotification[]>>(urls.NOTIFICATIONS, {
        "mobile_user_id": user.id
    })
    return res.data.result.reverse();

}

export const readNorification = async (id: number) => {
    try {
        return await axiosInstance.patch<IBaseData<unknown>>(urls.NOTIFICATIONS + "/" + id)
    } catch (error) {
        console.error('norification is not read =============> ', error);
    }
}



export const removeAllNorifications = async () => {
    try {
        const user = await handleUser();
        if (!user) throw new Error(' user is not found');
        console.log('userId', user.id);

        return await axiosInstance.delete(urls.NOTIFICATIONS, {
            data: {
                mobile_user_id: user.id
            }
        })
    } catch (error) {
        console.error('norifications is not deleted =============> ', error);
    }
}

export const updateSettings = async (status: boolean, sound: boolean) => {
    try {
        const user = await handleUser();
        if (!user) throw new Error(' user is not found');

        const data = {
            status: status,
            mobile_user_id: user.id,
            sound: sound
        }
        const res = await axiosInstance.put(urls.SETTINGS, data)
        return res.data;

    } catch (error) {
        console.error('settings is not updated: =============> ', error);
    }
}


export const getSettings = async () => {
    try {
        const user = await handleUser();
        if (!user) throw new Error(' user is not found');

        return await axiosInstance.get<IBaseData<any>>(urls.SETTINGS + '/' + user.id)
    } catch (error) {
        console.error('settings is not geted: =============> ', error);
    }
}



export const updateSituation = async (message: IMessage) => {
    try {

        if (message.id) {
            return await axiosInstanceBack.post<IBaseData<any>>(urls.UPDATE_SITUATION, {
                message_id: message.id,
                sender: 'user'
            })
        }
    } catch (error) {
        console.error('settings is not geted: =============> ', error);
    }
}