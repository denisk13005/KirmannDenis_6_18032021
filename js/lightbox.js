/**
 * @param {HTMLElement} media liste des media a afficher
 * @param {HTMLElement} main
 * @param {number} index index de l'élément actuel
 */
export class Lightbox {
  constructor (media, main) {
    this.media = media
    this.main = main
  }

  clickIndex (index) {
    if (index >= this.media.length || index < 0) {
      index = 0
    }
    const element = this.media[index]
    console.log(element)
    this.currentIndex = index
    this.render(element)
  }

  clickNext () {
    this.currentIndex += 1
    this.clickIndex(this.currentIndex)
  }

  clickPrev () {
    this.currentIndex -= 1
    this.clickIndex(this.currentIndex)
  }

  start () {
    this.media.forEach((element, index) =>
      element.addEventListener('click', (e) => {
        const lightbox = document.createElement('div')
        lightbox.classList.add('lightbox')
        const div = `
      
        <button class="lightbox__close"></button>
        <button class="lightbox__next"></button>
        <button class="lightbox__prev"></button>
        <div class="lightbox__container">
        
        </div>
     
     
    `
        this.main.appendChild(lightbox)
        lightbox.innerHTML = div
        this.clickIndex(index)
      })

    )
  }

  render (element) {
    const container = document.querySelector('.lightbox__container')
    const path = element.children[0].getAttribute('src')
    const title = element.children[0].getAttribute('alt')
    const type = element.children[0].localName
    const icone = new LightboxMedia(path, title, this.currentIndex, type)
    container.innerHTML += icone.render()
    // fermeture de la lightbox
    const closeIcone = document.querySelector('.lightbox__close')
    closeIcone.addEventListener('click', () => {
      const light = document.querySelector('.lightbox')
      this.main.removeChild(light)
    })
    // changement de média
    const arrowNext = document.querySelector('.lightbox__next')
    console.log(arrowNext)
    arrowNext.addEventListener('click', () => {
      this.clickIndex(element)
    })
    const arrowPrev = document.querySelector('.lightbox__prev')
    arrowPrev.addEventListener('click', this.clickPrev)
    console.log(arrowNext)
  }
}

/**
 *@param {URL} path url du media à afficher
 *@param {string} title description du media à afficher
 *@param {number} index index du media à afficher
 *@param {string} type format du média à afficher
 */
export class LightboxMedia {
  constructor (path, title, index, type) {
    this.path = path
    this.title = title
    this.index = index
    this.type = type
  }

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
