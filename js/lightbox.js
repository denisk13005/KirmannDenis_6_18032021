export class Lightbox {
  constructor (path, tagline) {
    this.path = e.target.getAttribute('src')
    this.tagline = e.currentTarget.lastElementChild.firstElementChild.innerHTML
  }

  static createThumbnail () {
    if (e.target.nodeName === 'video') {
      return new LightboxVideo(path, tagline).render()
    } else {
      return new LightboxImage(path, tagline).render()
    }
  }
}

class LightboxImage extends Lightbox {
  constructor ({ path, tagline }) {
    super(path, tagline)
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
  constructor ({ title, id, video }) {
    super({ title, id })
    this.video = video
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
