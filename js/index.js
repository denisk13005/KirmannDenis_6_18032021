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

function generateLi() {
  let tagArray = [];
  let tagConcat = [];
  photographersData.forEach((tag) => {
    tagArray.push(tag.tags);
  });
  tagArray.forEach((element) => {
    //rassemble tous les tags dans un tableau unique
    element.forEach((tag) => {
      tagConcat.push(tag);
    });
  });
  const setTab = new Set(tagConcat); // supprime les doublons du tableau unique
  setTab.forEach(
    (element) => (ul.innerHTML += `<li data-name='${element}'>#${element}</li>`)
  ); // crée les li corespondantes au tag
}
generateLi();

//********************************************recherche si le tag est présent et affiche les photographes qui ont le tag */
let tagsDesired = []; //renvoie le tableau des tableaux des tags sélectionnés et débarrasé des doublons
document.querySelectorAll(".tag>ul>li").forEach((element) =>
  element.addEventListener("click", (e) => {
    console.log(element.dataset.name);
    if (tagsDesired.includes(element.dataset.name)) {
      let index = tagsDesired.indexOf(element.dataset.name);
      tagsDesired.splice(index, 1);
    } else {
      tagsDesired.push(element.dataset.name);
    }
    element.classList.toggle("active");
    console.log(tagsDesired);
    console.log(photographers);
    console.log(test());
    if(tagsDesired.length == 0){
      window.location.reload()
    }


  })
);
const test = () => {
  const photographersWithTagSelected = photographers.filter((x) =>
    x.hasTag(tagsDesired)
  );
  console.log(photographersWithTagSelected);

  section.innerHTML = "";
  photographersWithTagSelected.forEach((element) => {
    console.log(element);
    section.innerHTML += element.render();
  });
};

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
