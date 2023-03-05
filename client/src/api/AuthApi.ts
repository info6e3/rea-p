import api, {API_URL} from "../http";
import axios, {AxiosResponse} from "axios";
import {LoginResponse, LogoutResponse, RefreshResponse, RegistrationResponse} from "../models/response/AuthResponse";
import {IUserOrder} from "../models/IUserOrder";

export default class AuthApi {

    static async login(email: string, password: string): Promise<AxiosResponse<LoginResponse>> {
        return api.post('/auth/login', {email, password})
    }

    static async validateEmail(email: string): Promise<AxiosResponse<true>> {
        return api.get('/auth/validate-email', { params: { email } })
    }

    static async registration(user: IUserOrder): Promise<AxiosResponse<RegistrationResponse>> {
        return api.post('/auth/registration', {user})
    }

    static async logout(): Promise<AxiosResponse<LogoutResponse>> {
        return api.post<LogoutResponse>('/auth/logout')
    }

    static async activate(uuid: string): Promise<AxiosResponse<boolean>> {
        return axios.get(API_URL+'/auth/activate', { params: { uuid } })
    }

    static async refresh(): Promise<AxiosResponse<RefreshResponse>> {
        return axios.get(API_URL+'/auth/refresh', {withCredentials: true})
    }
}

