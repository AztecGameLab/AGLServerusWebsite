import axios from "axios";
import { auth } from "../../../fireconfig";

export const AGL_Login = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

export const AGL_LogOut = (email, password) => {
  return auth.signOut();
};

export const AGL_CreateAccount = async (username, email, password, newDataObj) => {
  let response = await axios.post("https://us-central1-serverus-15f25.cloudfunctions.net/login-createAGLUser", {
    username: username,
    email: email,
    password: password,
    newDataObj: newDataObj
  });
  return response;
};

export const UsernameTakenCheck = async username => {
  let response = await axios.post("https://us-central1-serverus-15f25.cloudfunctions.net/login-isUsernameTaken", { username: username });
  return response.data;
  // '{usernameTaken: true/false, profanity: true/false}'
};

export const EmailTakenCheck = async email => {
  let response = await axios.post("https://us-central1-serverus-15f25.cloudfunctions.net/login-isEmailTaken", { email: email });

  return response.data;
  //'{emailTaken: true/false, validEmail: true/false}'
};

export const RedIDTakenCheck = async redId => {
  let response = await axios.post("https://us-central1-serverus-15f25.cloudfunctions.net/login-isRedIdTaken", { redId: redId });

  return response.data;
  //Either '{redIdTaken: true/false}'
};
