// fonction de tri au clic sur tag

let tagsCibled = document.querySelectorAll("ul>li");
console.log(tagsCibled);

// appel de l'api fetch pour récupérer les données json

fetch("./index.json")
  .then(function (resp) {
    return resp.json();
  })
  .then(function (data) {
    tagsCibled.forEach((elmt) =>
      elmt.addEventListener("click", () => {
        let clickedValue = elmt.classList.value;
        console.log(clickedValue);
        return clickedValue;
      })
    );
    let tabTagSelect = [];
    console.log(tabTagSelect);


    for (i = 0; i < data.photographers.length; i++) {
      if (data.photographers[i].tags.includes("travel")) {
        tabTagSelect.push(data.photographers[i].name)
      }

      const section = document.querySelector(".photographers__cards");
      const photographersThumbnail1 = document.createElement("div");
      photographersThumbnail1.classList.add("photographers__thumbnail");
      section.appendChild(photographersThumbnail1);
      const link = document.createElement("a");
      link.setAttribute("href", "#");
      photographersThumbnail1.appendChild(link);
      const divPhoto = document.createElement("div");
      link.appendChild(divPhoto);
      let img = document.createElement("img");
      divPhoto.appendChild(img);
      let h2 = document.createElement("h2");
      link.appendChild(h2);
      const photographersDescription = document.createElement("div");
      photographersDescription.classList.add("photographers__description");
      photographersThumbnail1.appendChild(photographersDescription);
      const h3 = document.createElement("h3");
      photographersDescription.appendChild(h3);
      const h4 = document.createElement("h4");
      photographersDescription.appendChild(h4);
      const p = document.createElement("p");
      photographersDescription.appendChild(p);
      const ul = document.createElement("ul");
      photographersThumbnail1.appendChild(ul);
      img.setAttribute(
        "src",
        "./img/Sample Photos/" +
          data.photographers[i].name +
          "/" +
          data.photographers[i].portrait
      );
      h2.innerHTML = data.photographers[i].name;
      h3.innerHTML =
        data.photographers[i].city + "," + data.photographers[i].country;
      h4.innerHTML = data.photographers[i].tagline;
      p.innerHTML = data.photographers[i].price + "€/jour";
      data.photographers[i].tags.forEach((element) => {
        let li = document.createElement("li");
        li.innerHTML = "#" + element;
        ul.appendChild(li);
      });
    }
  });
