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

  //* ***************************************************génération dynamique de la partie description du photographe */

  data.photographers.forEach((element) => {
    photographers.push(element)
  })
  let nameOfPhotographerSelected // nom du photographe sélectionné
  let price = 0 // tarif du photographe
  photographers.forEach((element) => {
    if (element.id === idphoto) {
      nameOfPhotographerSelected = element.name
      price = element.price
      const photographerInfos = new PhotographerInfo(element)
      const photographe = photographerInfos.render()
      sectionInfo.innerHTML = photographe
    }
  })

  //* *******************************************génération dynamique du titre de la page photographe ********************/
  const head = document.querySelector('head>title')
  head.innerHTML = nameOfPhotographerSelected + ' Page'

  //* *************************modale de contact */
  contactPhotographer(nameOfPhotographerSelected)

  // récupération de la valeur choisie

  // *****************************************************génération des médias à retourner**************************************/
  const mediaToRender = []
  let filteredMedias = []
  media.forEach((element) => {
    if (element.photographerId === idphoto) {
      mediaToRender.push(element)
    }
  })
  //* * *****************************************************création des vignettes grace a la factory */
  function generateMedias () {
    mediaToRender.forEach((element) => {
      const thumbnail = MediaFactory.createMedia(element)
      sectionThumbnail.innerHTML += thumbnail
    })
  }
  generateMedias()

  //* **********************************************tri au click sur une li ***************************************/
  const photographerLi = document.querySelectorAll('.li')
  filteredMedias = [] // on crée un tableau des médias correspondants au tag
  function filterMedia () {
    photographerLi.forEach(li => li.addEventListener('click', () => {
      console.log(filteredMedias)
      const liSelected = li.textContent.substr(1) // on leve le dièse du tag
      mediaToRender.forEach(el => {
        if (el.tags[0] === liSelected.trim()) { // si un média contient le tag sélectionné
          if (filteredMedias.includes(el)) { // mais qu'il est déja présent dans le tableau
            const index = filteredMedias.indexOf(el)// on récupère son index dans le tab
            filteredMedias.splice(index, 1)// et on le supprime
          } else {
            filteredMedias.push(el)// s'il n'y est pas on l'ajoute au tableau
          }
        }
      })
      sectionThumbnail.innerHTML = ''
      filteredMedias.forEach(element => { // on affiche les médias dans le set
        const thumbnail = MediaFactory.createMedia(element)
        sectionThumbnail.innerHTML += thumbnail
        count() // on relance la fonction count sur le nouveau dom généré
      })
      if (filteredMedias.length === 0) { // si le tableau est vide on lance generatMedias qui affiche tous les médias
        generateMedias()
      }
      li.classList.toggle('active')
      console.log(document.querySelectorAll('.img__thumbnail'))
      document.querySelectorAll('.img__thumbnail').forEach(el => el.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
          el.click()
        }
      }))

      openLightbox()
    }))
  }
  photographerLi.forEach(li => li.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      li.click()
    }
  }))
  filterMedia()
  console.log(filteredMedias)
  /** *******************************************  Animation de la fleche et des éléments de la partie tri  *****************/
  const arrow = document.querySelector('.arrow')
  const blocDown = document.querySelector('.bloc__down')
  const valueButton = document.querySelector('.bloc__top')
  const spanList = document.querySelectorAll('.bloc__down>span')
  let filterChoice // stocke le choix de filtre des médias
  // animation de la fleche + apparition des choix
  arrow.addEventListener('click', () => {
    arrow.classList.toggle('rotate')
    blocDown.classList.toggle('active')
    document.querySelector('.bloc__down>span').focus()
  })
  arrow.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      arrow.click()
    }
  })
  spanList.forEach(span => span.addEventListener('keyup', (e) => {
    console.log(e)
    console.log(span)
    if (e.key === 'Enter') {
      span.click()
    }
  }))
  //* ****************************************************génération du nombres total de likes sur les médias du photographe */
  let totalLikes = 0
  media.forEach((element) => {
    if (element.photographerId === idphoto) {
      totalLikes += element.likes
    }
  })

  //* **********************************************filtre sur les médias */

  spanList.forEach(span => span.addEventListener('click', (e) => {
    sectionThumbnail.innerHTML = ''// on réinitialise la section d'affichage des médias
    blocDown.classList.toggle('active')// on fait disparaître le bloc-down
    arrow.classList.toggle('rotate')// on remet la flêche à l'endroit
    filterChoice = e.target.textContent
    valueButton.textContent = filterChoice// on affiche la valeur choisie dans le bouton
    valueButton.setAttribute('aria-label', 'média trié par ' + filterChoice)
    valueButton.focus()
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
    document.querySelectorAll('.thumbnail>.img__thumbnail').forEach(el => el.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        el.click()
      }
    }))
  }))

  // ******************************************************incrémentation de totalLikes
  const likeCountResume = document.createElement('div')
  likeCountResume.classList.add('likeCountResume')
  likeCountResume.setAttribute('aria-label', 'les médias de ce photographe récoltent ' + totalLikes + ' likes; et son tarif est de ' + price + 'euros par jour')
  likeCountResume.setAttribute('tabindex', '0')
  likeCountResume.innerHTML = `
    <div class="total__likes"'>
      <p>${totalLikes}</p>
      <img src="../img/heart-solid-black.svg" alt =""/>
    </div>

    <p class='price' >${price}€/jour</p>
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
  document.querySelectorAll('.thumbnail>.img__thumbnail').forEach(el => el.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      el.click()
    }
  }))
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
