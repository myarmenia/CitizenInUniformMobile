import AsyncStorage from "@react-native-async-storage/async-storage";
import { ICategory, IFAQ, IRoom, ISubcategory } from "../interfaces/data.types";

export const cacheFAQs = async (faqs: IFAQ[]) => {
    try {
        await AsyncStorage.setItem('faqs', JSON.stringify(faqs));
    } catch (error) {
        console.error('cacheFAQs error', error);
    }
};

export const getCachedFAQs = async () => {
    try {
        const faqs = await AsyncStorage.getItem('faqs');
        console.warn('getCachedFAQs ==============>', faqs && JSON.parse(faqs));
        
        if (faqs) {
            return JSON.parse(faqs);
        } 
        return [];
    } catch (error) {
        console.error('getCachedFAQs error', error);
    }
};
 

export const cacheCategories = async (categories: ICategory[]) => {
    try {
        await AsyncStorage.setItem('categories', JSON.stringify(categories));
    } catch (error) {
        console.error('cacheCategories error', error);
    }
}



export const getCachedCategories = async () => {
    try {
        const categories = await AsyncStorage.getItem('categories');
        if (categories) return JSON.parse(categories);
    } catch (error) {
        console.error('getCachedCategories error', error);
    }
}

export const cacheSubCategory = async (id: number, content: ISubcategory) => {
    try {
        await AsyncStorage.setItem(`key${id}`, JSON.stringify(content));
    } catch (error) {
        console.error('cacheSubCategory error', error);
    }
}

export const getCachedSubCategory = async (id: number) => {
    try {
        const content = await AsyncStorage.getItem(`key${id}`);
        if (content) return JSON.parse(content);
    } catch (error) {
        console.error('getCachedSubCategory error', error);
    }
}