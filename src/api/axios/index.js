import axios from "axios";

export const InstanceAxios = axios.create({
  baseURL: "https://reqres.in/api/users",
  headers: {
    "Content-Type": "application/json",
  },
});
