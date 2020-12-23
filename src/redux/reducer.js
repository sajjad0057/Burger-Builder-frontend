import * as actionTypes from "./actionTypes.js";

const INGREDIENT_PRICES = {
  salad: 15,
  cheese: 40,
  meat: 60,
};

const INITIAl_STATE = {
  ingredients: [
    { type: "salad", amount: 0 },
    { type: "cheese", amount: 0 },
    { type: "meat", amount: 0 },
  ],
  totalPrice: 40,
  purchasable: false,
  orders: [],
  orderLoading: true,
  orderErr: false,
  token: null,
  userId: null,
  authLoading:false,
  authFailedMsg:null,
};

export const reducer = (state = INITIAl_STATE, action) => {
  const ingredients = [...state.ingredients];
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      for (let item of ingredients) {
        if (item.type === action.payload) {
          item.amount++;
        }
      }
      return {
        ...state,
        ingredients: ingredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload],
      };
    case actionTypes.REMOVE_INGREDIENT:
      //console.log("reucer.js ---->", ingredients, action.payload);
      for (let item of ingredients) {
        //console.log(item);
        if (item.type === action.payload && item.amount > 0) {
          item.amount--;
          return {
            ...state,
            ingredients: ingredients,
            totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload],
          };
        }
      }

    case actionTypes.UPDATE_PURCHASABLE:
      //console.log("reucer.js ---->", ingredients,);
      const sum = ingredients.reduce((sum, element) => {
        return sum + element.amount;
      }, 0);
      //console.log(sum);
      return {
        ...state,
        purchasable: sum > 0,
      };
    case actionTypes.RESET_INGREDIENTS:
      return {
        ...state,
        ingredients: [
          { type: "salad", amount: 0 },
          { type: "cheese", amount: 0 },
          { type: "meat", amount: 0 },
        ],
        totalPrice: 40,
        purchasable: false,
      };
    case actionTypes.LOAD_ORDERS:
      let orders = [];
      //console.log("reducer.js--->check order payload :",action.payload);
      for (let key in action.payload) {
        //console.log("reducer.js--->check order order key :",action.payload[key]);
        // let obj =action.payload[key]
        // obj.id=key
        // orders.push(
        //   obj
        // )
        // *****Alternate way to update order Array given below****
        orders.push({
          ...action.payload[key],
          id: key,
        });
      }
      //console.log("reducer.js--->check new orders array :",orders);
      return {
        ...state,
        orders: orders,
        orderLoading: false,
      };
    case actionTypes.ORDER_LOAD_FAILED:
      return {
        ...state,
        orderErr: true,
        orderLoading: false,
      };
    case actionTypes.AUTH_SUCCESS:
      //console.log("success",state);
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
      };
    case actionTypes.AUTH_LOGOUT:
      //console.log("reducer logout state:",state);
      return {
        ...state,
        token: null,
        userId: null,
        authFailedMsg : null,
      };
      case actionTypes.AUTH_LOADING:
        return{
          ...state,
          authLoading : action.payload,
        }
      case actionTypes.AUTH_FAILED:
        return {
          ...state,
          authFailedMsg : action.payload
        }

        

    default:
      return state;
  }
};
