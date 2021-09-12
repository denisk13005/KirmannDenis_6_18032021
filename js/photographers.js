import { getDataPhotographers } from './utils.js'
import { PhotographerInfo, MediaFactory } from './media.js'
import { Lightbox } from './lightbox.js'
import { contactPhotographer } from './modale.js'

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
const main = document.querySelector('.main')

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
  contactPhotographer(nameOfPhotographerId)

  // const contact = document.querySelector('.contact')

  // const form = document.createElement('form')
  // form.classList.add('formulaire')
  // contact.addEventListener('click', () => {
  //   const modale = `
  //   <h1>Contactez-moi<br />${nameOfPhotographerId}</h1>
  //   <img src="../img/croix.png" alt="fermer la modale de contact" />
  //   <label for="firstname">Prénom</label>
  //   <input type="text" name="firstname" id="firstname" />
  //   <span class = "firstname"></span>
  //   <label for="name">Nom</label>
  //   <input type="text" name="name" id="name" />
  //   <span class = "name"></span>
  //   <label for="email">Email</label>
  //   <input type="email" name="email" id="email" />
  //   <span class = "email"></span>
  //   <label for="message">Votre message</label>
  //   <textarea name="message" id="message"></textarea>
  //   <span class = "message"></span>
  //   <input id="submit" type="submit" value="Envoyer" />
  //   `
  //   form.innerHTML = modale
  //   main.appendChild(form)
  //   // fermeture de la modale au click sur la croix
  //   const closeModal = document.querySelector('.formulaire>img')
  //   closeModal.addEventListener('click', () => {
  //     main.removeChild(form)
  //   })
  //   const submitButton = document.getElementById('submit')
  //   submitButton.addEventListener('click', (e) => {
  //     e.preventDefault()
  //     main.removeChild(form)
  //   })
  // })

  // })

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

  // /****************************************************************partie lightbox */
  const tabLight = document.querySelectorAll('.thumbnail>.img__thumbnail')
  const light = new Lightbox(tabLight, main)
  light.render()
}

getMedia()
