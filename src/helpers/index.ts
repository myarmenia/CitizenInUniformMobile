import { Linking } from "react-native"

export const callToNumber = (number: number) => {
    Linking.openURL(`tel:${number}`)
}

export const isValidEmail = (email: string) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
}