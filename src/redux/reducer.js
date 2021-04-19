import * as actionTypes from './action';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    ingOrder: [],
    totalPrice: 4
}

const INGREDIENT_PRICE = {
    salad: 0.5,
    bacon: 1.0,
    cheese: 0.5,
    meat: 1.0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingName]: state.ingredients[action.ingName] + 1 },
                ingOrder: state.ingOrder.concat(action.ingName),
                totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingName]
                }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingName]: state.ingredients[action.ingName] - 1 },
                ingOrder: state.ingOrder.filter((e, index) => index !== state.ingOrder.indexOf(action.ingName)),
                totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingName]
                }
        default:
            return state;
    }
}


export default reducer;