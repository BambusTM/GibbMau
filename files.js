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
            console.log("File name: " + file.name);
            console.log("File size: " + file.size + " Bytes");

            const formData = new FormData();
            formData.append('file', file);

            // using fetch API to send file(s) to the server
            fetch('/api/storage/upload', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    console.log("Successfully uploaded");
                } else {
                    console.error("Failed to upload file");
                }
            })
            .catch(error => {
                console.error("Error while uploading file: " + error);
            });
        }
    });
});
