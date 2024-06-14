const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmE4YjdjMjM5YzAwMTUyZjRiNDQiLCJpYXQiOjE3MTgzNTM1NTUsImV4cCI6MTcxOTU2MzE1NX0.nMG8gyEtURlUmqf7sf1mN65Bp38dmp4xbI17KPk0YJc";

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const brand = document.getElementById("brand").value;
  const imageUrl = document.getElementById("url").value;
  const price = document.getElementById("price").value;

  const newAnimal = {
    name: name,
    description: description,
    brand: brand,
    imageUrl: imageUrl,
    price: price,
  };

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

      document.getElementById("form").reset();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
