import { getDataPhotographers } from './utils.js'
import { MediaFactory } from './media.js'
import { Lightbox } from './lightbox.js'
import { contactPhotographer } from './modale.js'
import { PhotographerInfo } from './photographerHeader.js'

const sectionInfo = document.querySelector('.photographer__description')// entête description du photographe
const sectionThumbnail = document.querySelector('.container__thumbnail')// section contenant les médias du photographe
const body = document.querySelector('body')
async function getMedia () {
  const data = await getDataPhotographers('../index.json')
  const position = window.location.href.indexOf('?')
  const idphoto = parseInt(window.location.href.substr(position + 1))
  const media = data.media
  const photographers = []
  //* ****************************************************génération du nombres total de likes sur les médias du photographe */
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
      const photographerInfos = new PhotographerInfo(element)
      const photographe = photographerInfos.render()
      sectionInfo.innerHTML = photographe
      console.log(photographe)
    }
  })

  //* *******************************************générationb dynamique du nom de la page photographe ********************/
  const head = document.querySelector('head>title')
  head.innerHTML = nameOfPhotographerId + ' Page'
  console.log(head.textContent)
  //* *************************modale de contact */
  contactPhotographer(nameOfPhotographerId)

  /** *******************************************  Animation de la fleche et des éléments de la partie tri  *****************/
  const arrow = document.querySelector('.arrow')
  const blocDown = document.querySelector('.bloc__down')
  const valueButton = document.querySelector('.bloc__top')
  let filterChoice // stocke le choix de filtre des médias
  // animation de la fleche + apparition des choix
  arrow.addEventListener('click', () => {
    arrow.classList.toggle('rotate')
    blocDown.classList.toggle('active')
  })
  // récupération de la valeur choisie

  // *****************************************************génération des médias à retourner**************************************/
  const mediaToRender = []
  let filteredMedias = []
  media.forEach((element) => {
    if (element.photographerId === idphoto) {
      mediaToRender.push(element)
    }
  })

  //* **********************************************tri au click sur une li ***************************************/
  const photographerLi = document.querySelectorAll('.li')

  photographerLi.forEach(li => li.addEventListener('click', () => {
    filteredMedias = []
    const liSelected = li.textContent.substr(1)
    console.log(liSelected)
    mediaToRender.forEach(el => {
      if (el.tags[0] === liSelected.trim()) {
        filteredMedias.push(el)
      }
    })
    sectionThumbnail.innerHTML = ''
    filteredMedias.forEach(element => {
      const thumbnail = MediaFactory.createMedia(element)
      sectionThumbnail.innerHTML += thumbnail
    })
    li.classList.toggle('active')
    console.log(li)
    openLightbox()
  }))

  //* **********************************************filtre sur les médias */
  blocDown.addEventListener('click', (e) => {
    sectionThumbnail.innerHTML = ''// on réinitialise la section d'affichage des médias
    blocDown.classList.toggle('active')// on fait disparaître le bloc-down
    arrow.classList.toggle('rotate')// on remet la flêche à l'endroit
    filterChoice = e.target.textContent
    valueButton.textContent = filterChoice// on affiche la valeur choisie dans le bouton
    if (filterChoice === 'Titre') {
      mediaToRender.sort(function (a, b) {
        return a.title.localeCompare(b.title)
      })
    } else if (filterChoice === 'Date') {
      mediaToRender.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date)
      })
    } else {
      mediaToRender.sort(function (a, b) {
        return b.likes - a.likes
      })
    }

    generateMedias()
    count()
    totalLikes -= 1
    openLightbox()
  })
  //* * *****************************************************création des vignettes grace a la factory */
  function generateMedias () {
    mediaToRender.forEach((element) => {
      const thumbnail = MediaFactory.createMedia(element)
      sectionThumbnail.innerHTML += thumbnail
    })
  }
  generateMedias()
  // ******************************************************incrémentation de totalLikes
  const likeCountResume = document.createElement('div')
  likeCountResume.classList.add('likeCountResume')
  likeCountResume.innerHTML = `
    <div class="total__likes"'>
      <p>${totalLikes}</p>
      <img src="../img/heart-solid-black.svg" alt =""/>
    </div>

    <p class='price'>${price}€/jour</p>
`
  document.body.appendChild(likeCountResume)

  function count () {
    const hearts = document.querySelectorAll('#heart')
    totalLikes += 1
    hearts.forEach((heart) => {
      heart.addEventListener('click', () => {
        const totalLikesP = document.querySelector('.total__likes>p') // on récupère le p correspondant au nombre total de like sur les médias du photographe
        totalLikesP.innerHTML = totalLikes++ // on incrémente la valeur total de likes
        const imageLikeContent = heart.parentElement.children[0]// on récupère le p correspondant au coeur du média sur lequel on clique
        let imageLike = parseInt(heart.parentElement.children[0].textContent)// on modifie le type en integer pour pouvoir l'incrémenter
        imageLike++
        imageLikeContent.innerHTML = imageLike// on remplace le nombre de j'aime du média par la valeur incrémentée
      })
    })
  }
  count()
  // /****************************************************************Lightbox ***********/
  function openLightbox () {
    const tabLight = document.querySelectorAll('.thumbnail>.img__thumbnail')
    const light = new Lightbox(tabLight, body)
    light.start()
  }
  openLightbox()
}
window.onload = function () {
  getMedia()
}
