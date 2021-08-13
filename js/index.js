import { getDataPhotographers } from "./utils.js";
import { Photographer } from "./photographers.js";

const section = document.querySelector(".photographers__cards");
const ul = document.querySelector(".tag>ul");
const data = await getDataPhotographers("index.json"); //récupération des données json
const photographersData = data.photographers; //récupération des données liées aux photographes
const media = data.media; //récupération des données liées aux medias
let photographers = [];
console.log(photographers);
console.log(photographersData);
//fonction de génération dynamique des li
function generateLi(){
  let tagArray = [];  
  let tagConcat = [];
  photographersData.forEach(tag => {
    tagArray.push(tag.tags)
    console.log("tag"+ tagArray)
  })
  tagArray.forEach((element) =>{ //rassemble tous les tags dans un tableau unique
    element.forEach(tag =>{
      tagConcat.push(tag)
    })
  })
  const setTab = new Set(tagConcat); // supprime les doublons du tableau unique
  console.log(setTab)
  setTab.forEach((element)=>
    ul.innerHTML += `<li data-name='${element}'>#${element}</li>`) // crée les li corespondantes au tag

}
generateLi();
//**********************************************affichage des photographes
photographersData.forEach((element) => {
  photographers.push(new Photographer(element));
});
photographers.forEach((element) => {
  section.innerHTML += element.render();
});
//********************************************recherche si le tag est présent et affiche les photographes qui ont le tag */
let tagsDesired = [];
const test = (tag) => {
  const qque = photographers.filter((x) => x.hasTag(tag));
  section.innerHTML = "";
  qque.forEach((element) => {
    tagsDesired.push(element);
  });
  let tagsDesiredSet = new Set(tagsDesired);
  
  tagsDesiredSet.forEach((element)=>{
    section.innerHTML += element.render();
  })
  console.log(qque);
  console.log(tagsDesired)

};
document.querySelectorAll(".tag>ul>li").forEach((element) =>
  element.addEventListener("click", (e) => {
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
