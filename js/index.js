import { getDataPhotographers } from "./utils.js";
import { Photographer } from "./objetPhotographers.js";

const section = document.querySelector(".photographers__cards");
const ul = document.querySelector(".tag>ul");
const data = await getDataPhotographers("index.json"); //récupération des données json
const photographersData = data.photographers; //récupération des données liées aux photographes
const media = data.media; //récupération des données liées aux medias
let photographers = [];
//**********************************************affichage des photographes
photographersData.forEach((element) => {
  photographers.push(new Photographer(element));
});
photographers.forEach((element) => {
  section.innerHTML += element.render();
});

//*********************************************fonction de génération dynamique des li

function generateLi(){
  let tagArray = [];  
  let tagConcat = [];
  photographersData.forEach(tag => {
    tagArray.push(tag.tags)
  })
  tagArray.forEach((element) =>{ //rassemble tous les tags dans un tableau unique
    element.forEach(tag =>{
      tagConcat.push(tag)
    })
  })
  const setTab = new Set(tagConcat); // supprime les doublons du tableau unique
  setTab.forEach((element)=>
    ul.innerHTML += `<li data-name='${element}'>#${element}</li>`) // crée les li corespondantes au tag

}
generateLi();


//********************************************recherche si le tag est présent et affiche les photographes qui ont le tag */
let tagsDesired = []; //renvoie le tableau des tableaux des tags sélectionnés
let elementsTagTab = []
const test = (tag) => {
  
  section.innerHTML = "";
  photographersWithTagSelected.forEach((element) => { //filtre les photographes comprenant le tag sélectionné
    tagsDesired.push(element);  //ajoute chaque photographe contenant le tag sélectionné au tableau afin de pouvoir sélectionner plusieurs tags et afficher tous les photographes correspondants
    elementsTagTab.push(element.tags)  

  });
  const photographersWithTagSelected = photographers.filter((x) => x.hasTag(tag));
  let tagsDesiredSet = new Set(tagsDesired); //élimine les doublons dans le tableau tagDesired
  tagsDesiredSet.forEach((element)=>{
    console.log(element);
    section.innerHTML += element.render();
  })
  console.log(photographersWithTagSelected);
  console.log(tagsDesired)
  console.log(elementsTagTab);
};
document.querySelectorAll(".tag>ul>li").forEach((element) =>
  element.addEventListener("click", (e) => {
    element.classList.toggle("active")
    test(e.target.dataset.name);
  })
);

//************************************************apparition du boutton au scroll

const btnScroll = document.querySelector(".mainRedirection");
window.addEventListener("scroll", (e) => {
  if (window.scrollY >= 220) {
    btnScroll.classList.add("mainRedirectionVisible");
  } else {
    btnScroll.classList.remove("mainRedirectionVisible");
  }
});

// let arrow = document.querySelector(".arrow");
// arrow.addEventListener("click",()=>{
//   arrow.classList.toggle("rotate")  
// })