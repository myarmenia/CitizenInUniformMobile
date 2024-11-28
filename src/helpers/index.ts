import { Linking, Platform } from "react-native"
import DeviceInfo from "react-native-device-info";
import { IRoom } from "../interfaces/data.types";

export const callToNumber = (number: number) => {
    Linking.openURL(`tel:${number}`)
}

export const isValidEmail = (email: string) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
};

export const handleFontSize = (size: number) => {
    if (size == 1) {
        return 1;
    } else if (size == 2) {
        return 1.2;
    } else if (size == 0) {
        return 0.8;
    } else {
        return 1;
    }
};


export const getDeviceID = async () => {
    try {
        if (Platform.OS === "android") {
            const androidID = DeviceInfo.getAndroidId();

            return androidID;
        } else {
            const iosId = await DeviceInfo.getUniqueId();
            if (iosId) {

                return iosId;
            }
        }
    } catch (error) {
        console.error(error);
    }
};

export const sortRooms =  (rooms: IRoom[]) => {
    const active = [];
    const passive = [];

    for (const room of rooms) {
        if (room.activ == 1) {
            active.push(room);
        } else {
            passive.push(room);
        }
    }
    return {active, passive}
};

export function validateAndFormatPhoneNumber(phoneNumber: string): string {
    if (phoneNumber.length !== 12){
        return phoneNumber
    }
    
    const regex = /^\+(\d{3})(\d{2})(\d{2})(\d{2})(\d{2})$/;
    const match = phoneNumber.match(regex);

    if (match) {
        const [, countryCode, areaCode, firstPart, secondPart, lastPart] = match;
        return `(+${countryCode}) ${areaCode} ${firstPart} ${secondPart} ${lastPart}`;
    }
    return phoneNumber;
}