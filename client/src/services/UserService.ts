import UserApi from "../api/UserApi";
import {IUser} from "../models/IUser";

class UserService {
    async getUser() {
        try {
            const response = await UserApi.getUser();
            return response.data;
        } catch (e: any) {
            console.log(e.response?.data)
        }
    }
}

export default new UserService();