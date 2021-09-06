export class Lightbox {
  constructor ({ path, tagline, type }) {
    this.path = path
    // this.tagline = this.e.currentTarget.lastElementChild.firstElementChild.innerHTML
    this.tagline = tagline
    this.type = type
  }

  static createThumbnail (e) {
    if (this.type === 'video') {
      return new LightboxVideo(e).render()
    } else {
      return new LightboxImage(e).render()
    }
  }
}

class LightboxImage extends Lightbox {
  constructor ({ path, tagline, type }) {
    super({ path, tagline, type })
  }

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
  constructor ({ path, tagline, type }) {
    super({ path, tagline, type })
  }

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
