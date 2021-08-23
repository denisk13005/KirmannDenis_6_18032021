import { getDataPhotographers } from './utils.js'
// import { photographerToExport } from './index.js'

const data = await getDataPhotographers('../index.json')
let media = []
let photographers = []
data.media.forEach((element) => {
  media.push(element)
})
data.photographers.forEach((element) => {
  photographers.push(element)
})
console.log(photographers[0])
console.log(media)
//****************************************************génération dynamique de la partie description du photographe */

const sectionInfo = document.querySelector('.photographer__description')

function createAPhotographer({name,id,city,country,tagline,tags,portrait}){
  return {
      name ,
      id,
      city, 
      country,
      tagline,
      tags,  
      portrait,  
      generateInfo
  }
  function generateInfo() {
    sectionInfo.innerHTML = `
    <div class ='infoAndButton'>
      <div class="photographer__informations">
        <h1>${name}</h1>
        <h2>${city},${country}</h2>
        <h3>${tagline}</h3>
        <nav>
          <ul>
          ${tags.map((tag) => `<li>#${tag}`).join('')}
          </ul>
        </nav>
      </div> 
      <button>Contactez-moi</button> 
    </div>
    <div class="photo">
      <img src="../img/Sample Photos/${name}/${portrait}" alt="" />
    </div> 
  
    `    
  } 
}
const photo0 = createAPhotographer(photographers[1])
photo0.generateInfo()
console.log(photo0);


