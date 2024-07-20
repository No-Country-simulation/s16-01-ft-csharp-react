export interface User {
    user_id: string,
    username: string,
    preference: string[],
    user_state?: UserState
}

export interface UserState {
    state: 'Loading' | 'Completed' | 'Error' | '',
    path: string,
    parameter: string
}

export interface CredentialsUser {
    username: string
}

export type CredentialsPreference = {
    preference: string[];
}