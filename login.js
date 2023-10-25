// @ts-check
/** @typedef {import('./types/node_modules/jose/dist/types')} jose_import */
// @ts-ignore
import * as jose_import from "https://esm.run/jose";

/** @type {import('./types/node_modules/jose/dist/types')} */
const jose = jose_import;

// LOGIN
const loginUrl = "http://localhost:3000/auth/login";
const signupUrl = "/auth/signup";
// @param username string
// login-function
/**
 * @param {string} username
 * @param {string} password
 */
function login(username, password) {
  // JSON-format
  const data = {
    username: username,
    password: password,
  };
  let result = fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((value) => {
      if (value.status === 401 || value.status === 404) {
        alert("Wrong Username or Password");
      }

      if (value.ok) {
        value.json().then((access_token) => {});
      }
    })
    .catch((err) => {
      alert("error: " + err);
    });
}

// LOGIN-BUTTON
function performLogin() {
  const username = document.getElementById("loginUsername");
  const password = document.getElementById("loginPassword");
  if (
    username instanceof HTMLInputElement &&
    password instanceof HTMLInputElement
  ) {
    login(username.value, password.value);
  }
}

// SIGNUP
/**
 * @param {string} username
 * @param {string} email
 * @param {string} password
 */
function signup(username, email, password) {
  // JSON-format
  const data = {
    username: username,
    password: password,
  };

  fetch(signupUrl, {
    method: "POST",
    headers: {
      accept: "application/json",
    },

    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Statuscode HTTP-ERROR -> ${response.status}`);
      }
      // successful registration
      return response.json();
    })
    .then((userData) => {
      // use data after registration
      console.log("Successful registration:", userData);
    })
    .catch((error) => {
      console.error("Registration ERROR ->", error);
    });
}

// REGISTER-BUTTON
function registerUser() {
  const username = document.getElementById("usernameInput");
  const email = document.getElementById("emailInput");
  const password = document.getElementById("passwordInput");
  const confirmPassword = document.getElementById("confirmPassword");

  if (
    username instanceof HTMLInputElement &&
    email instanceof HTMLInputElement && // evtl. mail entfernen
    password instanceof HTMLInputElement &&
    password == confirmPassword
  ) {
    signup(username.value, email.value, password.value);
  } else if (password != confirmPassword) {
    console.log("wrong Password");
  }
}