import { NewUserType, TokenUserType } from "../components/Login/SignUpForm";

export const API_URL = "https://thawing-spire-17017.herokuapp.com";
export const ENDPOINTS = {
  SINGUP: "/signup",
  CREATE_TOKEN: "/signin",
};

export const createNewUser = async (user: NewUserType) => {
  console.log("user", user);
  const rawResponse = await fetch(`${API_URL}${ENDPOINTS.SINGUP}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (response.status === 409) {
        throw new Error("User login already exists!");
      } else if (response.status === 200) {
        return response;
      }
    })
    .catch((error) => console.log("error", error));
  console.log("raw", rawResponse);
  return rawResponse;
};

export const getUserToken = async (user: TokenUserType) => {
  const rawResponse = await fetch(`${API_URL}${ENDPOINTS.CREATE_TOKEN}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (response.status === 404) {
        throw new Error("Пользователя с таким адресом нет");
      } else if (response.status === 403) {
        throw new Error("Введен неверный пароль");
      } else if (response.status === 201) {
        return response.json();
      }
    })
    .catch((error) => console.log(error));

  console.log("rawToken", rawResponse);
  return rawResponse;
};
