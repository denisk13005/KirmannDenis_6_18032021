
// **********************************************************création de la super classe media
/**
 * @param {string} title titre du media
 * @param {string} description description du media
 * @param {number} likes nombre de like du media
 * @param {number} photographerId identifiant du photographe
 * @param {date} date date du media
 */
class Media {
  constructor ({ title, description, likes, photographerId, date }) {
    this.title = title
    this.description = description
    this.likes = likes
    this.photographerId = photographerId
    this.date = date
  }
}
//* *******************classe Photo avec sa méthode render pour créer une vignette correspondant à la photo */
class Photo extends Media {
  constructor ({ title, description, image, likes, photographerId, date }) {
    super({ title, description, likes, photographerId, date })
    this.image = image
  }

  render () {
    const div = `
    <div class="thumbnail">
          <div class="img__thumbnail" tabindex="0" >           
            <img src="../img/Sample Photos/${this.photographerId}/${this.image}" alt="${this.description}" title="${this.title}"/> 
          </div>
          <div class="thumbnail__description">
            <p tabindex="0" > ${this.title}</p>
            <div tabindex="0" aria-label="ce média comporte ${this.likes} likes" class="like__count">
              <p>${this.likes}</p>
              <img id="heart" src="../img/heart-solid.svg" alt="" />
            </div>  
          </div>  
    </div>       
  
    `
    return div
  }
}

//* ************************création de la classe Video pour créer une vignette vidéo */
class Video extends Media {
  constructor ({ title, description, video, likes, photographerId, date }) {
    super({ title, description, likes, photographerId, date })
    this.video = video
  }

  render () {
    const div = ` 
    <div class="thumbnail">
          <div class="img__thumbnail" tabindex="0">
            <video
              src="../img/Sample Photos/${this.photographerId}/${this.video}"
              type="video/mp4"    
              alt ="${this.description}"
              title="${this.title}"          
            ></video>  
          </div>  
          <div class="thumbnail__description">
            <p>${this.title}</p>
            <div class="like__count">
              <p>${this.likes}</p>
              <img id="heart" src="../img/heart-solid.svg" alt="" " alt="" />
            </div>  
          </div>  
    </div>      
    `
    return div
  }
}

export class MediaFactory {
  /** **************************************factory method */
  static createMedia (element) {
    // eslint-disable-next-line no-prototype-builtins
    if (element.hasOwnProperty('image')) {
      return new Photo(element).render()
    } else {
      return new Video(element).render()
    }
  }
}
