export interface User {
    user_id: string,
    username: string,
    preferences: string[],
    quantity_pay: number,
    user_state?: UserState,
    order_list?: Order[]
}

export interface OtherUser {
    user_id: string,
    username: string,
    preferences: string[],
    quantity_pay: number,
    order_list?: Order[]
}

export interface UserState {
    state: UserStateState,
    path: string,
    parameter: string,
    message: string
}

export enum UserStateState {
    '' = 0,
    'Loading' = 1,
    'Error' = 2,
    'Completed' = 3
}

export interface Order {
    order_id: string,
    item_id: string,
    order_status: OrderStatus
}

export enum OrderStatus {
    'pending' = 0,
    'processing' = 1,
    'received' = 2
}

export interface CredentialsUser {
    username: string
}

export type CredentialsPreference = {
    preferences: string[];
}

export interface Item {
    item_id: string,
    name: string,
    price: number,
    description: string,
    ingredients: string[],
    category: string,
    keywords: string[],
    portion: number,
    image_url: string
}

export interface NewItem {
    id: string,
    newData: Item
}