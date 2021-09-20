import { getDataPhotographers } from './utils.js'
import { PhotographerInfo, MediaFactory } from './media.js'
import { Lightbox } from './lightbox.js'
import { contactPhotographer } from './modale.js'

const sectionInfo = document.querySelector('.photographer__description')// entête description du photographe
const sectionThumbnail = document.querySelector('.container__thumbnail')// section contenant les médias du photographe
const main = document.querySelector('.main')

/** *******************************************  Partie tri des médias  *************/
const arrow = document.querySelector('.arrow')
const blocDown = document.querySelectorAll('.bloc__down')
const popularity = document.querySelector('.bloc__top')
popularity.addEventListener('click', () => console.log('click'))
console.log(popularity)
arrow.addEventListener('click', () => {
  arrow.classList.toggle('rotate')
  blocDown.forEach((element) => {
    element.classList.toggle('active')
    element.addEventListener('click', (e) => {
      console.log(e)
    })
  })
})

async function getMedia () {
  const data = await getDataPhotographers('../index.json')
  const position = window.location.href.indexOf('?')
  const idphoto = parseInt(window.location.href.substr(position + 1))
  const media = data.media
  const photographers = []
  let totalLikes = 0
  media.forEach((element) => {
    if (element.photographerId === idphoto) {
      totalLikes += element.likes
    }
  })

  //* ***************************************************génération dynamique de la partie description du photographe */

  data.photographers.forEach((element) => {
    photographers.push(element)
  })
  let nameOfPhotographerId // nom du photographe sélectionné
  let price = 0
  photographers.forEach((element) => {
    if (element.id === idphoto) {
      nameOfPhotographerId = element.name
      price = element.price
      console.log(element)
      const photographerInfos = new PhotographerInfo(element)
      const photographe = photographerInfos.render()
      sectionInfo.innerHTML = photographe
    }
  })

  console.log(nameOfPhotographerId)
  //* *************************modale de contact */
  contactPhotographer(nameOfPhotographerId)

  // *****************************************************génération des médias à retourner
  const mediaToRender = []

  media.forEach((element) => {
    if (element.photographerId === idphoto) {
      mediaToRender.push(element)
    }
  })
  /** *****************************************************création des vignettes grace a la factory */
  mediaToRender.forEach((element) => {
    const thumbnail = MediaFactory.createMedia(element)
    sectionThumbnail.innerHTML += thumbnail
  })
  // ******************************************************incrémenttion de totalLikes
  const likeCountResume = document.createElement('div')
  likeCountResume.classList.add('likeCountResume')
  likeCountResume.innerHTML = `
      <div class="total__likes">
        <p>${totalLikes}</p>
        <img src="../img/heart-solid-black.svg" />
      </div>

      <p class='price'>${price}€/jour</p>
  `
  document.body.appendChild(likeCountResume)

  const hearts = document.querySelectorAll('#heart')
  totalLikes += 1
  hearts.forEach((heart) => {
    heart.addEventListener('click', () => {
      const totalLikesP = document.querySelector('.total__likes>p') // on récupère le p correspondant au nombre total de like sur les médias du photographe
      const imageLikeContent = heart.parentElement.children[0]// on récupère le p correspondant au coeur du média sur lequel on clique
      let imageLike = parseInt(heart.parentElement.children[0].textContent)// on modifie le type en integer pour pouvoir l'incrémenter
      imageLike++
      imageLikeContent.innerHTML = imageLike// on remplace le nombre de j'aime du média par la valeur incrémentée
      const totalLikesIncr = totalLikes++ // on incrémente le nombre total de like sur les média du photographe
      totalLikesP.innerHTML = totalLikesIncr // on le remplace par la valeur incrémentée
    })
  })

  // /****************************************************************Lightbox ***********/
  const tabLight = document.querySelectorAll('.thumbnail>.img__thumbnail')
  const light = new Lightbox(tabLight, main)
  light.start()
}

getMedia()
