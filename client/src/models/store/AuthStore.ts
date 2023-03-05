import {IUser} from "../IUser";
export interface AuthState {
    isAuth: boolean,
    user: IUser | null,
    accessToken: string | null
}

export interface AuthAction {
    type: 'SET-auth'
    state: AuthState
}