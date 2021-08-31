import { getDataPhotographers } from './utils.js'

//* *******************classe Photo avec sa méthode générateImage pour créer une vignette correspondant à la photo */
class Photo {
  constructor({ title, tagline, image, likes , photographerId}) {
      // eslint-disable-next-line no-unused-expressions
      (this.title = title),
      (this.tagline = tagline),
      (this.image = image),
      (this.likes = likes),
      this.photographerId = photographerId
  }

  generateImage() {
    sectionThumbnail.innerHTML += `
    <div class="thumbnail">
          <div class="img__thumbnail">   
    <img src="../img/Sample Photos/${this.photographerId}/${this.image}" alt="" />
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

//* ************************création de la classe Mp4 pour créer une vignette vidéo */
class Mp4 {
  constructor({ title, tagline, video, likes,photographerId }) {
    // eslint-disable-next-line no-unused-expressions
    ;(this.title = title),
      (this.tagline = tagline),
      (this.video = video),
      (this.likes = likes),
      this.photographerId = photographerId
  }

  generateMp4() {
    sectionThumbnail.innerHTML += `
    <div class="thumbnail">
          <div class="img__thumbnail">
            <video
              src="../img/Sample Photos/${this.photographerId}/${this.video}"
              type="video/mp4"
            ></video>
          </div>
          <div class="thumbnail__description">
            <p>${this.title}</p>
            <div class="like__count">
              <p>${this.likes}</p>
              <img src="../img/heart-solid.svg" alt="" " alt="" />
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
  const position = window.location.href.indexOf('?')
  const idphoto = window.location.href.substr(position + 1)
  const media = data.media
  const photographer = data.photographers
  photographer.forEach(element=>{    
    if(element.id === parseInt(idphoto)){
      console.log(element);
    }
  })
  
  media.forEach((element) => {
    if (element.photographerId === parseInt(idphoto)) {
      mediaToRender.push(element)
    }
  })

  mediaToRender.forEach((element) => {
    // eslint-disable-next-line no-prototype-builtins
    if (element.hasOwnProperty('image')) {
      const thumb = new Photo(element)
      thumb.generateImage()
    }
  })
  const vid = mediaToRender.filter((el) => {
    return el.video
    
  })
  console.log(vid);
  vid.forEach(element => {
    const videoThumbnail =new Mp4(element)
 videoThumbnail.generateMp4()
  });
 

}
getMedia()
