// OPEN FILE-EXPLORER AND UPLOAD FILE TO SERVER
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
            fetch('http://localhost:3000/storage/upload', {
                method: 'POST',
                body: formData,
                headers:{
                    Authorization: "Bearer " + extractAccessTokenHeader(),
                    accept:"application/json", 
                }
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

// OPEN FILE
function openFile(fileName) {
    // open here
}

// DOWNLOAD FILE
function downloadFile(fileName) {
    const downloadLink = document.createElement('a');
    downloadLink.href = `${getHost("storage/download")}?fileName=${fileName}`;
    downloadLink.download = fileName;
    downloadLink.click();
}

// DELETE FILE
function deleteFile(fileName) {
    fetch(getHost('storage/delete'), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + extractAccessTokenHeader(),
            accept:"application/json", 
            "Content-Type": "application/json"

        },
        body: JSON.stringify({ files: [fileName] })
    })
    .then(response => {
        if (response.ok) {
            console.log("File deleted successfully.");
            // success
        } else {
            console.error("File deletion failed.");
            // fail
        }
    })
    .catch(error => {
        console.error("Error deleting file: " + error);
        // error
    });
}