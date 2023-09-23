let popup = document.getElementById("popup");

function openPopup() {
    console.log("pressed");
    popup.classList.add("open-popup");
}

function closePopup() {
    popup.classList.remove("open-popup");
}
