// OPEN FILE-EXPLORER AND UPLOAD FILE TO SERVER
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('openFileExplorer').addEventListener('click', function () {
        document.getElementById('fileInput').click();
    });

    // Event-Listener for inputfield
    document.getElementById('fileInput').addEventListener('change', function (e) {
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
                headers: {
                    Authorization: "Bearer " + extractAccessTokenHeader(),
                    accept: "application/json",
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

    fetch(getHost("storage/download") + `?file=${fileName}`, {
        method: 'GET',
        headers: {
            Authorization: "Bearer " + extractAccessTokenHeader(),
        },
    }).then(res => res.blob()).then(blob => {
        const file = URL.createObjectURL(blob);
        const downloadLink = document.createElement('a');
        downloadLink.href = file;
        downloadLink.download = fileName;
        downloadLink.click();
    }

    );
}

// DELETE FILE
function deleteFile(fileName) {
    fetch(getHost('storage/delete'), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + extractAccessTokenHeader(),
            accept: "application/json",
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

// GET FILES FROM DATABASE AND CREATE FILE DIV
fetch(getHost('storage/list'),
    {
        method: 'GET',
        headers: {
            Authorization: "Bearer " + extractAccessTokenHeader(),
            accept: "application/json",
        },
    }
)
    .then(response => response.json())
    .then(files => {

        const fileList = document.getElementById('fileList');

        files.files.forEach((file, index) => {
            const fileContainer = document.createElement('div');
            fileContainer.classList.add('bigFileContainer');

            const bigFileContainer = document.createElement('div');
            bigFileContainer.classList.add('bigFileDiv');

            const fileImage = document.createElement('img');
            fileImage.src = "/rsc/folder_small.png";
            fileImage.alt = "404";

            const actionDiv = document.createElement('div');
            actionDiv.classList.add('bigFileBtnDiv');

            const deleteButton = document.createElement('button');
            deleteButton.title = 'delete file';
            deleteButton.innerHTML = '<img src="rsc/delete.png" alt="404">';
            deleteButton.addEventListener('click', () => deleteFile(file.name));

            const downloadButton = document.createElement('button');
            downloadButton.title = 'download file';
            downloadButton.innerHTML = '<img src="rsc/cloud-computing.png" alt="404">';
            downloadButton.addEventListener('click', () => downloadFile(file.name));

            const shareButton = document.createElement('button');
            shareButton.title = 'share file';
            shareButton.innerHTML = '<img src="rsc/share_icon.png" alt="404">';
            shareButton.addEventListener('click', () => togglePopup('sharePopup'));

            const nameLabel = document.createElement('label');
            nameLabel.htmlFor = `file${index + 1}`;
            nameLabel.textContent = file;

            fileContainer.appendChild(fileImage);
            fileContainer.appendChild(actionDiv);
            actionDiv.appendChild(deleteButton);
            actionDiv.appendChild(downloadButton);
            actionDiv.appendChild(shareButton);
            bigFileContainer.appendChild(nameLabel);

            fileList.appendChild(fileContainer);
        });
    })
    .catch(error => {
        console.error('Failed to load files: ' + error);
    });