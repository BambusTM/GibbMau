// @ts-check
/**
 * 
 * @returns {string} get host
 */
function getHost(route) {
  return `http://${location.hostname}:3000/${route}`;
}

// LOGIN
const loginUrl = getHost("auth/login");
const signupUrl = getHost("auth/signup");

/**
 * 
 * @param {string} token 
 * @returns the parsed token
 */
function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

function extractAccessTokenHeader() {
  let cookie = document.cookie;
  let accessToken = cookie.split(";")[0].split("=")[1];
  return accessToken;
}

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
  fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json"
    },
    body: JSON.stringify(data),
  })
    .then((value) => {
      debugger;
      if (value.status === 401 || value.status === 404) {
        alert("Wrong Username or Password");
      }

      if (value.ok) {
        value.json().then(( /** @type {{access_token: string}} */body) => {
          let date = parseJwt(body.access_token);
          alert(JSON.stringify(date));
          document.cookie = `access_token=${body.access_token}; expires=${date.exp}`
          location.reload();
        });
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
 * @param {string} password
 */
function signup(username, password) {
  // JSON-format
  const data = {
    username: username,
    password: password,
  };

  console.log(JSON.stringify(data))

  console.log(extractAccessTokenHeader())


  const stringData = JSON.stringify(data);

  fetch(signupUrl, {
    method: "POST",
    headers: {accept: "application/json", 'Content-Type': "application/json", "Authorization": "Bearer " + extractAccessTokenHeader()},
  
    body: stringData,
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
      location.reload();
    })
    .catch((error) => {
      console.error("Registration ERROR ->", error);
    });
}

// REGISTER-BUTTON
function registerUser() {
  const username = document.getElementById("usernameInput");
  const password = document.getElementById("passwordInput");
  const confirmPassword = document.getElementById("confirmPassword");

  if (
    username instanceof HTMLInputElement &&
    password instanceof HTMLInputElement &&
    confirmPassword instanceof HTMLInputElement &&
    password.value == confirmPassword.value
  ) {
    signup(username.value, password.value);
    console.log(`${username?.value}, ${password?.value}, ${confirmPassword?.value}`)

  } else {
    console.log("wrong Password or error");
  }
}