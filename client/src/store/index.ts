import {createStore, combineReducers} from "redux";
import {rootReducer} from "./reducers/index";

export const store = createStore(rootReducer)
