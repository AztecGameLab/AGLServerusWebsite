import axios from "axios";

export const LoadProfile = async username => {
  const url = "https://us-central1-serverus-15f25.cloudfunctions.net/users-LoadProfile?=" + username;
  const response = await axios.get(url);
  return response.data;
};

export const LoadAllUsers = async component => {
  const response = await axios.get("https://us-central1-serverus-15f25.cloudfunctions.net/users-LoadAllUserProfiles");
  return response.data;
};
