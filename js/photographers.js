import { getDataPhotographers } from './utils.js'
import { Photo, Mp4, PhotographerInfo } from './media.js'

const sectionInfo = document.querySelector('.photographer__description')

/** *******************************************rotation de la fleche du bouton de tri au click */
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
async function getMedia () {
  const data = await getDataPhotographers('../index.json')
  const position = window.location.href.indexOf('?')
  const idphoto = window.location.href.substr(position + 1)
  const media = data.media
  const photographers = []
  //* ***************************************************génération dynamique de la partie description du photographe */

  data.photographers.forEach((element) => {
    photographers.push(element)
  })
  photographers.forEach((element) => {
    if (element.id == idphoto) {
      const photographerInfos = new PhotographerInfo(element)
      const photographe = photographerInfos.render()
      sectionInfo.innerHTML = photographe
    }
  })
  // *****************************************************génération des vignettes photos
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
      sectionThumbnail.innerHTML += bc
    }
  })
  // *****************************************************génération des vignettes vidéo
  const vid = mediaToRender.filter((el) => {
    return el.video
  })
  vid.forEach((element) => {
    const videoThumbnail = new Mp4(element)
    const ab = videoThumbnail.render()
    sectionThumbnail.innerHTML += ab
  })
  const main = document.querySelector('.main')
  document.querySelectorAll('.img__thumbnail>img').forEach((img) =>
    img.addEventListener('click', (e) => {
      console.log(e.currentTarget.src)
      const div = `<div class="lightbox">
      <button class="lightbox__close"></button>
      <button class="lightbox__next"></button>
      <button class="lightbox__prev"></button>
      <div class="lightbox__container">
        <img src="${e.currentTarget.src}" />
      </div>
    </div>`
      console.log(div)
      main.innerHTML += div
    })
  )
  document.querySelectorAll('.img__thumbnail>video').forEach((v) => v.addEventListener('click', (e) => {
    const div = `<div class="lightbox">
    <button class="lightbox__close"></button>
    <button class="lightbox__next"></button>
    <button class="lightbox__prev"></button>
    <div class="lightbox__container">
    <video
    src="${e.currentTarget.src}"
    type="video/mp4"   
    autoplay           
  ></video> 
    </div>
  </div>`
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
