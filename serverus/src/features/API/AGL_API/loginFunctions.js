import axios from "axios";

export const Login = data => {
  const url = process.env.REACT_APP_FIREBASE_URL + "/Login";
  return axios.get(url).then(user => {
    return user.response.data;
  });
};
