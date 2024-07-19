export interface Credentials {
    username: string
}
export interface User {
    user_id: string,
    username: string,
    preference: string[],
    user_state?: string
  }