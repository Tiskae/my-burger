import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENTS,
        ingredientType: name,
    };
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredientType: name,
    };
};

const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients,
    };
};

const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
    };
};

export const initIngredients = () => {
    return (dispatch) => {
        axios
            .get("/ingredients.json")
            .then((response) => {
                // console.log(response.json());
                dispatch(setIngredients(response.data));
                // Not elegant but works🙂
                if (response.status !== 200) {
                    throw new Error("");
                }
            })
            .catch((_) => {
                dispatch(fetchIngredientsFailed());
            });
    };
};
