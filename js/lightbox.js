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

  render () {
    this.media.forEach((element, index) =>
      element.addEventListener('click', (e) => {
        const path = element.children[0].getAttribute('src')
        const title = element.children[0].getAttribute('alt')
        const type = element.children[0].localName
        const light = new LightboxMedia(path, title, index, type)
        this.main.innerHTML += light.render()
      })
    )
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
    <div class="lightbox">
        <button class="lightbox__close"></button>
        <button class="lightbox__next"></button>
        <button class="lightbox__prev"></button>
        ${children}
    </div>
    `
    return div
  }

  renderVideo () {
    const vid = `
   
     <div class="lightbox__container">
           <video
                src="${this.path}"
                type="video/mp4"
                    autoplay
              ></video>     
              <p>  ${this.title}</p>
        </div>

     `

    return vid
  }

  renderImage () {
    const img = `
          <div class="lightbox__container">
             <img src="${this.path}" />
             <p>  ${this.title}</p>
          </div>
    `
    return img
  }
}
