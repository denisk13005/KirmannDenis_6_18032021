/**
 * @param {HTMLElement} media liste des media a afficher
 * @param {HTMLElement} main
 * @param {number} index index de l'élément actuel
 */
export class Lightbox {
  constructor (media, main, index) {
    this.media = media
    this.main = main
    this.index = index
  }

  render () {
    this.media.forEach((element, index) =>
      element.addEventListener('click', (e) => {
        const path = element.children[0].getAttribute('src')
        const tagline = element.children[0].getAttribute('alt')
        const type = element.children[0].localName
        const light = new LightboxMedia(path, tagline, index, type)
        this.main.innerHTML += light.render()
        const croix = document.querySelector('.lightbox__close')
        const lightbox = document.querySelector('.lightbox')
        croix.addEventListener('click', () => {
          this.main.removeChild(lightbox)
        })
      })
    )
  }
}
/**
 *@param {URL} path url du media à afficher
 *@param {string} tagline description du media à afficher
 *@param {number} index index du media à afficher
 *@param {string} type format du média à afficher
 */
export class LightboxMedia {
  constructor (path, tagline, index, type) {
    this.path = path
    this.tagline = tagline
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
              <p>  ${this.tagline}</p>
        </div>

     `

    return vid
  }

  renderImage () {
    const img = `
          <div class="lightbox__container">
             <img src="${this.path}" />
             <p>  ${this.tagline}</p>
          </div>
    `
    return img
  }
}

// class LightboxImage extends LightboxMedia {
//   // render () {
//   //   const div = `
//   //       <div class="lightbox__container">
//   //         <img src="${this.path}" />
//   //         <p>  ${this.tagline}</p>
//   //       </div>
//   //     `
//   //   return div
//   // }
// }

// class LightboxVideo extends LightboxMedia {
//   // render () {
//   //   const div = `<div class="lightbox">
//   //   <button class="lightbox__close"></button>
//   //   <button class="lightbox__next"></button>
//   //   <button class="lightbox__prev"></button>
//   //   <div class="lightbox__container">
//   //   <video
//   //   src="${this.path}"
//   //   type="video/mp4"
//   //   autoplay
//   // ></video>
//   // <p>  ${this.tagline}</p>
//   //   </div>
//   // </div>`
//   //   return div
//   // }
// }

// export class LightboxFactory {
//   static createThumbnail (element) {
//     if (element.children[0].localName === 'video') {
//       return new LightboxVideo(
//         element.children[0].getAttribute('src'),
//         element.children[0].getAttribute('alt')
//       ).render()
//     } else {
//       return new LightboxImage(
//         element.children[0].getAttribute('src'),
//         element.children[0].getAttribute('alt')
//       ).render()
//     }
//   }
// }
