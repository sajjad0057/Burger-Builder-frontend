import * as actionTypes from "./actionTypes";
import axios from "axios";

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
    .then((response) => console.log(response));
};
