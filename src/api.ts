import axios from "axios";
import Cookie from "js-cookie";
import {
  IChangePassword,
  ICreateTodo,
  IEditProfile,
  ILogin,
  ISignUp,
  ITodoEditVaild,
  IUser,
} from "./types";
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

export const editTodo = (value: ITodoEditVaild) => {
  console.log(value);
  return instance
    .put(`todos/${value.id}`, value, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((res) => res.data);
};

interface IDeleteTodoVariable {
  id: number;
}

export const deleteTodo = ({ id }: IDeleteTodoVariable) => {
  console.log(id);
  return instance
    .delete(`todos/${id}`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((res) => res.data);
};

export const editProfile = (data: IEditProfile) => {
  return instance
    .put("users/me/", data, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((res) => res.data);
};

export const changePassword = (data: IChangePassword) => {
  return instance
    .put("users/changepassword/", data, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((res) => res.data);
};

export const createTodo = (data: ICreateTodo) => {
  return instance
    .post("todos/", data, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((res) => res.data);
};

// {id}로 넘기는 것과, id를 바로 넘기는 것은 차이가 있는데,
