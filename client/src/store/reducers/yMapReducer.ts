import {YMapState, YMapAction} from "../../models/store/YMapStore";


const defaultState: YMapState = {
    yMap: null
};

const yMapReducer = (state = defaultState, action: YMapAction): YMapState => {
    switch (action.type) {
        case "SET-yMap":
            return action.state;
        default:
            return state;
    }
}

export default yMapReducer;