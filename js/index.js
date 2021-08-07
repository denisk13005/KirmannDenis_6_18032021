let section = document.querySelector(".photographers__cards");

import { getData } from "./utils.js";
let photo = await getData("index.json");//récupération des données json
console.log(photo);

for (const [key, value] of Object.entries(photo[0].tags)) {
  console.log(`${value}`);
}

// création de la classe photographe 
class Photographer {
  constructor(name, id, city, country, tags, tagline, price, portrait) {
    (this.name = name),
      (this.id = id),
      (this.city = city),
      (this.country = country),
      (this.tags = tags),
      (this.tagline = tagline),
      (this.price = price),
      (this.portrait = portrait);
  }
  render() { //création de la méthode render qui permettra d'afficher les photographes
    let tags = this.tags;
    let div = `       
        <div class="photographers__thumbnail">
         <a href="#">
           <div>
             <img src="./img/Sample Photos/${this.name}/${
      this.portrait
    }" alt="photo de ${this.name}" />
           </div>
           <h2>${this.name}</h2>
         </a>
         <div class="photographers__description">
           <h3>${this.city}, ${this.country}</h3>
           <h4>${this.tagline}</h4>
           <p>${this.price}/jour</p>
         </div>
         <ul>
            ${tags.map((tag) => `<li>#${tag}`).join("")}
         </ul>
        
          `;
    section.innerHTML += div;
  }
}
//tri au clic sur un tag

const tags = document.querySelectorAll(".tag>ul>li");
console.log(tags);
let tagSelected = [];
tags.forEach((tag) => {
  tag.addEventListener("click", () => {
    if (tagSelected.includes(tag.className)) {
      const index = tagSelected.indexOf(tag.className);
      tagSelected.splice(index,1);
      console.log(index);
    } else {
      tagSelected.push(tag.className);
    }  
    console.log(tagSelected)  
  });
});
console.log(photo)

if(tagSelected.length===0){
  photo.forEach((element) => {
    let photographer = new Photographer(
      element.name,
      element.id,
      element.city,
      element.country,
      element.tags,
      element.tagline,
      element.price,
      element.portrait
    );
    photographer.render();
  });
}else{
  tagSelected.forEach((element) => {
    let photographer = new Photographer(
      element.name,
      element.id,
      element.city,
      element.country,
      element.tags,
      element.tagline,
      element.price,
      element.portrait
    );
    photographer.render();
  });
}

//apparition du boutton au scroll
const btnScroll = document.querySelector(".mainRedirection");
window.addEventListener("scroll", (e) => {
  if (window.scrollY >= 220) {
    btnScroll.classList.add("mainRedirectionVisible");
  } else {
    btnScroll.classList.remove("mainRedirectionVisible");
  }
});


