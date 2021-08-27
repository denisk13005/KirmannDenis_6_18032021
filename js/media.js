import { getDataPhotographers } from './utils.js'


class Photo {
  constructor({ title, tagline, image, likes }) {
    ;(this.title = title),
      (this.tagline = tagline),
      (this.image = image),
      (this.likes = likes)
  }

  generateImage() {
    sectionThumbnail.innerHTML += `
    <div class="thumbnail">
          <div class="img__thumbnail">
            <img src="../img/Sample Photos/Tracy Galindo/${this.image}" alt="" />
          </div>
          <div class="thumbnail__description">
            <p>${this.title}</p>
            <div class="like__count">
              <p>${this.likes}</p>
              <img src="../img/heart-solid.svg" alt="" />
            </div>
          </div>
    </div> 
  
    `
  }
}

class Mp4 {
  constructor({ media }) {
    ;(this.title = title),
      (this.tagline = tagline),
      (this.video = video),
      (this.likes = likes)
  }

  generateMp4() {
    sectionThumbnail.innerHTML += `
    <div class="thumbnail">
          <div class="img__thumbnail">
            <video
              src="../img/Sample Photos/Tracy Galindo/Art_Wooden_Horse_Sculpture.mp4"
              type="video/mp4"
            ></video>
          </div>
          <div class="thumbnail__description">
            <p></p>
            <div class="like__count">
              <p></p>
              <img src="" alt="" />
            </div>
          </div>
    </div>
    `
  }
}

const sectionThumbnail = document.querySelector('.container__thumbnail')
const mediaToRender = []
async function getMedia() {
  const data = await getDataPhotographers('../index.json')
  const media = data.media
  // console.log(data)
  // const photographer = data.photographers[0].name
  // console.log(photographer)
  media.forEach((element) => {
    if (element.photographerId === 82) {
      mediaToRender.push(element)
    }
  })
  mediaToRender.forEach((element) => {
    // eslint-disable-next-line no-prototype-builtins
    if (element.hasOwnProperty('image')) {
      const thumb = new Photo(element)
      thumb.generateImage()
    }
    mediaToRender.forEach((element) => {
      if (element.hasOwnProperty('video')) {
        // console.log(element)
      }
    })
  })
}
getMedia()
// console.log(mediaToRender)
// const position = window.location.href.indexOf('?')
// const idphoto = window.location.href.substr(position + 1)
// photographers.forEach((element) => {
//   if (element.id == idphoto) {
//     console.log(element)
//     const photo0 = createAPhotographer(element)
//     photo0.generateInfo()

//   }
// })
// console.log(idphoto);