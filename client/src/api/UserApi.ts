import api from "../http";
import {AxiosResponse} from "axios";
import {IUser} from "../models/IUser";

export default class UserApi {
    static async getUser(): Promise<AxiosResponse<IUser>> {
        return api.get('/user/get-user')
    }
}

