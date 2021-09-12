
export function contactPhotographer (nameOfPhotographerId) {
  const contact = document.querySelector('.contact')
  const main = document.querySelector('.main')
  const form = document.createElement('form')
  form.classList.add('formulaire')
  contact.addEventListener('click', () => {
    const modale = `    
    <h1>Contactez-moi<br />${nameOfPhotographerId}</h1>
    <img src="../img/croix.png" alt="fermer la modale de contact" />
    <label for="firstname">Prénom</label>
    <input type="text" name="firstname" id="firstname" required/>
    <span class = "firstname"></span>
    <label for="name">Nom</label>
    <input type="text" name="name" id="name" required/>
    <span class = "name"></span>     
    <label for="email">Email</label>
    <input type="email" name="email" id="email" required/>
    <span class = "email"></span>     
    <label for="message">Votre message</label>
    <textarea name="message" id="message" required></textarea>
    <span class = "message"></span>     
    <input id="submit" type="submit" value="Envoyer" />    
    `
    form.innerHTML = modale
    main.appendChild(form)
    // fermeture de la modale au click sur la croix
    const closeModal = document.querySelector('.formulaire>img')
    closeModal.addEventListener('click', () => {
      main.removeChild(form)
    })
    const submitButton = document.getElementById('submit')
    submitButton.addEventListener('click', (e) => {
      e.preventDefault()
    })
  })
}
