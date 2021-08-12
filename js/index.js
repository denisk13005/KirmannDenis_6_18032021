import { getDataPhotographers } from "./utils.js";
import { Photographer } from "./photographers.js";


const section = document.querySelector(".photographers__cards");
const data = await getDataPhotographers("index.json"); //récupération des données json
const photographersData = data.photographers; //récupération des données liées aux photographes
const media = data.media//récupération des données liées aux medias
let photographers = [];
console.log(photographers)
console.log(photographersData)


//**********************************************affichage des photographes 
photographersData.forEach((element) => {
  photographers.push( new Photographer(element)) ; 
})
photographers.forEach(element => {
  section.innerHTML += element.render()
})
//********************************************recherche si le tag est présent et affiche les photographes qui ont le tag */

const test = (tag) =>{
    const qque = photographers.filter(x => x.hasTag(tag))
    console.log(qque);
    section.innerHTML ="";
    qque.forEach(element => {
      section.innerHTML += element.render()      
    })
console.log(qque)

}
let li = document.querySelectorAll(".tag>ul>li")
li.forEach((element)=> element.addEventListener('click',(e)=>{
  test(e.target.className)
}))
// li.addEventListener('click',(e)=>{
//   console.log(e.target.className)
// })
// test("portrait")
// const tabTagSearch = []
// photographers.forEach(element => tabTagSearch.push(element.tags))
// console.log(tabTagSearch)

//**********************************************création d'un tableau contanant les tags sélectionnés

// const tags = document.querySelectorAll(".tag>ul>li");
// let tagSelected = [];
// let tagDesired =[] ;
// let photographersSelected = [];//tableau contenant les photographes sélectionnés en fonction du tag cliqué
// tags.forEach((tag) => {
//   tag.addEventListener("click", () => { 

//     console.log(tag.dataset.name)
//       //cacher tous les photographes
//       // photographers.forEach((element) => {
//       //     let divThumbnail = document.querySelectorAll(".photographers__thumbnail");
//       //     divThumbnail.forEach(elmt=>{
//       //       elmt.classList.add("displayNone");
//       //     })
//       //   })   
//     //je vérifie si le tableau tagSelected contient le tag sélectionné, si oui je l'enlève si non je l'ajoute 
//     if (tagSelected.includes(tag.className)) { 
//       const index = tagSelected.indexOf(tag.className);
//       tagSelected.splice(index, 1);
//     } else {
//       tagSelected.push(tag.className);
//       tagSelected.forEach(element => {
//         tagDesired = element;
//       })
      
//       photographers.forEach(element => {
//         if(element.tags.includes(tagDesired)){
//           photographersSelected.push(element)
//         }
//       });
      
      
//     }
//     if(tagSelected.length === 0){
//        //si aucun tag n'est sélectionné afficher tous les photographes
//       photographers.forEach((element) => {
//         let photographer = new Photographer(element.name,element.id,element.city,element.country,element.tags,element.tagline,element.price,element.portrait);
//         photographer.render()})     
//         console.log("vrai")   
//     }else{
//       console.log("faux")
//       photographersSelected.forEach((element) => {   
//         console.log(element.tags)     
//         //   
//         let photographer = new Photographer(element.name,element.id,element.city,element.country,element.tags,element.tagline,element.price,element.portrait);
//         photographer.render()})
//         photographersSelected=[];
//     }
    
//     console.log(tagSelected)
//     console.log(photographersSelected)
//     console.log(tagDesired)

    
//   });
// });












//************************************************apparition du boutton au scroll

const btnScroll = document.querySelector(".mainRedirection");
window.addEventListener("scroll", (e) => {
  if (window.scrollY >= 220) {
    btnScroll.classList.add("mainRedirectionVisible");
  } else {
    btnScroll.classList.remove("mainRedirectionVisible");
  }
});
