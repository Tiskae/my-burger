import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const INITIAL_TOTAL_PRICE = 4;

const initialState = {
    ingredients: null,
    totalPrice: INITIAL_TOTAL_PRICE,
    error: false,
    building: false,
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat,
        },
        totalPrice: INITIAL_TOTAL_PRICE,
        error: false,
        building: false,
    });
};

const addIngredient = (state, action) => {
    const updatedIngredient = {
        [action.ingredientType]: state.ingredients[action.ingredientType] + 1,
    };
    const updatedIngredients = updateObject(
        state.ingredients,
        updatedIngredient
    );
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientType],
        building: true,
    };
    return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
    const updatedIng = {
        [action.ingredientType]: state.ingredients[action.ingredientType] - 1,
    };
    const updatedIngs = updateObject(state.ingredients, updatedIng);
    const updatedSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientType],
        building: true,
    };
    return updateObject(state, updatedSt);
};

const fetchIngrdeientsFailed = (state, action) => {
    return updateObject(state, { error: true });
};

const ingReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS:
            return addIngredient(state, action);
        case actionTypes.SET_INGREDIENTS:
            return setIngredients(state, action);
        case actionTypes.REMOVE_INGREDIENTS:
            return removeIngredient(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return fetchIngrdeientsFailed(state, action);
        default:
            return state;
    }
};

export default ingReducer;
