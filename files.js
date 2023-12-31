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
            console.log("File name: " + file);
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
                        location.reload();
                    } else {
                        console.error("Failed to upload file");
                        location.reload();

                    }
                })
                .catch(error => {
                    console.error("Error while uploading file: " + error);
                    location.reload();

                });
                window.location.reload();
                
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
                location.reload();
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

        files.files.forEach((/** @type {string} */ file, index) => {
            var file = file.replace(/\\/g,'/');
            var file = file.replace('.cloud/users/', '');
            var file = file.slice(file.indexOf('/') + 1, file.length);

            const bigFileContainer = document.createElement('div');
            bigFileContainer.className = 'bigFileContainer';

            const bigFileDiv = document.createElement('div');
            bigFileDiv.className = 'bigFileDiv';

            const imageDiv = document.createElement('div');
            imageDiv.onclick = function () {
                openFile(file);
            };

            const fileImage = document.createElement('img');
            fileImage.src = '/rsc/folder_small.png';
            fileImage.alt = '404';
            imageDiv.appendChild(fileImage);

            const bigFileBtnDiv = document.createElement('div');
            bigFileBtnDiv.className = 'bigFileBtnDiv';

            const deleteButton = document.createElement('button');
            deleteButton.title = 'delete file';
            deleteButton.onclick = function () {
                console.log(file);
                deleteFile(file);
            };

            const deleteImage = document.createElement('img');
            deleteImage.src = '/rsc/delete.png';
            deleteImage.alt = '404';
            deleteButton.appendChild(deleteImage);

            const downloadButton = document.createElement('button');
            downloadButton.title = 'download file';
            downloadButton.onclick = function () {
                downloadFile(file);
            };

            const downloadImage = document.createElement('img');
            downloadImage.src = '/rsc/cloud-computing.png';
            downloadImage.alt = '404';
            downloadButton.appendChild(downloadImage);

            const shareButton = document.createElement('button');
            shareButton.title = 'share file';
            shareButton.onclick = function () {
                togglePopup('sharePopup');
            };

            const shareImage = document.createElement('img');
            shareImage.src = '/rsc/share_icon.png';
            shareImage.alt = '404';
            shareButton.appendChild(shareImage);

            const nameDiv = document.createElement('div');
            nameDiv.className = 'nameDiv';

            const nameLabel = document.createElement('label');
            nameLabel.for = 'file1';
            nameLabel.textContent = file;

            bigFileDiv.appendChild(imageDiv);
            bigFileDiv.appendChild(bigFileBtnDiv);
            bigFileBtnDiv.appendChild(deleteButton);
            bigFileBtnDiv.appendChild(downloadButton);
            bigFileBtnDiv.appendChild(shareButton);
            nameDiv.appendChild(nameLabel);

            bigFileContainer.appendChild(bigFileDiv);
            bigFileContainer.appendChild(nameDiv);

            fileList.appendChild(bigFileContainer);


        });
    })
    .catch(error => {
        console.error('Failed to load files: ' + error);
    });