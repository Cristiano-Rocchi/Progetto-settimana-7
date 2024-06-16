const urlParams = new URLSearchParams(window.location.search);
const animalId = urlParams.get("id");

document.addEventListener("DOMContentLoaded", function () {
  const apiKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmE4YjdjMjM5YzAwMTUyZjRiNDQiLCJpYXQiOjE3MTgzNTM1NTUsImV4cCI6MTcxOTU2MzE1NX0.nMG8gyEtURlUmqf7sf1mN65Bp38dmp4xbI17KPk0YJc";

  const form = document.getElementById("form");
  const nameInput = document.getElementById("name");
  const descriptionInput = document.getElementById("description");
  const brandInput = document.getElementById("brand");
  const priceInput = document.getElementById("price");
  const urlInput = document.getElementById("url");

  if (animalId) {
    // aggiorna il form alla modifica
    document.getElementById("form").setAttribute("data-animal-id", animalId);
    fetchAnimal(animalId);
  } else {
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = nameInput.value;
    const description = descriptionInput.value;
    const brand = brandInput.value;
    const imageUrl = urlInput.value;
    const price = priceInput.value;

    const newAnimal = {
      name: name.toUpperCase(),
      description: description,
      brand: brand,
      imageUrl: imageUrl,
      price: price,
    };

    if (animalId) {
      //  PUT requestse si modifica un animale
      updateAnimal(animalId, newAnimal);
    } else {
      // POST request se si aggiunge
      createAnimal(newAnimal);
    }
  });

  function fetchAnimal(animalId) {
    fetch(`https://striveschool-api.herokuapp.com/api/product/${animalId}`, {
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
      .then((animal) => {
        // Popola il form con i dati dell'animale da modificare
        nameInput.value = animal.name;
        descriptionInput.value = animal.description;
        brandInput.value = animal.brand;
        priceInput.value = animal.price;
        urlInput.value = animal.imageUrl;
      })
      .catch((error) => {
        console.error("Errore durante il fetch dell'animale:", error);
      });
  }

  function createAnimal(newAnimal) {
    fetch("https://striveschool-api.herokuapp.com/api/product/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(newAnimal),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response error");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        alert("Animale aggiunto con successo!");
        form.reset();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function updateAnimal(animalId, updatedAnimal) {
    fetch(`https://striveschool-api.herokuapp.com/api/product/${animalId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(updatedAnimal),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("errore");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        alert("Modifica avvenuta con successo!");
        form.reset();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});
