import {IUser} from "../IUser";

export interface LoginResponse {
    accessToken: string,
    user: IUser
}

export type RegistrationResponse = true

export type LogoutResponse = true

export interface RefreshResponse {
    accessToken: string,
    user: IUser
}






