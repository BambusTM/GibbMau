// OPEN FILE-EXPLORER
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('openFileExplorer').addEventListener('click', function() {
        document.getElementById('fileInput').click();
    });

    // Event-Listener for inputfield
    document.getElementById('fileInput').addEventListener('change', function(e) {
        const selectedFiles = e.target.files; // List of selected files

        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            console.log("Dateiname: " + file.name);
            console.log("Dateigröße: " + file.size + " Bytes");

            // upload to server mit fetch api
        }
    });
});