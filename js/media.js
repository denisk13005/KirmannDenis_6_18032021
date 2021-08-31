import { getDataPhotographers } from './utils.js'

class Media {
  constructor({ title, tagline, likes , photographerId}) {
      this.title = title;
      this.tagline = tagline;      
      this.likes = likes;
      this.photographerId = photographerId
  }

}
//* *******************classe Photo avec sa méthode générateImage pour créer une vignette correspondant à la photo */
class Photo extends Media{  
  constructor({ title, tagline, image, likes , photographerId}) {
      super({ title, tagline, likes , photographerId});    
      this.image = image;      
  }

  render() {
    const div = `
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
    return div
  }
}

//* ************************création de la classe Mp4 pour créer une vignette vidéo */
class Mp4 extends Media{
  constructor({ title, tagline, video, likes,photographerId }) {
    super({ title, tagline, likes,photographerId })   
      this.video = video;  
  }

  render() {
   const div = `
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
    return div
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
      const bc = thumb.render()
      sectionThumbnail.innerHTML+= bc
      
    }
  })
  const vid = mediaToRender.filter((el) => {
    return el.video
    
  })
  console.log(vid);
  vid.forEach(element => {
    const videoThumbnail =new Mp4(element)
    const ab = videoThumbnail.render()
    sectionThumbnail.innerHTML+= ab
  });
 

}
getMedia()
