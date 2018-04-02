import axios from "axios";
import { auth } from "../../../fireconfig";

export const SendPasswordReset = async email => {
  let response = await axios.post("https://us-central1-serverus-15f25.cloudfunctions.net/security-sendPasswordReset", { email: email });
  return response.data;
};

export const ResetRequestExists = async hash => {
  let response = await axios.post("https://us-central1-serverus-15f25.cloudfunctions.net/security-resetRequestExists", { hash: hash });
  return response.data;
};

export const AGL_ResetPassword = async (securityCode, hash, newPassword) => {
  let response = await axios.post("https://us-central1-serverus-15f25.cloudfunctions.net/security-resetPassword", {
    securityCode: securityCode,
    hash: hash,
    newPassword: newPassword
  });
  return response.data;
};

export const ResetPassword = email => {
  return auth.sendPasswordResetEmail(email);
};
