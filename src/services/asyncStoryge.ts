import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDeviceID, handleFontSize } from "../helpers";
import { Alert, Platform } from "react-native";
import { axiosInstance } from "../api";
import { IBaseData, IUser } from "../interfaces/data.types";

export const handleUser = async () => {
    try {
        const user = await AsyncStorage.getItem(('user'));

        if (user) {  
                      
            return JSON.parse(user) as IUser ;
        } else {
            const deviceID = await getDeviceID();
            const newUser = (await axiosInstance.post<IBaseData<IUser>>('/api/mobile/user-device', {
                device_id: deviceID,
                type: Platform.OS
            })).data.result
            console.log('USER ------------> ', user);
            AsyncStorage.setItem('user', JSON.stringify(newUser))
            return newUser;
        }
    } catch {
        Alert.alert('Oooooops!', 'User is not registered.');
        return null;
    }
}

export const getFontSize = async () => {
    try {
        const size = await AsyncStorage.getItem('font-size');

        if (size) {
            return handleFontSize(+size);
        } else {
            AsyncStorage.setItem('font-size', (1).toString());
            return 1
        }

    } catch (error) {
        Alert.alert('error', JSON.stringify(error))

    }
};

export const setFontSizeToAS = async (size: number) => {
    try {
        AsyncStorage.setItem('font-size', size.toString());
    } catch (error) {
        Alert.alert('setFontSizeToAS Error', JSON.stringify(error))

    }
};

export const setThemeToAS = async (theme: string) => {
    try {
        AsyncStorage.setItem('theme', theme);
    } catch (error) {
        Alert.alert('setThemeToAS error', JSON.stringify(error))

    }
};

export const getThemefromAS = async () => {
    try {
        const theme = await AsyncStorage.getItem('theme')

        if (theme) return theme;
        else {
            setThemeToAS('light');
            return 'light';
        }

    } catch (error) {
        Alert.alert('getThemefromAS error', JSON.stringify(error))
    }
}


export const getNotifAccessFromAS = async () => {
    try {
        const notifAccess = await AsyncStorage.getItem('notifAccess');

        if (notifAccess) return notifAccess === 'true';
        else {
            AsyncStorage.setItem('notifAccess', 'true');
            return true;
        }

    } catch (error) {
        Alert.alert('getNotifAccessFromAS error', JSON.stringify(error))

    }
};

export const setNotifAccessToAS = async (access: boolean) => {
    try {
        AsyncStorage.setItem('notifAccess', access.toString());
    } catch (error) {
        Alert.alert('setNotifAccessToAS error', JSON.stringify(error))
    }
}


export const getNotifSoundAccessFromAS = async () => {
    try {
        const notifSoundAccess = await AsyncStorage.getItem('notifSoundAccess');

        if (notifSoundAccess) return notifSoundAccess === 'true';
        else {
            AsyncStorage.setItem('notifSoundAccess', 'true');
            return true;
        }

    } catch (error) {
        Alert.alert('getNotifSoundAccessFromAS error', JSON.stringify(error))

    }
};


export const setNotifSoundAccessToAS = async (access: boolean) => {
    try {
        AsyncStorage.setItem('notifSoundAccess', access.toString());
    } catch (error) {
        Alert.alert('setNotifSoundAccessToAS error', JSON.stringify(error))
    }
}