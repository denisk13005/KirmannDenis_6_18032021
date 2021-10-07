/**
 * @param {HTMLElement} media liste des media a afficher
 * @param {HTMLElement} body
 * @param {number} index index de l'élément actuel
 */
const main = document.querySelector('main')
const header = document.querySelector('header')

export class Lightbox {
  constructor (media, body) {
    this.media = media
    this.body = body
    document.addEventListener('keyup', this.onKeyUp.bind(this))
  }

  clickIndex (index) {
    if (index >= this.media.length) {
      index = 0
    } else if (index < 0) {
      index = this.media.length - 1
    }
    const element = this.media[index]
    this.currentIndex = index
    this.render(element)
  }

  onKeyUp (e) {
    if (e.key === 'Escape') {
      this.close()
    }
    if (e.key === 'ArrowRight') {
      this.clickNext()
    }
    if (e.key === 'ArrowLeft') {
      this.clickPrev()
    }
  }

  clickNext () {
    this.currentIndex += 1
    this.clickIndex(this.currentIndex)
  }

  clickPrev () {
    this.currentIndex -= 1
    this.clickIndex(this.currentIndex)
  }

  close () {
    const light = document.querySelector('.lightbox')
    this.body.removeChild(light)
    // supression des attributes aria hiden
    main.removeAttribute('aria-hidden')
    header.removeAttribute('aria-hidden')
  }

  start () {
    this.media.forEach((element, index) =>
      element.addEventListener('click', (e) => {
        const lightbox = document.createElement('section')
        lightbox.classList.add('lightbox')
        const lightboxContainer = `      
        <button class="lightbox__prev" aria-label="média précédent" tabindex="3">
          <img src="../img/fleche.jpg" >                   
        </button>
        <div class="lightbox__container" >

        </div>   
        <div class='right'>  
          <button class="lightbox__close" aria-label="fermez la lightbox" tabindex="4">
            <img src= "../img/croix.jpg"
          </button>
          <button class="lightbox__next" aria-label="média suivant" tabindex="2">
            <img src="../img/fleche.jpg" alt="">            
          </button>
        </div>

      `
        this.body.appendChild(lightbox)
        lightbox.innerHTML = lightboxContainer
        this.clickIndex(index)
        // ajout des attributs aria-hiden
        main.setAttribute('aria-hidden', 'true')
        header.setAttribute('aria-hidden', 'true')

        // fermeture de la lightbox
        const closeIcone = document.querySelector('.lightbox__close')
        closeIcone.addEventListener('click', () => {
          this.close()
        })
        // changement de média

        const arrowNext = document.querySelector('.lightbox__next')
        arrowNext.addEventListener('click', this.clickNext.bind(this))
        const arrowPrev = document.querySelector('.lightbox__prev')
        arrowPrev.addEventListener('click', this.clickPrev.bind(this))
      })

    )
  }

  /**
   *
   * @param {HTLMElement} element media sélectionné
   */
  render (element) {
    const container = document.querySelector('.lightbox__container')
    const path = element.children[0].getAttribute('src')
    const title = element.children[0].getAttribute('title')
    const type = element.children[0].localName
    const alt = element.children[0].getAttribute('alt')
    const contain = new LightboxMedia(path, title, type, alt)
    container.innerHTML = contain.render()
    const img = document.getElementById('img')
    if (img) {
      img.focus()
    } else if (document.getElementById('video')) {
      document.querySelector('.lightbox__container>p').focus()
    }
  }
}

/**
 *@param {URL} path url du media à afficher
 *@param {string} title description du media à afficher
 *@param {string} type format du média à afficher
 @param {string} alt description de la photo
 */
export class LightboxMedia {
  constructor (path, title, type, alt) {
    this.path = path
    this.title = title
    this.type = type
    this.alt = alt
  }

  // ***factory qui renvoie la bonne balise html en fonction du type de média
  render () {
    const children = this.type === 'video' ? this.renderVideo() : this.renderImage()

    const div = `
     
        ${children}
      
    `
    return div
  }

  renderVideo () {
    const vid = `     
      <video
        id="video"
        src="${this.path}"
        type="video/mp4"
        controls="controls"
        autoplay
      ></video>     
      <p tabindex="1">  ${this.title}</p>
     `

    return vid
  }

  renderImage () {
    const img = `
          
             <img id='img' src="${this.path}" alt="${this.alt}"  tabindex="1"/>
             <p>  ${this.title}</p>
         
    `
    return img
  }
}
