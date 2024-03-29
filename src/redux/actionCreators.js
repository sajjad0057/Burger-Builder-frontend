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


export const fetchOrders = (token,userId) => dispatch =>{
    const header = {
        // according DRF and djangorestframework-simplejwt doc, if we use JWT token , when for Authorization must be do this.. 
        headers : {
            "Authorization" : `Bearer ${token}`
        }
    }
    axios.get(`http://127.0.0.1:8000/api/order?id=${userId}`,header)
    .then(response=>dispatch(loadOrders(response.data)))
    .catch(err=>{
        console.log("error ---->",err.response)
        dispatch(orderLoadFailed())
    })

}