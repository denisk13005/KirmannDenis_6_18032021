// class Photographer {
//   constructor(name,id, city,country,tags, tagline,price,portrait){
//     this.name = name,
//     this.id = id,
//     this.city = city,
//     this.country = country,
//     this.tags = tags,
//     this.tagline = tagline,
//     this.price = price,
//     this.portrait = portrait
//   }
//   render(){    
//       console.log(this.name);
    
//   }
// }
// let photo = new Photographer("mimi")
// console.log(photo)

const person = {
  name: 'Wes',
  job: 'Web Developer',
  city: 'Hamilton',
  bio: 'Wes is a really cool guy that loves to teach web development!'
}

// And then create our markup:
const markup = `
<div class="person">
  <h2>
      ${person.name}
  </h2>
  <p class="location">${person.city}</p>
  <p class="bio">${person.bio}</p>
</div>
`;
console.log(markup)