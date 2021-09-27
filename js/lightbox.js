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
    main.removeAttribute('aria-hiden')
    header.removeAttribute('aria-hiden')
  }

  start () {
    this.media.forEach((element, index) =>
      element.addEventListener('click', (e) => {
        const lightbox = document.createElement('section')
        lightbox.classList.add('lightbox')
        const lightboxContainer = `      
        <button class="lightbox__prev">
          <img src="../img/fleche.jpg" alt="">                   
        </button>
        <div class="lightbox__container">

        </div>   
        <div class='right'>  
          <button class="lightbox__close">
            <img src= "../img/croix.jpg"
          </button>
          <button class="lightbox__next">
            <img src="../img/fleche.jpg" alt="">            
          </button>
        </div>

      `
        this.body.appendChild(lightbox)
        lightbox.innerHTML = lightboxContainer
        this.clickIndex(index)
        // ajout des attributs aria-hiden
        main.setAttribute('aria-hiden', 'true')
        header.setAttribute('aria-hiden', 'true')
        console.log(typeof likeCountResume)

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
    const icone = new LightboxMedia(path, title, type)
    container.innerHTML = icone.render()
  }
}

/**
 *@param {URL} path url du media à afficher
 *@param {string} title description du media à afficher
 *@param {string} type format du média à afficher
 */
export class LightboxMedia {
  constructor (path, title, type) {
    this.path = path
    this.title = title
    this.type = type
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
                src="${this.path}"
                type="video/mp4"
                controls="controls"
                autoplay
              ></video>     
              <p>  ${this.title}</p>
       

     `

    return vid
  }

  renderImage () {
    const img = `
          
             <img src="${this.path}" />
             <p>  ${this.title}</p>
         
    `
    return img
  }
}
