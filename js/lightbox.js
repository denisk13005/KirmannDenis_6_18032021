export class Lightbox {
  constructor ({ title, id }) {
    this.title = title
    this.is = id
  }

  static createThumbnail (e) {
    if (e.target.nodeName === 'video') {
      return new LightboxVideo().render()
    } else {
      return new LightboxImage().render()
    }
  }
}
class LightboxImage extends Lightbox {
  constructor ({ title, id, image }) {
    super({ title, id })
    this.image = image
  }

  render () {
    const div = `<div class="lightbox">
        <button class="lightbox__close"></button>
        <button class="lightbox__next"></button>
        <button class="lightbox__prev"></button>
        <div class="lightbox__container">
          <img src="${e.currentTarget.firstElementChild.firstElementChild.src}" />
          <p>  ${e.currentTarget.lastElementChild.firstElementChild.innerHTML}</p>
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
    src="${e.currentTarget.firstElementChild.firstElementChild.src}"
    type="video/mp4"
    autoplay
  ></video>
  <p>  ${e.currentTarget.lastElementChild.firstElementChild.innerHTML}</p>
    </div>
  </div>`
    return div
  }
}
