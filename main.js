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
