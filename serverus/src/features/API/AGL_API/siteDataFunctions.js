import axios from "axios";

//Load specific user for Profile Page
export const LoadProfile = async username => {
  const url = "https://us-central1-serverus-15f25.cloudfunctions.net/users-LoadProfile?=" + username;
  const response = await axios.get(url);
  return response.data;
};

//Load users for the User Directory
export const LoadAllUsers = async component => {
  const response = await axios.get("https://us-central1-serverus-15f25.cloudfunctions.net/users-LoadAllUserProfiles");
  return response.data;
};

//Load games for the Game Directory
export const LoadAllGames = async () => {
  const response = await axios.get("https://us-central1-serverus-15f25.cloudfunctions.net/game-LoadGames");
  return response.data;
};
