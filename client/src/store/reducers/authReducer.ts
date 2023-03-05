import {AuthState, AuthAction} from "../../models/store/AuthStore";

const defaultState: AuthState = {
    isAuth: false,
    user: null,
    accessToken: null
};

const authReducer = (state = defaultState, action: AuthAction): AuthState => {
    switch (action.type) {
        case "SET-auth":
            return action.state;
        default:
            return state;
    }
}

export default authReducer;