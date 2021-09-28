class Photographer {
  constructor ({ name, id, city, country, tags, tagline, price, portrait }) {
    // eslint-disable-next-line no-unused-expressions
    this.name = name
    this.id = id
    this.city = city
    this.country = country
    this.tags = tags
    this.tagline = tagline
    this.price = price
    this.portrait = portrait
  }

  render () {
    const div = `       
        <div class="photographers__thumbnail">
         <a href="./pages/photographers.html?${this.id}" >
           <div>
             <img src="./img/Sample Photos/${this.id}/${
      this.portrait
    }" alt="photo de ${this.name}" /></div>
           <h2>${this.name}</h2>
         </a>
         <div class="photographers__description">
           <h3>${this.city}, ${this.country}</h3>
           <h4>${this.tagline}</h4>
           <p>${this.price}€/jour</p>
         </div>
         <ul>
            ${this.tags.map((tag) => `<li  data-name = ${tag}>#${tag}`).join('')}
         </ul>
        </div>
          `
    return div
  }
}
export { Photographer }
