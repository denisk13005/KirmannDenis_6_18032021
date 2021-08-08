import { getDataPhotographers } from "./utils.js";

let section = document.querySelector(".photographers__cards");
let data = await getDataPhotographers("index.json"); //récupération des données json
let photographers = data.photographers; //récupération des données liées aux photographes
let media = data.media//récupération des données liées aux medias
let photographersSelected = [];


// ******************************************création de la classe photographe
class Photographer {
  constructor(name, id, city, country, tags, tagline, price, portrait) {
      this.name = name,
      this.id = id,
      this.city = city,
      this.country = country,
      this.tags = tags,
      this.tagline = tagline,
      this.price = price,
      this.portrait = portrait;
  }
  //******************************************création de la méthode render qui permettra d'afficher les photographes
  render() {
    let div = `       
        <div class="photographers__thumbnail">
         <a href="#">
           <div>
             <img src="./img/Sample Photos/${this.name}/${this.portrait}" alt="photo de ${this.name}" />
           </div>
           <h2>${this.name}</h2>
         </a>
         <div class="photographers__description">
           <h3>${this.city}, ${this.country}</h3>
           <h4>${this.tagline}</h4>
           <p>${this.price}/jour</p>
         </div>
         <ul>
            ${this.tags.map((tag) => `<li>#${tag}`).join("")}
         </ul>
        
          `;
    section.innerHTML += div;
  }
}


//**********************************************affichage des photographes 
photographers.forEach((element) => {
  let photographer = new Photographer(element.name,element.id,element.city,element.country,element.tags,element.tagline,element.price,element.portrait);
  photographer.render()})




//**********************************************création d'un tableau contanant les tags sélectionnés

const tags = document.querySelectorAll(".tag>ul>li");
let tagSelected = [];
let tagDesired ;
tags.forEach((tag) => {
  tag.addEventListener("click", () => { 
      console.log(photographersSelected)    
      photographers.forEach((element) => {
        let divThumbnail = document.querySelectorAll(".photographers__thumbnail");
        divThumbnail.forEach(elmt=>{
          elmt.classList.add("displayNone");
        })
      })     
        
    
    if (tagSelected.includes(tag.className)) {
      const index = tagSelected.indexOf(tag.className);
      tagSelected.splice(index, 1);
    } else {
      tagSelected.push(tag.className);
      tagSelected.forEach(element => {
        tagDesired = element;
        return tagDesired
      })
      
      photographers.forEach(element => {
        if(element.tags.includes(tagDesired)){
          photographersSelected.push(element)
          

        }
      });
      
    }
    
  });
});
console.log(tagSelected)

//**********************************************création d'un tableau contenant les photographes correspondants au tags sélectionnés









//************************************************apparition du boutton au scroll

const btnScroll = document.querySelector(".mainRedirection");
window.addEventListener("scroll", (e) => {
  if (window.scrollY >= 220) {
    btnScroll.classList.add("mainRedirectionVisible");
  } else {
    btnScroll.classList.remove("mainRedirectionVisible");
  }
});
