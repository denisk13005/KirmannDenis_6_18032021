import { getDataPhotographers } from './utils.js'
import { Photographer } from './photographersThumbnail.js'

async function init () {
  const data = await getDataPhotographers('index.json')
  const photographers = []
  const main = document.getElementById('main')
  const section = document.createElement('section')
  section.classList.add('photographers__cards')
  main.appendChild(section)

  const photographersCards = document.querySelector('.photographers__cards')
  const ul = document.querySelector('.tag>ul')
  const photographersData = data.photographers // récupération des données liées aux photographes
  //* ************************************ */ création des vignettes photographes
  photographersData.forEach((element) => {
    photographers.push(new Photographer(element))
  })
  photographers.forEach((element) => {
    photographersCards.innerHTML += element.render()
  })
  //* ************************************* */ création des li représentant les tags voulus
  function generateLi () {
    const tagArray = []
    photographers.forEach((photographer) => {
      photographer.tags.forEach((tag) => {
        tagArray.push(tag)
      })
    })
    //
    const setTab = new Set(tagArray) // supprime les doublons du tableau unique
    setTab.forEach(
      (element) =>
        (ul.innerHTML += `<li tabindex="0"  aria-label="trier les photographes par ${element} "data-name='${element}'>#${element}</li>`)
    ) // crée les li corespondantes au tag
  }
  generateLi()
  //* *****************************************tri au click sur un tag */
  const tagsDesired = []
  let photographersFilters = []
  function mediaSorting (element) {
    photographersCards.innerHTML = ''
    photographersFilters = []
    if (!tagsDesired.includes(element)) { // si l'élément li n'est pas inclus dans le tableau tagsDesired :
      tagsDesired.push(element) // on le push
      element.classList.toggle('active') // on lui ajoute la classe active pour simuler un bouton enfoncé
      photographers.forEach((photographer) => { // pour chaque photographe
        if (photographer.tags.includes(element.dataset.name)) { // on vérifie si la valeur de l'élément sélectionné est compris dans ses tags
          photographersFilters.push(photographer) // si oui on le push dans le tableau des photographes filtrés
          photographersFilters.forEach((element) => {})
        }
      })
      const setphotographersFilters = new Set(photographersFilters) // on supprime les doublons du tableau
      setphotographersFilters.forEach((photographer) => { // pour chaque photographe du tableau des photographes filtrés
        photographersCards.innerHTML += photographer.render()// on rend à l'écran les vignettes des photographes voulus
      })
    } else {
      tagsDesired.splice(tagsDesired.indexOf(element), 1) // si l'élément li est inclu dans le tableau on le supprime
      element.classList.remove('active') // on lui lève le classe active
    }
    if (tagsDesired.length > 1) {
      tagsDesired[1].classList.add('active') // on ajoute la classe active au nouveau tag sélectionné
      tagsDesired[0].classList.remove('active') // on retire la classe active au tag qu'on ne veut plus
      tagsDesired.splice(tagsDesired[0], 1) // on supprime du tableau le tag qu'on ne veut plus
    }
    if (tagsDesired.length === 0) {
      photographers.forEach(
        (photographer) =>
          (photographersCards.innerHTML += photographer.render()) // si aucun tag n'est sélectionné on affiche tous les photographes
      )
    }
  }

  document.querySelectorAll('.tag>ul>li').forEach((element) => {
    element.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        mediaSorting(element)
      }
    })

    element.addEventListener('click', () => {
      mediaSorting(element)
    })
  })
}

window.onload = function () {
  init()
}
//* ***********************************************apparition du boutton au scroll

const btnScroll = document.querySelector('.mainRedirection')
window.addEventListener('scroll', (e) => {
  if (window.scrollY >= 220) {
    btnScroll.classList.add('mainRedirectionVisible')
  } else {
    btnScroll.classList.remove('mainRedirectionVisible')
  }
})
