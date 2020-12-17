import * as actionTypes from "./actionTypes";
import axios from "axios";

export const addIngredient = igtype =>{
    return {
        type : actionTypes.ADD_INGREDIENT,
        payload : igtype
    }
}

export const removeIngredient = igtype =>{
    //console.log("removeIngredient--->",igtype);
    return {
        type : actionTypes.REMOVE_INGREDIENT,
        payload : igtype
    }
}

export const updatePurchasable = ()=>{
    return {
        type : actionTypes.UPDATE_PURCHASABLE,
    }
}


export const resetIngredients = ()=>{
    return{
        type:actionTypes.RESET_INGREDIENTS,
    }
<<<<<<< HEAD
}


export const loadOrders = (orders)=>{
    return {
        type:actionTypes.LOAD_ORDERS,
        payload : orders,
    }
}

export const orderLoadFailed = () =>{
    return{
        type: actionTypes.ORDER_LOAD_FAILED
    }
}


export const fetchOrders = () => dispatch =>{
    axios.get("https://burgerbuilder-308a8-default-rtdb.firebaseio.com/orders.json")
    .then(response=>dispatch(loadOrders(response.data)))
=======
>>>>>>> 6107ce04308d3b19588eefbb762dfaf57c1bf8ec
}