// LOGIN
const loginUrl = "localhost:3000/auth/login";
const signupUrl = "/auth/signup";

// login-function
async function login(username, password) {
  // JSON-format
  const data = {
    username: username,
    password: password,
  };
  try {
    let result = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Statuscode HTTP-ERROR -> ${response.status}`);
        }
        // successful login
        return response.json();
      })
      .then((userData) => {
        // use userdata after login
        console.log("Successful lgoin:", userData);
      })
      .catch((error) => {
        console.error("Login ERROR ->", error);
      });
    alert(result);
  } catch (err) {
    alert(err);
  }
}

// LOGIN-BUTTON
function performLogin() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;
  console.log("Started login");
  login(username, password);
}

// SIGNUP
function signup(username, email, password) {
  // JSON-format
  const data = {
    username: username,
    email: email,
    password: password,
  };

  fetch(signupUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
  const username = document.getElementById("usernameInput").value;
  const email = document.getElementById("emailInput").value;
  const password = document.getElementById("passwordInput").value;

  signup(username, email, password);
}

// POPUPS
function togglePopup(popupId) {
  var popup = document.getElementById(popupId);
  if (popup) {
    var allPopups = document.querySelectorAll(".popup");
    allPopups.forEach(function (otherPopup) {
      if (otherPopup !== popup) {
        otherPopup.classList.remove("show");
      }
    });

    popup.classList.toggle("show");
  }
}

// SETTINGS
function handleSettings(option) {
  switch (option) {
    case "option1":
      break;
    case "option2":
      break;
    default:
      console.log("Ungültige Option");
  }
}

// ACCOUNT-PAGE
function accountPage() {
  if (!login) {
    document.getElementById("register").style.display = "none";
  } else {
    document.getElementById("register").style.display = "block";
  }
}
