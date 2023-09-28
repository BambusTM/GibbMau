// LOGIN
const loginUrl = '/auth/login';
const signupUrl = '/auth/signup';

// login-function
function login(username, password) {
  // JSON-format
  const data = {
    username: username,
    password: password
  };

  fetch(loginUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Statuscode HTTP-ERROR -> ${response.status}`);
      }
      // successful login
      return response.json();
    })
    .then(userData => {
      // use userdata after login
      console.log('Successful lgoin:', userData);
    })
    .catch(error => {
      console.error('Login ERROR ->', error);
    });
}

// SIGNUP
function signup(username, password) {
  // JSON-format
  const data = {
    username: username,
    password: password
  };

  fetch(signupUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Statuscode HTTP-ERROR -> ${response.status}`);
      }
      // successful registration
      return response.json();
    })
    .then(userData => {
      // use data after registration
      console.log('Successful registration:', userData);
    })
    .catch(error => {
      console.error('Registration ERROR ->', error);
    });
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