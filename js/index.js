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
  element.addEventListener("click", () => {
    if (tagsDesired.includes(element.dataset.name)) {
      let index = tagsDesired.indexOf(element.dataset.name);
      tagsDesired.splice(index, 1);
    } else {
      tagsDesired.push(element.dataset.name);
    }
    // test();
    element.classList.toggle("active");
    if (tagsDesired.length == 0) {
      window.location.reload();
    }
    console.log(tagsDesired);
  })
);

// let photographersWithTagSelected = [];
// let photographersToRender = [];

// const test = () => {

//   tagsDesired.forEach((element) => {
//     if (photographersWithTagSelected.includes(element)) {
//       let indexobj = photographersWithTagSelected.indexOf(element);
//       photographersWithTagSelected.splice(indexobj, 1);
//       console.log(photographersWithTagSelected);
//     } else {
//       photographersWithTagSelected.push(
//         photographers.filter((x) => x.hasTag(element))
//       );
//       console.log(photographersWithTagSelected);
//     }
//   });

//   // photographersWithTagSelected.forEach((elmt) => {
//   //   elmt.forEach((element) => {
//   //     console.log(element);
//   //     if(.includes(element)){
//   //       let indexElmt = photographersToRender.indexOf(element);
//   //       photographersToRender.splice(indexElmt,1)
//   //     }else{
//   //       photographersToRender.push(element);
//   //     }
//   //   });
//   // });

//   // photographersWithTagSelected.forEach((element) => {
//   //   console.log(element);
//   //   element.forEach((x) => {
//   //     photographersToRender.push(x);
//   //   });
//   // });

//   //
//   // section.innerHTML = "";

//   // let setPhotographersWithTagSelected = [...new Set(photographersWithTagSelected)];
//   // console.log(setPhotographersWithTagSelected);
//   // setPhotographersWithTagSelected.forEach(element => {
//   //   section.innerHTML += element.render();
//   // });
// };

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
