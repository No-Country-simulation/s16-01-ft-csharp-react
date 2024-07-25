export interface User {
    user_id: string,
    username: string,
    preferences: string[],
    user_state?: UserState
}

export interface UserState {
    state: 'Loading' | 'Completed' | 'Error' | '',
    path: string,
    parameter: string,
    message: string
}

export interface CredentialsUser {
    username: string
}

export type CredentialsPreference = {
    preference: string[];
}

export interface Item {
    item_id: string,
    name: string,
    price: number,
    description: string,
    category: string,
    keywords: string[],
    portion: number,
    nutritional_value: number,
    prep_time: number,
    max_queries: number,
    image_url: string
}

export interface NewItem {
    id: string,
    newData: Item
}