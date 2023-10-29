// URL
const isAdminUrl = getHost("admin/is");

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

// ADMIN PAGE
fetch(isAdminUrl, {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + extractAccessTokenHeader(),
  },
}).then(res => {
  if(res.ok) {
    res.json().then((/** @type {{isAdmin: boolean}} */ value) => {
      if (value.isAdmin) {
        const menubars = document.getElementsByClassName("menubar");
        if (menubars.length > 0) {
          const menubar = menubars.item(0);
          const dropdown = menubar.removeChild(document.getElementsByClassName("dropdown").item(0));
          const vLine = document.createElement("div");
          vLine.classList.add("v-line");
          menubar.appendChild(vLine);

          const link = document.createElement('a');
          link.href = "/src/page/admin/admin.html";
          if(location.pathname == "/src/page/admin/admin.html") link.classList.add("active");
          const p = document.createElement('p');
          p.textContent = "Admin";
          link.appendChild(p);

          menubar.appendChild(link);
          menubar.appendChild(dropdown);

        }
      }
    })
  }
});