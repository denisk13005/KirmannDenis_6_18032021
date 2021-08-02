const btnScroll = document.querySelector(".mainRedirection");
window.addEventListener("scroll",(e)=>{
  console.log(e);
})

fetch("./index.json")
  .then(function (resp) {
    return resp.json();
  })
  .then(function (data) {
    for (i = 0; i < data.photographers.length; i++) {
      const section = document.querySelector(".photographers__cards");
      // création de la balise div vignette photographe 
      const photographersThumbnail1 = document.createElement("div");
      photographersThumbnail1.classList.add("photographers__thumbnail");
      section.appendChild(photographersThumbnail1);

      // création du lien pour photo et nom 
      const link = document.createElement("a");
      link.setAttribute("href", "#");
      photographersThumbnail1.appendChild(link);

      // création de la balise div conteneur de la photo 
      const divPhoto = document.createElement("div");
      link.appendChild(divPhoto);

      // création de la balise img 
      let img = document.createElement("img");
      divPhoto.appendChild(img);

      //création de la balise h2 nom du photographe
      let h2 = document.createElement("h2");
      link.appendChild(h2);

      //création de la balise div pour la description du photographe
      const photographersDescription = document.createElement("div");
      photographersDescription.classList.add("photographers__description");
      photographersThumbnail1.appendChild(photographersDescription);

      //création de la balise h3 ville du photographe
      const h3 = document.createElement("h3");
      photographersDescription.appendChild(h3);

      //création de la balise h4 pour la citation du photographe
      const h4 = document.createElement("h4");
      photographersDescription.appendChild(h4);

      //crétaion de la balise p pour le prix 
      const p = document.createElement("p");
      photographersDescription.appendChild(p);

      // création de la balise ul qui comprendra les li correspondants aux tags 
      const ul = document.createElement("ul");
      photographersThumbnail1.appendChild(ul);
      //injection de l'attribut source à la balise img avec un codage dynamique de la valeur 
      img.setAttribute(
        "src",
        "./img/Sample Photos/" +
          data.photographers[i].name +
          "/" +
          data.photographers[i].portrait
      );
      //injection du nom du photographe dans la balise h2
      h2.innerHTML = data.photographers[i].name;
      //injection de la localisation du photographe
      h3.innerHTML =
        data.photographers[i].city + "," + data.photographers[i].country;
      //injection de la citation 
      h4.innerHTML = data.photographers[i].tagline;
      //injection du prix
      p.innerHTML = data.photographers[i].price + "/jour";
      //crétaion de li correspondant aux tags
      data.photographers[i].tags.forEach((element) => {
        let li = document.createElement("li");
        li.innerHTML = "#" + element;
        ul.appendChild(li);
      });
      // console.log(data.photographers[i]);
    }

    // console.log(data);
  });
