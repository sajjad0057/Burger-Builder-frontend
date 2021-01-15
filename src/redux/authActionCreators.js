import * as actionTypes from "./actionTypes";
import axios from "axios";


export const authSuccess = (token,userId) =>{
    return {
        type : actionTypes.AUTH_SUCCESS,
        payload:{
            token : token,
            userId : userId
        }
    }
}

export const authLoading = isLoading =>{
    return {
        type : actionTypes.AUTH_LOADING,
        payload : isLoading
    }
}

export const authFailed = (errMsg)=>{
    return {
        type:actionTypes.AUTH_FAILED,
        payload: errMsg+" ! Please Try again "
    }
}

export const auth = (email, password, signUpMode) => (dispatch) => {
  dispatch(authLoading(true))
  const authData = {
    email: email,
    password: password,
  };

  const header = {
      headers : {
        "Content-Type": "application/json"
      }
  }

  let authUrl = null;
  if (signUpMode) {
    authUrl = "http://127.0.0.1:8000/api/user/";
  } else {
    authUrl =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
  }

  

  axios
    .post(authUrl,authData,header)
    .then((response) => {
        console.log("DRF response ----> : ",response);
        dispatch(authLoading(false))
        // localStorage.setItem("token",response.data.idToken)
        // localStorage.setItem("userId",response.data.localId)
        // const expirationTime =new Date(new Date().getTime() + response.data.expiresIn * 1000)
        // localStorage.setItem('expirationTime',expirationTime)
        // dispatch(authSuccess(response.data.idToken , response.data.localId))
    })
    .catch((err)=>{
        // The Object.keys() method returns an array of a given object's own enumerable property
        const key = Object.keys(err.response.data)[0]    // DRF passing error messages as an object. so here we Useing js "Object" key to accessing required data.
        console.log("err.response",err.response);
        dispatch(authFailed(`${key.toUpperCase()} : ${err.response.data[key]}`))
        dispatch(authLoading(false))
    })
};


export const logout=()=>{
    localStorage.clear()
    //console.log("logout called");
    return {
        type : actionTypes.AUTH_LOGOUT
    }
}




export const authCheck = () =>dispatch=>{
    const token = localStorage.getItem('token')
    if(!token){
        dispatch(logout())
    }else{
        const expirationTime = new Date(localStorage.getItem('expirationTime'))
        if(expirationTime <= new Date()){
            dispatch(logout())
        }else{
            const userId = localStorage.getItem('userId')
            dispatch(authSuccess(token,userId))
        }
    }
}