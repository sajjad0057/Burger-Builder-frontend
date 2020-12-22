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

export const auth = (email, password, signUpMode) => (dispatch) => {
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true,
  };

  let authUrl = null;
  if (signUpMode) {
    authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
  } else {
    authUrl =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
  }

  const API_KEY = "AIzaSyDoMS9yKGcOPi8yt3sMmuiPcS_tpjNacmg";

  axios
    .post(authUrl + API_KEY, authData)
    .then((response) => dispatch(authSuccess(response.data.idToken , response.data.localId)));
};
