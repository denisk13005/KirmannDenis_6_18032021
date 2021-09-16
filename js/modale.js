
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
    let erreur
    // INJECTION DES ATTRIBUTS EN CAS DE PROBLEME
    function setAtt (value) {
      value.parentElement.setAttribute('data-error', erreur)
      value.parentElement.setAttribute('data-error-visible', 'true')
    }

    // SUPRESSION DES ATTRIBUTS
    function removeAtt (value) {
      value.parentElement.removeAttribute('data-error')
      value.parentElement.removeAttribute('data-error-visible')
    }

    // TEST DE LA LONGUEUR ET DE LA VALIDITÉE DU CHAMP NOM ET PRENOM
    function testFirstAndLast (input) {
      return /^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/.test(input)
    }
    const first = document.getElementById('firstname')

    // FONCTION DE TEST DU PRENOM
    function testFirstName () {
      if (testFirstAndLast(first.value.trim())) {
        removeAtt(first)
        return true
      } else {
        erreur = 'veuillez entrer un prénom de 2 lettres minimum'
        setAtt(first)
        return false
      }
    }

    // FONCTION DE TEST DU NOM
    const last = document.getElementById('name')

    function testLastName () {
      if (testFirstAndLast(last.value.trim())) {
        removeAtt(last)
        return true
      } else {
        erreur = 'veuillez entrer un nom de 2 lettres minimum'
        setAtt(last)
        return false
      }
    }

    // TEST DE LA VALIDITE DE L EMAIL
    function testMail (input) {
      return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.value)
    }

    // FONCTION DE TEST DU MAIL
    const mail = document.getElementById('email')

    function email () {
      if (testMail(mail)) {
        return true
      } else {
        return false
      }
    }

    const textarea = document.getElementById('message')

    function textArea () {
      if (testFirstAndLast(textarea.value.trim())) {
        return true
      } else {
        return false
      }
    }

    // fermeture de la modale au click sur la croix
    const closeModal = document.querySelector('.formulaire>img')
    closeModal.addEventListener('click', () => {
      main.removeChild(form)
    })

    const submit = document.getElementById('submit')
    submit.addEventListener('click', (e) => {
      console.log('click')
      e.preventDefault()
      if (testFirstName() && testLastName() && email() && textArea()) {
        console.log('prénom ' + first.value + ', nom ' + last.value + ', email ' + mail.value + ' , message ' + textarea.value)
        // création de la modale de validation
        const validMsg = `
      
      <p>Votre message a bien été envoyé à <br>${nameOfPhotographerId}</p>
      <img src="../img/croix.png" alt="fermer la modale de validation d'envoi du message" />
      <input id="close__msg" type="submit" value="Fermer" />
      `
        form.innerHTML = validMsg
        const closeMsg = document.getElementById('close__msg')
        const closeMsgCrux = document.querySelector('.formulaire>img')
        console.log(closeMsg)
        closeMsg.addEventListener('click', () => {
          main.removeChild(form)
          e.preventDefault()
        })
        closeMsgCrux.addEventListener('click', () => {
          main.removeChild(form)
        })
      }
    })
  })
}
