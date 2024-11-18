
export interface ICategory {
    id: string;
    title: string;
    icon: string;
    sub_categories: ISubcategory[];
}

export interface ISubcategory {
    category_id: number;
    id: number;
    title: string;
}


export interface ICategoryData {
    message: string;
    success: boolean;
    result: ICategory[]
}

export interface ISubcategoryData {
    message: string;
    success: boolean;
    result: {
        id: string;
        title: string;
        category_id: number;
        fils: string[],
        content: string
    }
}

export interface IMessage {
    id: string;
    sender: string;
    message: string;
    createdAt: Date;
}
