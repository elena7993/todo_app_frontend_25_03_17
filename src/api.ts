import axios from "axios";
import Cookie from "js-cookie";
import { ILogin, ISignUp } from "./types";
import { log } from "console";
import { QueryFunctionContext } from "@tanstack/react-query";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  withCredentials: true,
});

export const getMe = () => instance.get("users/me/").then((res) => res.data);
export const userLogout = () =>
  instance
    .post("users/logout/", null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((res) => res.data);

export const userLogin = (data: ILogin) => {
  console.log(data);
  return instance
    .post("users/login/", data, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((res) => res.data);
};

export const userSignUp = (data: ISignUp) => {
  return instance
    .post("users/signup/", data, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((res) => res.data);
};

export const getTodos = () => instance.get("todos/").then((res) => res.data);

export const getTodoDetail = ({ queryKey }: QueryFunctionContext) => {
  const [_, id] = queryKey;
  return instance.get(`todos/${id}`).then((res) => res.data);
};

export const editTodo = (value: any) => {
  console.log(value);
  return instance
    .put(`todos/${1}`, value, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((res) => res.data);
};
