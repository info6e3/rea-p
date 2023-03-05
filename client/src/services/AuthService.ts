import AuthApi from "../api/AuthApi";
import {AuthAction} from "../models/store/AuthStore";
import {Dispatch} from "react";
import {IUserOrder} from "../models/IUserOrder";


class AuthService {
    async login(email: string, password: string, dispatch: Dispatch<AuthAction>) {
        try {
            const response = await AuthApi.login(email, password);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            console.log(response.data)
            const action: AuthAction = {
                type:'SET-auth',
                state: {...response.data, isAuth: true}
            }
            dispatch(action)
        } catch (e: any) {
            console.log(e.response?.data)
        }
    }

    async validateEmail(email: string) {
        try {
            const response = await AuthApi.validateEmail(email);
            return response.data;
        } catch (e: any) {
            console.log(e.response?.data)
        }
    }

    async registration(user: IUserOrder) {
        try {
            const response = await AuthApi.registration(user);
            return response.data;
        } catch (e: any) {
            console.log(e.response?.data)
        }
    }

    async logout (dispatch: Dispatch<AuthAction>) {
        try {
            const response = await AuthApi.logout();
            console.log(response)
            localStorage.removeItem('token');
            const action: AuthAction = {
                type:'SET-auth',
                state: {
                    isAuth: false,
                    user: null,
                    accessToken: null
                }
            }
            dispatch(action)
        } catch (e: any) {
            console.log(e.response?.data)
        }
    }

    async activate(uuid: string) {
        try {
            const response = await AuthApi.activate(uuid);
            return response.data;
        } catch (e: any) {
            console.log(e.response?.data)
        }
    }

    async checkAuth() {
        try {
            const response = await AuthApi.refresh();
            localStorage.setItem('token', response.data.accessToken)
            const action: AuthAction = {
                type:'SET-auth',
                state: {...response.data, isAuth: true}
            }
            return action;
        } catch (e: any) {
            console.log(e.response?.data)
        }
    }
}


export default new AuthService();
