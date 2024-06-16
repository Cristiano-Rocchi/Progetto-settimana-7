// homepage.js

document.addEventListener("DOMContentLoaded", function () {
  const apiKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmE4YjdjMjM5YzAwMTUyZjRiNDQiLCJpYXQiOjE3MTgzNTM1NTUsImV4cCI6MTcxOTU2MzE1NX0.nMG8gyEtURlUmqf7sf1mN65Bp38dmp4xbI17KPk0YJc";

  const fetchanimals = () => {
    fetch("https://striveschool-api.herokuapp.com/api/product/", {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore di rete: " + response.statusText);
        }
        return response.json();
      })
      .then((animals) => {
        console.log("animals", animals);
        const row = document.getElementById("cardsContainer");
        row.innerHTML = "";
        animals.forEach((element) => {
          const col = document.createElement("div");
          col.classList.add("col");

          const card = document.createElement("div");
          card.classList.add("card", "bg-dark", "text-light");

          const img = document.createElement("img");
          img.src = element.imageUrl;
          img.classList.add("card-img-top");

          const cardBody = document.createElement("div");
          cardBody.classList.add("card-body");

          const description = document.createElement("p");
          description.textContent = element.description;

          const cardTitle = document.createElement("h5");
          cardTitle.classList.add("card-title");
          cardTitle.textContent = element.name;

          const cardPrice = document.createElement("p");
          cardPrice.classList.add("card-text");
          cardPrice.textContent = "Prezzo: " + element.price + "€";

          const deleteButton = document.createElement("button");
          deleteButton.classList.add("btn", "btn-outline-danger", "me-2");
          deleteButton.innerText = "Delete";
          deleteButton.addEventListener("click", () => {
            deleteAnimal(element._id);
          });

          const editButton = document.createElement("a");
          editButton.classList.add("btn", "btn-outline-primary");
          editButton.innerText = "Modifica";
          editButton.href = `./back-office.html?id=${element._id}`;

          const buttonContainer = document.createElement("div");
          buttonContainer.classList.add("d-flex", "justify-content-between");
          buttonContainer.appendChild(deleteButton);
          buttonContainer.appendChild(editButton);

          cardBody.appendChild(cardTitle);
          cardBody.appendChild(description);
          cardBody.appendChild(cardPrice);
          cardBody.appendChild(buttonContainer);
          card.appendChild(img);
          card.appendChild(cardBody);
          col.appendChild(card);
          row.appendChild(col);
        });
      })
      .catch((error) => {
        console.error("Errore durante il fetch degli animali:", error);
      });
  };

  function deleteAnimal(animalId) {
    fetch(`https://striveschool-api.herokuapp.com/api/product/${animalId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore di rete: " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Animale eliminato:", data);
        fetchanimals(); // Aggiorna la lista degli animali dopo l'eliminazione
      })
      .catch((error) => {
        console.error("Errore durante l'eliminazione dell'animale:", error);
      });
  }

  fetchanimals(); //  funzione fetchanimals avvio della pagina
});
