
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


export interface IBaseData<T> {
    message: string;
    success: boolean;
    result: T;
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
    writer_id: number;
    writer: string;
    content: string;
    room_id: number;
    created_at: string;
    deleted_at?: string;
    updated_at?: string;
    id?: number;
    readed?: number
}

export interface IUser {
    id: number;
    device_id: string;
    type: string;
    created_at?: string;
    updated_at?: string;
}

export interface IRoom {
    id: number;
    activ: number;
    active: number;
    deleted_at: number;
    created_at?: string;
    updated_at?: string;
    email: string;
    governing_body_id: number;
    m_user_id: number;
    message_category_id: number;
    messages: IMessage[];
    mobile_user_id: number;
    mobile_user_name: string;
    operator_id: number;
    status: number;
}

export interface IRegisteredUser {
    id: number;
    active: number;
    created_at?: string;
    updated_at?: string;
    email: string;
    governing_body_id: number;
    message_category_id: number;
    name: string;
    socket_id: string;
    phone_number: string;
}

export interface ISearchOperator {
    message: string;
    operator: {
        created_at: string;
        deleted_at: string;
        email: string;
        email_verified_at: any;
        id: number;
        name: string;
        online: number;
        password: string;
        password_changes_at: string;
        phone: number;
        remember_token: any
        socket_id: string;
        status: number
        surname: string;
        updated_at: string
    },
}

export interface IGoverningBody {
    id: number;
    name: string;
    named: string;
    email: number;
    phone: number;
    phone_numbers: string[];
};

export interface IRegisterUser {
    name: string;
    email: string;
    message_category_id: string;
    governing_body: string;
    phone_number: string;
    socket_id: string;
};

export interface IFAQ {
    id: number;
    title: string;
    f_a_q_sub_categories: ISubFAQ[];
}

export interface ISubFAQ {
    content: string;
    title: string;
}


export interface INotification {
    id: number;
    setting_id: number;
    mobile_user_id: number;
    title?: string;
    content?: string;
    created_at: string;
}