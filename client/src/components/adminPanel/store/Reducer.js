export const ACTIONS = {
    SET_FIELD: "SET_FIELD",
    RESET: "RESET"
}

export const initialState = {
    title: "",
    description: "",
    category: "",
    country: "",
    brand: "",
    seller: "",
    price: "",
    quantity: "",
    discountPrice: "",
    image: null
}

export function Reducer(state, action){
    switch(action.type) {
        case ACTIONS.SET_FIELD:
            return {
                ...state,
                [action.field]: action.value
            };

        case ACTIONS.RESET:
            return initialState;

        default:
            return state;
    }
}
