export class Lightbox {
  constructor (media, main) {
    this.media = media
    this.main = main
  }

  render () {
    this.media.forEach((element) =>
      element.addEventListener('click', (e) => {
        console.log(e)
        const light = LightboxFactory.createThumbnail(e)
        this.main.innerHTML += light
        document.querySelector('.lightbox__close').addEventListener('click', () => {
          window.location.reload()
        })
      })
    )
  }

  next () {

  }
}
export class LightboxMedia {
  constructor (path, tagline, index) {
    this.path = path
    this.tagline = tagline
    this.index = index
  }
}

class LightboxImage extends LightboxMedia {
  render () {
    const div = `<div class="lightbox">
        <button class="lightbox__close"></button>
        <button class="lightbox__next"></button>
        <button class="lightbox__prev"></button>
        <div class="lightbox__container">
          <img src="${this.path}" />
          <p>  ${this.tagline}</p>
        </div>
      </div>

      `
    return div
  }
}

class LightboxVideo extends LightboxMedia {
  render () {
    const div = `<div class="lightbox">
    <button class="lightbox__close"></button>
    <button class="lightbox__next"></button>
    <button class="lightbox__prev"></button>
    <div class="lightbox__container">
    <video
    src="${this.path}"
    type="video/mp4"
    autoplay
  ></video>
  <p>  ${this.tagline}</p>
    </div>
  </div>`
    return div
  }
}

export class LightboxFactory {
  static createThumbnail (e) {
    if (e.target.localName === 'video') {
      return new LightboxVideo(e.target.getAttribute('src'), e.target.getAttribute('alt')).render()
    } else {
      return new LightboxImage(e.target.getAttribute('src'), e.target.getAttribute('alt')).render()
    }
  }
}
