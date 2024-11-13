
export interface ICategory {
    id: number;
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