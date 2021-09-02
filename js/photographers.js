import { getDataPhotographers } from './utils.js';
import {Photo,Mp4,PhotographerInfo} from './media.js';


// console.log(photographers);
const data = await getDataPhotographers('../index.json')
let media = []
let photographers = []
data.media.forEach((element) => {
  media.push(element)
})
data.photographers.forEach((element) => {
  photographers.push(element)
})

//* ***************************************************génération dynamique de la partie description du photographe */

const sectionInfo = document.querySelector('.photographer__description')


let position = window.location.href.indexOf('?')
let idphoto = window.location.href.substr(position + 1)
photographers.forEach((element) => {
  if (element.id == idphoto) {
    const photographerInfos = new PhotographerInfo(element)
    const photographe=photographerInfos.render()
    sectionInfo.innerHTML += photographe
  }
})

/*********************************************rotation de la fleche du bouton de tri au click */
const arrow = document.querySelector('.arrow')
const blocDown = document.querySelectorAll('.bloc__down')
arrow.addEventListener('click', () => {
  arrow.classList.toggle('rotate')
  blocDown.forEach((element) => {
    element.classList.toggle('active')
  })
})



const sectionThumbnail = document.querySelector('.container__thumbnail')
const mediaToRender = []
async function getMedia() {
  const data = await getDataPhotographers('../index.json')
  const position = window.location.href.indexOf('?')
  const idphoto = window.location.href.substr(position + 1)
  const media = data.media
  const photographer = data.photographers  
  media.forEach((element) => {
    if (element.photographerId === parseInt(idphoto)) {
      mediaToRender.push(element)
    }
  })

  mediaToRender.forEach((element) => {
    // eslint-disable-next-line no-prototype-builtins
    if (element.hasOwnProperty('image')) {
      const thumb = new Photo(element)
      const bc = thumb.render()
      sectionThumbnail.innerHTML+= bc
      
    }
  })
  const vid = mediaToRender.filter((el) => {
    return el.video
    
  })
  vid.forEach(element => {
    const videoThumbnail =new Mp4(element)
    const ab = videoThumbnail.render()
    sectionThumbnail.innerHTML+= ab
  });
  const main = document.querySelector('.main')
  const imgs = document.querySelectorAll('.img__thumbnail>img').forEach(img => img.addEventListener('click', (e)=>
  { 
    
    console.log(e.currentTarget.src)
    const div = `<div class="lightbox">
      <button class="lightbox__close"></button>
      <button class="lightbox__next"></button>
      <button class="lightbox__prev"></button>
      <div class="lightbox__container">
        <img src="${e.currentTarget.src}" />
      </div>
    </div>`
    console.log(div);
    main.innerHTML += div


  }))


}
getMedia()


// /****************************************************************partie lightbox */

// class Lightbox {
//     static init (){

//     }
// }
// Lightbox.init()

