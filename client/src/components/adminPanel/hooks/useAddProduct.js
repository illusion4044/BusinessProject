import { useReducer } from "react";
import { ACTIONS, initialState, Reducer } from "../store/Reducer";

export default function useAddProduct() {
    const [state, dispatch] = useReducer(Reducer, initialState);

    const setField = (field, value) => {
        dispatch({
            type: ACTIONS.SET_FIELD,
            field, value
        });
    };

    const submitProduct = async (formData) => { 
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/addproduct`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error("Помилка при додаванні товару");
            }

            dispatch({ type: ACTIONS.RESET });
            alert("Товар успішно додано");
        } catch (error) {
            console.error(error);
            alert("Помилка сервера");
        }
    };

    return { state, setField, submitProduct };
}