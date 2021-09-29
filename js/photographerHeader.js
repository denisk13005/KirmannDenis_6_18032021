// ***************************************création de la classe qui décriera le photographe sélectionné
/**
 * @param {string} name nom du photographe
 * @param {number} id id du photographe
 * @param {string} city
 * @param {country} country
 * @param {string} tags
 * @param {string} tagline citation
 * @param {string} portrait nom de la photo
 * @param {number} price tarif journalier du photographe
 */
export class PhotographerInfo {
  constructor ({ name, id, city, country, tags, tagline, portrait, price }) {
    this.name = name
    this.id = id
    this.city = city
    this.country = country
    this.tags = tags
    this.tagline = tagline
    this.portrait = portrait
    this.price = price
  }

  render () {
    const div = `
        <div class ='infoAndButton'>
          <div class="photographer__informations">
            <h1>${this.name}</h1>
            <h2>${this.city},${this.country}</h2>
            <h3>${this.tagline}</h3>
            <nav>
              <ul>
              ${this.tags.map((tag) => `<li tabindex="0" aria-label="${tag}" class='li'>#${tag}`).join('')}
              </ul>
            </nav>
          </div> 
          <button class = 'contact'>Contactez-moi</button> 
        </div>
        <div class="photo">
          <img src="../img/Sample Photos/${this.id}/${this.portrait}" alt="" />
        </div> 
        
      
        `

    return div
  }
}
