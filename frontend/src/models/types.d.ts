export interface User {
    user_id: string,
    username: string,
    preferences: string[],
    quantity_pay: number,
    order_list?: Order[]
}

export interface UserState {
    user_id: string,
    username: string,
    state: UserStateState,
    waiter_name: string,
    invoice: Invoice
}

export interface Invoice {
    invoice_id: string,
    total_amount: number
}

export interface UserStateState {
    status: UserStatus,
    path: string,
    parameter: string,
    message: string,
    timeout: number
}
export enum UserStatus {
    '' = 0,
    'Loading' = 1,
    'Error' = 2,
    'Completed' = 3,
    'Logo' = 4
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

export interface CredentialsExpense {
    selectedUsers: User[];
    paymentOption: 'divided' | 'all' | 'selected';
}

export interface Payment {
    user_id: string,
    proportion: 'divided' | 'all' | 'selected',
    peer_list: UserId[]
}

export interface UserId {
    user_id: string
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

export interface UserSimple {
    user_id: string,
    username: string,
    quantity_pay: number,
}

export interface UserAndPreference {
    user_id: string,
    preferences: string[]
}

export interface UserAndOrder {
    user_id: string,
    order_id: string,
    item_id: string,
    order_status: OrderStatus
}