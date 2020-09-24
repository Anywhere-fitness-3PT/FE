import axios from "axios";

export const axiosWithAuth = token => {
  // returns an "instance" of axios, with preconfigured configs
  // const token = JSON.parse(localStorage.getItem("token"));
  return axios.create({
    headers: {
      Authorization: token
    },
    baseURL: "https://anywherefitness-lambda.herokuapp.com"
  });
};
