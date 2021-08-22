class Photographer {
  constructor({ name, id, city, country, tags, tagline, price, portrait }) {
    // eslint-disable-next-line no-unused-expressions
    ;(this.name = name),
      (this.id = id),
      (this.city = city),
      (this.country = country),
      (this.tags = tags),
      (this.tagline = tagline),
      (this.price = price),
      (this.portrait = portrait)
  }

  // eslint-disable-next-line space-before-blocks
  render() {
    const div = `       
        <div class="photographers__thumbnail">
         <a href="../pages/photographers.html">
           <div>
             <img src="./img/Sample Photos/${this.name}/${
      this.portrait
    }" alt="photo de ${this.name}" />
           </div>
           <h2>${this.name}</h2>
         </a>
         <div class="photographers__description">
           <h3>${this.city}, ${this.country}</h3>
           <h4>${this.tagline}</h4>
           <p>${this.price}€/jour</p>
         </div>
         <ul>
            ${this.tags.map((tag) => `<li>#${tag}`).join('')}
         </ul>
        </div>
          `
    return div
  }

  // hasTag(tag) {
  //   return this.tags.includes(tag) //on va essayer autrement
  // }
}
export { Photographer }
// const photo = [
//   {
//     name: 'dk',
//     tags: ['portrait', 'sport'],
//   },
//   {
//     name: 'jb',
//     tags: ['loisirs', 'sport'],
//   },
// ]
// const photographer = []
// photo.forEach((element) => {
//   if (element.tags.includes('loisirs')) {
//     console.log(element.name)
//   }
//   console.log(element.tags.includes('loisirs'))
//   photographer.push(new Photographer(element))
// })
// const test = new Photographer(photo)
// console.log(photo)
// console.log(photographer)
