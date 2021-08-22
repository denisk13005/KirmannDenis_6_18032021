import { getDataPhotographers } from './utils.js'
import { Photographer } from './objetPhotographers.js'

let section = document.querySelector('.photographers__cards')
const ul = document.querySelector('.tag>ul')
const data = await getDataPhotographers('index.json') //récupération des données json
const photographersData = data.photographers //récupération des données liées aux photographes
const media = data.media //récupération des données liées aux medias
let photographers = []
//**********************************************affichage des photographes
photographersData.forEach((element) => {
  photographers.push(new Photographer(element))
})
photographers.forEach((element) => {
  section.innerHTML += element.render()
})
//*********************************************fonction de génération dynamique des li
function generateLi() {
  let tagArray = []
  photographers.forEach((photographer) => {
    photographer.tags.forEach((tag) => {
      tagArray.push(tag)
    })
  })
  //
  const setTab = new Set(tagArray) // supprime les doublons du tableau unique
  setTab.forEach(
    (element) => (ul.innerHTML += `<li data-name='${element}'>#${element}</li>`)
  ) // crée les li corespondantes au tag
}
generateLi()

//********************************************recherche si le tag est présent et affiche les photographes qui ont le tag */

let tagsDesired = []
let photographersFilters = []

document.querySelectorAll('.tag>ul>li').forEach((element) => {
  element.addEventListener('click', () => {
    section.innerHTML = "";
    photographersFilters = [];
    
    if (!tagsDesired.includes(element)) {  //si l'élément li n'est pas inclus dans le tableau tagsDesired :
      tagsDesired.push(element)            //on le push
      element.classList.toggle('active')    //on lui ajoute la classe active pour simuler un bouton enfoncé
      photographers.forEach(photographer => { //pour chaque photographe

        if(photographer.tags.includes(element.dataset.name)){//on vérifie si la valeur de l'élément sélectionné est compris dans ses tags
          photographersFilters.push(photographer)            //si oui on le push dans le tableau des photographes filtrés
        }
      })
      let setphotographersFilters = new Set(photographersFilters) //on supprime les doublons du tableau
      console.log(setphotographersFilters);
      setphotographersFilters.forEach(photographer => { //pour chaque photographe du tableau des photographes filtrés
  
        section.innerHTML+=photographer.render()}) //on rend à l'écran les vignettes des photographes voulus
    } 
    else {
      tagsDesired.splice(tagsDesired.indexOf(element), 1)//si l'élément li est inclu dans le tableau on le supprime
      element.classList.toggle('active') //on lui lève le classe active 
    }    
    if(tagsDesired.length>1){
      console.log(tagsDesired);
      tagsDesired[1].classList.add('active')
      tagsDesired[0].classList.remove('active')
      tagsDesired.splice(tagsDesired[0],1)
    }
    if(tagsDesired.length == 0){
      section.innerHTML = ""
      photographers.forEach(photographer => section.innerHTML += photographer.render())
    }
    console.log(tagsDesired)
   

    console.log(photographersFilters);
    
  })
})
//   tagsDesired.forEach(li=>{
//     if(li.classList.contains('active')){
//       li.classList.remove('active')
//     }
//     if(tagsDesired.includes(li.dataset.name)){
//       tagsDesired.slice(tagsDesired.indexOf(element),1)
//     }else{
//       tagsDesired.push(element)
//     }
//   })

//   photographersFilters = []
//   section.innerHTML = ''

//   photographers.forEach((photographer) => {
//     if (photographer.tags.includes(element.textContent.slice(1))) {
//       photographersFilters.push(photographer)
//     }
//   })
//   photographersFilters.forEach((photographer) => {

//     section.innerHTML += photographer.render()
//   })
//   // element.classList.toggle('active')
//   console.log(tagsDesired)
//   // console.log(photographersFilters)
// })

// element.addEventListener('click', () => {

//   tagsDesired=[]
//   section.innerHTML = "";
//   tagsDesired.push(element)
//   tagsDesired.forEach(li => {
//     li.classList.toggle('active')
//   });
//   tagsDesired.splice(1,1)
//   console.log(tagsDesired);

//   // if(tagsDesired.length ===0){
//   photographers.forEach((element) => {
//     section.innerHTML += element.render()
//   })
// }else if(tagsDesired.length == 1){
//   tagsDesired[0].classList.add('active')
//   photographers.forEach((photographer) => {
//     if (photographer.tags.includes(tagsDesired[0].dataset.name)) {
//       console.log(photographer)
//       section.innerHTML += photographer.render()
//     }

//   })
// }else{
//   tagsDesired[0].classList.remove('active')
//   tagsDesired[1].classList.add('active')
//   tagsDesired.splice(-1,1)
//   photographers.forEach((photographer) => {
//     if (photographer.tags.includes(tagsDesired[0].dataset.name)) {
//       console.log(photographer)
//       section.innerHTML += photographer.render()
//     }

//   })

// }
// liSelected = element
// if (tagsDesired.includes(element.dataset.name)) {
//   let index = tagsDesired.indexOf(element.dataset.name);
//   tagsDesired.splice(index, 1);
// } else {
//   tagsDesired.push(element.dataset.name);
// }
// section.innerHTML = "";
// tagsDesired = []
// tagsDesired.forEach(li => li.classList.add('active'))
// console.log(liSelected);

//   })
// )
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

const btnScroll = document.querySelector('.mainRedirection')
window.addEventListener('scroll', (e) => {
  if (window.scrollY >= 220) {
    btnScroll.classList.add('mainRedirectionVisible')
  } else {
    btnScroll.classList.remove('mainRedirectionVisible')
  }
})

// let arrow = document.querySelector(".arrow");
// arrow.addEventListener("click",()=>{
//   arrow.classList.toggle("rotate")
// })
