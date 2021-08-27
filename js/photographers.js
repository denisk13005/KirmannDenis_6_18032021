import { getDataPhotographers } from './utils.js'

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

// function createAPhotographer({
//   name,
//   id,
//   city,
//   country,
//   tagline,
//   tags,
//   portrait
// }) {
//   return {
//     name,
//     id,
//     city,
//     country,
//     tagline,
//     tags,
//     portrait,
//     generateInfo
//   }
//   function generateInfo() {
//     sectionInfo.innerHTML = `
//     <div class ='infoAndButton'>
//       <div class="photographer__informations">
//         <h1>${name}</h1>
//         <h2>${city},${country}</h2>
//         <h3>${tagline}</h3>
//         <nav>
//           <ul>
//           ${tags.map((tag) => `<li>#${tag}`).join('')}
//           </ul>
//         </nav>
//       </div>
//       <button>Contactez-moi</button>
//     </div>
//     <div class="photo">
//       <img src="../img/Sample Photos/${name}/${portrait}" alt="" />
//     </div>

//     `
//   }
// }
class PhotographerInfo {
  constructor({ name, id, city, country, tags, tagline, portrait }) {
    ;(this.name = name),
      (this.id = id),
      (this.city = city),
      (this.country = country),
      (this.tags = tags),
      (this.tagline = tagline),
      (this.portrait = portrait)
  }
  generateInfo() {
    sectionInfo.innerHTML = `
        <div class ='infoAndButton'>
          <div class="photographer__informations">
            <h1>${this.name}</h1>
            <h2>${this.city},${this.country}</h2>
            <h3>${this.tagline}</h3>
            <nav>
              <ul>
              ${this.tags.map((tag) => `<li>#${tag}`).join('')}
              </ul>
            </nav>
          </div> 
          <button>Contactez-moi</button> 
        </div>
        <div class="photo">
          <img src="../img/Sample Photos/${this.name}/${
      this.portrait
    }" alt="" />
        </div> 
      
        `
  }
}
let position = window.location.href.indexOf('?')
let idphoto = window.location.href.substr(position + 1)
photographers.forEach((element) => {
  if (element.id == idphoto) {
    const photographerInfos = new PhotographerInfo(element)
    photographerInfos.generateInfo()
  }
})
