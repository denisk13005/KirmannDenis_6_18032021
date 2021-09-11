
export function open (photographe) {
  const modale = `
  <form method="GET" class="formulaire">
  <h1>Contactez-moi<br />${photographe}</h1>
  <img src="../img/croix.png" alt="fermer la modale de contact" />
  <label for="firstname">Prénom</label>
  <input type="text" name="firstname" id="firstname" />
  <label for="name">Nom</label>
  <input type="text" name="name" id="name" />
  <label for="email">Email</label>
  <input type="email" name="email" id="email" />
  <label for="message">Votre message</label>
  <textarea name="message" id="message"></textarea>
  <input id="submit" type="submit" value="Envoyer" />
</form>
  
  `
  return modale
}
