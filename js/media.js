// ***************************************création de la classe qui décriera le photographe sélectionné
/**
 * @param {string} name nom du photographe
 * @param {number} id id du photographe
 * @param {string} city
 * @param {country} country
 * @param {string} tags
 * @param {string} tagline citation
 * @param {string} portrait nom de la photo
 * @param {number} price tarif journalier du photographe
 */
export class PhotographerInfo {
  constructor ({ name, id, city, country, tags, tagline, portrait, price, likesCount }) {
    this.name = name
    this.id = id
    this.city = city
    this.country = country
    this.tags = tags
    this.tagline = tagline
    this.portrait = portrait
    this.price = price
    this.likesCount = likesCount
  }

  render () {
    const div = `
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
          <button class = 'contact'>Contactez-moi</button> 
        </div>
        <div class="photo">
          <img src="../img/Sample Photos/${this.id}/${this.portrait}" alt="" />
        </div> 
        <div class='likeCountResume'>  
          <div class='total__likes'>        
          <p>${this.likesCount}</p>
          <img src='../img/heart-solid-black.svg'/>
          </div>

          <p>${this.price}€/jour</p>
        
        </div>
      
        `

    return div
  }
}

// **********************************************************création de la super classe media
/**
 * @param {string} title titre du media
 * @param {string} description description du media
 * @param {number} likes nombre de like du media
 * @param {number} photographerId
 * @param {date} date date du media
 */
export class Media {
  constructor ({ title, description, likes, photographerId, date }) {
    this.title = title
    this.description = description
    this.likes = likes
    this.photographerId = photographerId
    this.date = date
  }
}
//* *******************classe Photo avec sa méthode render pour créer une vignette correspondant à la photo */
export class Photo extends Media {
  constructor ({ title, description, image, likes, photographerId, date }) {
    super({ title, description, likes, photographerId, date })
    this.image = image
  }

  render () {
    const div = `
    <div class="thumbnail">
          <div class="img__thumbnail">   
    <img src="../img/Sample Photos/${this.photographerId}/${this.image}" alt="${this.title}" />      
          </div>
          <div class="thumbnail__description">
            <p>${this.title}</p>
            <div class="like__count">
              <p>${this.likes}</p>
              <img id="heart" src="../img/heart-solid.svg" alt="" />
            </div>  
          </div>  
    </div>       
  
    `
    return div
  }
}

//* ************************création de la classe Mp4 pour créer une vignette vidéo */
export class Mp4 extends Media {
  constructor ({ title, description, video, likes, photographerId, date }) {
    super({ title, description, likes, photographerId, date })
    this.video = video
  }

  render () {
    const div = ` 
    <div class="thumbnail">
          <div class="img__thumbnail">
            <video
              src="../img/Sample Photos/${this.photographerId}/${this.video}"
              type="video/mp4"    
              alt ="${this.title}"          
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
      return new Mp4(element).render()
    }
  }
}
