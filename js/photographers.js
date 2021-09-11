import { getDataPhotographers } from './utils.js'
import { PhotographerInfo, MediaFactory } from './media.js'
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
  let nameOfPhotographerId // nom du photographe sélectionné
  photographers.forEach((element) => {
    if (element.id === idphoto) {
      nameOfPhotographerId = element.name
      const photographerInfos = new PhotographerInfo(element)
      const photographe = photographerInfos.render()
      sectionInfo.innerHTML = photographe
    }
  })
  console.log(nameOfPhotographerId)
  //* *************************modale de contact */

  const contact = document.querySelector('.contact')
  console.log(contact)
  contact.addEventListener('click', open())

  // *****************************************************génération des médias à retourner
  media.forEach((element) => {
    if (element.photographerId === idphoto) {
      mediaToRender.push(element)
    }
  })
  /** *****************************************************création des vignettes grace a la factory */
  mediaToRender.forEach((element) => {
    const media = MediaFactory.createMedia(element)
    sectionThumbnail.innerHTML += media
  })
  console.log(mediaToRender)

  // /****************************************************************partie lightbox */
  const main = document.querySelector('.main')
  const tabLight = document.querySelectorAll('.thumbnail>.img__thumbnail')
  console.log(tabLight)
  const light = new Lightbox(tabLight, main)
  light.render()
}

getMedia()
