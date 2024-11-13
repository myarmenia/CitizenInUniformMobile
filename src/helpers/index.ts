import { Linking } from "react-native"

export const callToNumber = (number: number) => {
    Linking.openURL(`tel:${number}`)
}