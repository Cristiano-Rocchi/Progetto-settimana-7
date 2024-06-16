document.addEventListener("DOMContentLoaded", function () {
  const apiKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmE4YjdjMjM5YzAwMTUyZjRiNDQiLCJpYXQiOjE3MTgzNTM1NTUsImV4cCI6MTcxOTU2MzE1NX0.nMG8gyEtURlUmqf7sf1mN65Bp38dmp4xbI17KPk0YJc";

  const animalId = getAnimal();

  if (animalId) {
    AnimalDetails(animalId);
  } else {
    console.error("ID animale non trovato nella URL");
  }

  function getAnimal() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
  }

  function AnimalDetails(animalId) {
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
        populateAnimalDetails(animal);
      })
      .catch((error) => {
        console.error("Errore durante il fetch dell'animale:", error);
      });
  }

  function populateAnimalDetails(animal) {
    const nameElement = document.getElementById("animalName");
    const descriptionElement = document.getElementById("animalDescription");
    const brandElement = document.getElementById("animalBrand");
    const priceElement = document.getElementById("animalPrice");
    const imgElement = document.getElementById("animalImage");

    nameElement.textContent = animal.name;
    descriptionElement.textContent = animal.description.toUpperCase();
    brandElement.textContent = animal.brand.toUpperCase();
    priceElement.textContent = animal.price;
    imgElement.src = animal.imageUrl;
    imgElement.alt = animal.name;
  }
});
