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
        throw new Error("errore " + response.statusText);
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
        cardPrice.textContent = "prezzo: " + element.price + "€";

        const button = document.createElement("button");
        button.classList.add("btn", "btn-outline-danger");
        button.innerText = "delete";
        button.addEventListener("click", (event) => {
          event.target.closest(".col").remove();
        });

        const priceAndButtonContainer = document.createElement("div");
        priceAndButtonContainer.classList.add(
          "d-flex",
          "justify-content-between",
          "priceAndButtonContainer"
        );

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(description);
        cardBody.appendChild(cardPrice);
        priceAndButtonContainer.appendChild(button);
        cardBody.appendChild(priceAndButtonContainer);
        card.appendChild(img);
        card.appendChild(cardBody);
        col.appendChild(card);
        row.appendChild(col);
      });

      const main = document.querySelector("main");
      const footer = document.createElement("footer");
      footer.classList.add("mt-4", "text-center", "text-secondary");

      const pFooter = document.createElement("p");
      pFooter.innerHTML = "copyright kun (131213121312)";
      footer.appendChild(pFooter);

      main.insertAdjacentElement("afterend", footer);
    })
    .catch((err) => console.error("Fetch error:", err));
};

window.addEventListener("DOMContentLoaded", () => {
  fetchanimals();
});
