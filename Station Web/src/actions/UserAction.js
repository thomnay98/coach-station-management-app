import axios from 'axios';
import { API_USER_URL } from './../constants/Config';

export const register = newUser => {
  return axios
    .post(`${API_USER_URL}/users/register`, {
      name: newUser.fullName,
      email: newUser.email,
      password: newUser.password,
      phone: newUser.phone
    })
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const login = user => {
  return axios
    .post(`${API_USER_URL}/users/login`, {
      username: user.username,
      password: user.password
    })
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const getProfile = token => {
  return axios
    .get(`${API_USER_URL}/users/me`, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Cookie': '__cfduid=df8e80eef8c8d17095cbed3bf0b795c9c1597580737'
      }
    })
    .then(response => {
      console.log(response)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const updateProfile = (token, data) => {
  return axios
    .put(`${API_USER_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Cookie': '__cfduid=df8e80eef8c8d17095cbed3bf0b795c9c1597580737'
      }
    },
      data
    )
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const changePassword = (token, data) => {
  return axios
    .patch(`${API_USER_URL}/users/change-password`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Cookie': '__cfduid=df8e80eef8c8d17095cbed3bf0b795c9c1597580737'
      }
    },
      data
    )
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err.response)
    })
}