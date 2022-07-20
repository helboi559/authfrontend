import { json } from "express";

const urlEndpoint=process.env.REACT_APP_URL_ENDPOINT

export const registerUser = async (username,password) => {
    const url = `${urlEndpoint}/auth/register-user`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username,password}) 
    });
    const responseJSON = await response.json();
}

export const loginUser = async (username,password) => {
    const url = `${urlEndpoint}/auth/login-user`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username,password}) 
    });
    const responseJSON = await response.json();
    if (responseJSON.success) {
          localStorage.setItem(process.env.REACT_APP_TOKEN_HEADER_KEY, JSON.stringify(responseJSON.token));
        }
}

export const logoutUser = () => {
    localStorage.removeItem(process.env.REACT_APP_TOKEN_HEADER_KEY)
}

export const getUserToken = () => {
    return JSON.parse(localStorage.getItem(process.end.REACT_APP_TOKEN_HEADER_KEY))
}