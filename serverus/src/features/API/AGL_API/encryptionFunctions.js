import axios from "axios";

export const AGLEncryption = async password => {
  let response = await axios.post("https://us-central1-serverus-15f25.cloudfunctions.net/security-AGLEncryption", { password: password });
  return response.data;
  //encrypted resposne
};

export const AGLRencryption = async (email, password) => {
  let response = await axios.post("https://us-central1-serverus-15f25.cloudfunctions.net/security-AGLRencryption", {
    email: email,
    password: password
  });

  return response;
};

export const IsUserRencrypted = async email => {
  let response = await axios.post("https://us-central1-serverus-15f25.cloudfunctions.net/security-isUserRencrypted", {
    email: email
  });

  return response.data; //true/false
};
