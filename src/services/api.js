const BASE_URL = `https://reqres.in/api`;

export const fetchLogin = (credentials) =>
  fetch(`${BASE_URL}/login?email=${credentials.email}&password=${credentials.password}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  }).then((res) => res.json());

export const fetchUsers = (page) =>
  fetch(`${BASE_URL}/users?page=${page}`).then((res) => res.json());

export const fetchSingleUser = (userID) =>
  fetch(`${BASE_URL}/users/${userID}`).then((res) => res.json());

export const fetchEditUser = (params) =>
  fetch(`${BASE_URL}/users/${params.userID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName: params.firstName,
      lastName: params.lastName,
      email: params.email,
    }),
  }).then((res) => res.json());

export const fetchDeleteUser = (userID) =>
  fetch(`${BASE_URL}/users/${userID}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res);
