export class Lightbox {
  constructor (path, tagline) {
    this.path = path
    // this.tagline = this.e.currentTarget.lastElementChild.firstElementChild.innerHTML
    this.tagline = tagline
  }

  static createThumbnail (e) {
    if (e.target.localName === 'video') {
      return new LightboxVideo(e.target.getAttribute('src'), e.target.getAttribute('alt')).render()
    } else {
      return new LightboxImage(e.target.getAttribute('src'), e.target.getAttribute('alt')).render()
    }
  }
}

class LightboxImage extends Lightbox {
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

class LightboxVideo extends Lightbox {
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
