class Photographer {
  constructor({name,id, city,country,tags, tagline,price,portrait}){
    this.name = name,
    this.id = id,
    this.city = city,
    this.country = country,
    this.tags = tags,
    this.tagline = tagline,
    this.price = price,
    this.portrait = portrait
  }
  render(){
      let div = `       
        <div class="photographers__thumbnail">
         <a href="./pages/photographers.html">
           <div>
             <img src="./img/Sample Photos/${this.name}/${this.portrait}" alt="photo de ${this.name}" />
           </div>
           <h2>${this.name}</h2>
         </a>
         <div class="photographers__description">
           <h3>${this.city}, ${this.country}</h3>
           <h4>${this.tagline}</h4>
           <p>${this.price}/jour</p>
         </div>
         <ul>
            ${this.tags.map((tag) => `<li>#${tag}`).join("")}
         </ul>
        </div>
          `;
      return div
    }
  hasTag(tag){
    return this.tags.includes(tag)
  }
  
  
}
export {Photographer} ;
