import axios from "axios";

export const AGLEncryption = async password => {
  let response = await axios.post(process.env.REACT_APP_SERVER_URL + "security-AGLEncryption", { password: password });
  return response.data;
  //encrypted resposne
};

export const AGLRencryption = async (email, password) => {
  let response = await axios.post(process.env.REACT_APP_SERVER_URL + "security-AGLRencryption", {
    email: email,
    password: password
  });
  return response;
};

export const IsUserRencrypted = async email => {
  let response = await axios.post(process.env.REACT_APP_SERVER_URL + "security-isUserRencrypted", {
    email: email
  });
  return response.data; //true/false
};
