import axios from "axios";

//Load specific user for Profile Page
export const LoadProfile = async username => {
  const url = process.env.REACT_APP_SERVER_URL + "users-LoadProfile?=" + username;
  const response = await axios.get(url);
  return response.data;
};

//Load users for the User Directory
export const LoadAllUsers = async component => {
  const response = await axios.get(process.env.REACT_APP_SERVER_URL + "users-LoadAllUserProfiles");
  return response.data;
};

//Load games for the Game Directory
export const LoadAllGames = async () => {
  const response = await axios.get(process.env.REACT_APP_SERVER_URL + "game-LoadGames");
  return response.data;
};
