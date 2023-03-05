import {combineReducers} from "redux";
import yMapReducer from "./yMapReducer";
import authReducer from "./authReducer";

export const rootReducer = combineReducers({
    yMap: yMapReducer,
    auth: authReducer
})

export type RootState = ReturnType<typeof rootReducer>;