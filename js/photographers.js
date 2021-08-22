import { getDataPhotographers } from './utils.js'

const data = await getDataPhotographers('../index.json')
let media = []
data.media.forEach((element) => {
  media.push(element)
})
console.log(data)
// toggle de la classe rotate au click sur la flèche
const arrow = document.querySelector('.arrow')
arrow.addEventListener('click', () => {
  arrow.classList.toggle('rotate')
})
const section = document.querySelector('.container__thumbnail')
media.forEach((element) => {
  if (element.photographerId === 82) {
    // console.log(element);
    const thumbnailDiv = `
    <div class="thumbnail">
        <div class="img__thumbnail">
        <a href="#">
          <img src="../img/Sample Photos/Tracy Galindo/${element.image}" alt="" />
        </a>
        </div>
        <div class="thumbnail__description">
          <p>${element.title}</p>
          <div class="like__count">
            <p>${element.likes}</p> 
            <img src="../img/heart-solid.svg" alt="" />
          </div>
        </div>
    </div>`
    section.innerHTML += thumbnailDiv
  }
})

const likeCountResume = `
<div class="likeCountResume">
  <div class="total__likes">
    <p>297081</p>
    <img src="../img/heart-solid-black.svg"/>
  </div>
  <p>${media[0].price}</p>
</div>

`
// const main = document.querySelector('.main')
section.innerHTML += likeCountResume
