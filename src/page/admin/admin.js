const users = document.getElementById("users");
const usersUrl = getHost("auth/users");
const deleteUserUrl = getHost("auth/delete");

console.log(JSON.stringify(users));

if (users instanceof HTMLTableElement) {
  fetch(usersUrl, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + extractAccessTokenHeader(),
    },
  }).then((value) => {
    if (!value.ok) {
      const newElement = document.createElement("li");
      newElement.textContent = "Error: Could not load users";
      users.appendChild(newElement);
    }

    value
      .json()
      .then(
        (
          /** @type {{id: number, username: string, isAdmin: boolean, creationDate: string}[]} */ values
        ) => {
          values.forEach((item, index, array) => {
            /*const liElement = document.createElement("li");
                liElement.textContent = `Username: ${item.username}, Is Admin: ${item.isAdmin}, Creation Date: ${new Date(item.creationDate)}`;

                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                liElement.appendChild(deleteButton);

                users.appendChild(liElement);*/

            const tableRow = document.createElement("tr");
            const username = document.createElement("td");
            username.textContent = item.username;
            tableRow.appendChild(username);

            const isAdmin = document.createElement("td");
            isAdmin.textContent = item.isAdmin;
            tableRow.appendChild(isAdmin);

            const creationDate = document.createElement("td");
            const date = new Date(Number(item.creationDate));
            creationDate.textContent = date.toLocaleDateString("de-CH");
            tableRow.appendChild(creationDate);

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", (mouseEvent) => {
              fetch(deleteUserUrl, {
                method: "DELETE",
                headers: {
                  accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + extractAccessTokenHeader(),
                },
                body: JSON.stringify({ username: item.username }),
              }).then((deleteResponse) => {
                if (deleteResponse.ok) {
                  location.reload();
                } else {
                  deleteResponse
                    .json()
                    .then((message) =>
                      alert("Could not delete user because: " + message.message)
                    )
                    .catch((message) =>
                      alert(
                        "Could not delete user and get error message because " +
                        JSON.stringify(message)
                      )
                    );
                }
              });
            });
            tableRow.appendChild(deleteButton);

            users.appendChild(tableRow);
          });
        }
      );
  });
} else {
  throw new Error("Could not find HTMLUListElement");
}
