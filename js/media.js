// ***************************************création de la classe qui décriera le photographe sélectionné
export class PhotographerInfo {
  constructor ({ name, id, city, country, tags, tagline, portrait, price }) {
    this.name = name
    this.id = id
    this.city = city
    this.country = country
    this.tags = tags
    this.tagline = tagline
    this.portrait = portrait
    this.price = price
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
          <button>Contactez-moi</button> 
        </div>
        <div class="photo">
          <img src="../img/Sample Photos/${this.id}/${this.portrait}" alt="" />
        </div> 
        <div class='likeCountResume'>  
          <div class='total__likes'>        
          <p>compte des likes</p>
          <img src='../img/heart-solid-black.svg'/>
          </div>

          <p>${this.price}€/jour</p>
        
        </div>
      
        `
    return div
  }
}

// **********************************************************création de la super classe media
export class Media {
  constructor ({ title, tagline, likes, photographerId }) {
    this.title = title
    this.tagline = tagline
    this.likes = likes
    this.photographerId = photographerId
  }
}
//* *******************classe Photo avec sa méthode render pour créer une vignette correspondant à la photo */
export class Photo extends Media {
  constructor ({ title, tagline, image, likes, photographerId }) {
    super({ title, tagline, likes, photographerId })
    this.image = image
  }

  render () {
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
export class Mp4 extends Media {
  constructor ({ title, tagline, video, likes, photographerId }) {
    super({ title, tagline, likes, photographerId })
    this.video = video
  }

  render () {
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
