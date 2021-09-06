import { getDataPhotographers } from './utils.js'
import { PhotographerInfo, Media } from './media.js'
import { Lightbox } from './lightbox.js'

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
  const idphoto = parseInt(window.location.href.substr(position + 1))
  const media = data.media
  const photographers = []
  //* ***************************************************génération dynamique de la partie description du photographe */

  data.photographers.forEach((element) => {
    photographers.push(element)
  })
  photographers.forEach((element) => {
    if (element.id === idphoto) {
      const photographerInfos = new PhotographerInfo(element)
      const photographe = photographerInfos.render()
      sectionInfo.innerHTML = photographe
    }
  })
  // *****************************************************génération des vignettes photos
  media.forEach((element) => {
    if (element.photographerId === idphoto) {
      mediaToRender.push(element)
    }
  })
  /** *****************************************************création des vignettes grace a la factory */
  mediaToRender.forEach((element) => {
    const media = Media.createMedia(element)
    sectionThumbnail.innerHTML += media
  })

  const main = document.querySelector('.main')
  document.querySelectorAll('.thumbnail').forEach((element) =>
    element.addEventListener('click', (e) => {
      const div = `<div class="lightbox">
        <button class="lightbox__close"></button>
        <button class="lightbox__next"></button>
        <button class="lightbox__prev"></button>
        <div class="lightbox__container">
          <img src="${e.currentTarget.firstElementChild.firstElementChild.src}" />
          <p>  ${e.currentTarget.lastElementChild.firstElementChild.innerHTML}</p>
        </div>
      </div>
      
      
      `
      main.innerHTML = div
    })
  )
}
getMedia()

// /****************************************************************partie lightbox */
