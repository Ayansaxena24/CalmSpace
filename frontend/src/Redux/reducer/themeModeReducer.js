import { THEME_MODE } from "../constants/themeConstant";



export const modeReducer = (state = {toggleActive : false}, action) => {
    switch(action.type) {
        case THEME_MODE : 
        return {
            ...state,
            toggleActive: !state.toggleActive,
            mode : state.toggleActive ? "dark" : "light"
        }
        default:
            return state;
    }
}