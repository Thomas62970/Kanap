// je récupère mon panier
let panier = JSON.parse(localStorage.getItem("produitChoisi"));

//je créer une variable qui va contenir les infos des produits dans le panier
let produits = [];

//j'initialise les variables total prix et quantité sur 0
let total = 0;
let totalQ = 0;

//je récupère les id pour renseigner le prix et la quantité
let prixTotal = document.getElementById("totalPrice");
let quantiteTotal = document.getElementById("totalQuantity");

//je récupère les produits dans le panier

//si mon panier est vide j'affiche "0" en prix et quantité et j'indique que le panier est vide
let produitChoisi = () => {
    if (panier == null || panier == 0) {
        document.getElementById("totalQuantity").innerText = 0;
        document.getElementById("totalPrice").innerText = 0;
        document.getElementById("cart__items").innerHTML +=
            `<h2 style="text-align:center; margin-bottom:80px;">Votre panier est vide</h2>`
    }

//si le panier n'est pas vide alors je récupère les infos produit ainsi que le panier
    else {
        for(const [i, produit] of panier.entries()){
            async function produitApi(){
                await fetch(`http://localhost:3000/api/products/` + produit.id)
                .then((res) => res.json())
                .then((data) => InfoProduct(data));
            }

//pour chaque produits présents dans le panier je renseigne ces information
            const InfoProduct = (product) => { 
              let produitPanier = document.getElementById("cart__items");
                    produitPanier.innerHTML +=
                    `<article class="cart__item" data-id=${produit.id} data-color=${produit.couleur}>
                    <div class="cart__item__img">
                      <img src=${product.imageUrl} alt = ${product.altTxt}>
                    </div>
                    <div class="cart__item__content">
                      <div class="cart__item__content__description">
                        <h2>${product.name}</h2>
                        <p>${produit.couleur}</p>
                        <p>${product.price}€</p>
                      </div>
                      <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                          <p>Qté : ${produit.quantite}</p>
                          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="0">
                        </div>
                        <div class="cart__item__content__settings__delete">
                          <p class="deleteItem">Supprimer</p>
                        </div>
                      </div>
                    </div>
                  </article>`
//j'appelle mes fonction de modification de quantité ou de suppression de produit
                  newQ();
                  supprimerProduit();

//je calcul le prix total et la quantité via les infos récupérer
              let prix = product.price * produit.quantite
              total+= prix
              let quantite = Number(produit.quantite);
              totalQ += quantite
              console.log(totalQ);

//je remplace le prix et la quantité par le résultat
              prixTotal.innerHTML = total;
              quantiteTotal.innerHTML = totalQ;
            }

//j'appelle ma fonction produitApi
            produitApi();
        }
    }
}

//j'appelle ma fonction produitChoisi
produitChoisi();

//je créer ma fonction pour modifier ma quantité
function newQ(){
//je récupère dans une variable l'input
let quantiteItem = document.querySelectorAll(".itemQuantity");

//je recherche et créer des variables pour récupérer les infos par article
  quantiteItem.forEach((tag) => {
  let article = tag.closest("article");
  let id = article.dataset.id;
  let couleur = article.dataset.color;
  let nouvelleQ = "";
//j'écoute input qui permet de modifier la quantité
  tag.addEventListener("change", event => {
    event.preventDefault();
//je récupère la nouvelle quantité
    nouvelleQ = Number(tag.value);
//je créer une boucle qui vérifie que la couleur et l'id sont identique au produits que je souhaite modifier
    for (let i = 0; i < panier.length; i++) {
      if (panier[i].id == id && panier[i].couleur == couleur) {
//si le produit correspond alors je modifie la quantité
          panier[i].quantite = nouvelleQ;
      }
    }
//je modifie mon local storage pour avoir ma nouvelle quantité
    localStorage.setItem("produitChoisi", JSON.stringify(panier));
  })
  }
)}

//je créer ma fonction pour supprimer un produit
function supprimerProduit (){
//je récupère dans une variable le bouton
  let btnsupp = document.querySelectorAll(".deleteItem");
//je recherche et créer des variables pour récupérer les infos par article
  btnsupp.forEach((item) => {
    item.addEventListener("click", () => {
      let cart = item.closest("article");
      let idsupp = cart.dataset.id;
      let couleur = cart.dataset.color;
//je filtre mes éléments pour garder que ceux qui ne correspondes pas au produits supprimé
     panier = panier.filter((element) => element.id !== idsupp || element.couleur !== couleur);
//je modifie mon local storage aprés avoir retiré le produit
      localStorage.setItem("produitChoisi", JSON.stringify(panier));
//je retire le produit de la page panier
      cart.remove();
//j'alert que le produit va être supprimé
      alert("Ce produit va être supprimé de votre panier");
//je recharge ma page pour afficher le panier mis a jour
      location.reload();
    });
  });
}

//je créer la variable contact
let contact = {
  firstName : "",
  lastName : "",
  address : "",
  city : "",
  email : "",
}

//je créer la variable product 
let products =[];

//je créer les variables qui seront utiles pour le formulaire
let firstName = document.getElementById("firstName");
let firstNameErreur = document.getElementById("firstNameErrorMsg");
let validFirstName = false;
let lastName = document.getElementById("lastName");
let lastNameErreur = document.getElementById("lastNameErrorMsg");
let validLastName = false;
let address = document.getElementById("address");
let addressErreur = document.getElementById("addressErrorMsg");
let validAddress = false;
let city = document.getElementById("city");
let cityErreur = document.getElementById("cityErrorMsg");
let validCity = false
let email = document.getElementById("email");
let emailErreur = document.getElementById("emailErrorMsg");
let validEmail = false;
let validation = document.getElementById("order");

//je créer les regex qui vont être utilisés
let regPrenomNom = /^[a-zA-Zéèàïêç\s\-]{2,21}$/;
let regAddress = /^[0-9]{0,10}[a-zA-Zéèàïêç\s\-]{2,30}$/;
let regCity = /^[a-zA-Zéèàïêç\s\-]{2,30}$/;
let regEmail = /^[a-zA-Zéèàïç0-9.!^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/;

//je créer une fonction pour vérifier mon formulaire
function formulaireValide (){
//j'indique que la fonction doit être utilisée que ci il ya des article dans le panier
  if(panier != null){
//pour chaque information contact je vérifie que la saisie correspond à ce qui est demandé
    firstName.addEventListener("input", function(e){
      if(regPrenomNom.test(e.target.value)){
//si cela est bon je n'affiche pas de message d'erreur j'indique true pour la validation et j'ajoute la valeur a ma variable contact
        firstNameErreur.textContent = "";
        validFirstName = true;
        contact.firstName = e.target.value;
      }
//si le formulaire n'est pas rempli ou mal rempli alors j'indique un message d'erreur
      else{
        firstNameErreur.textContent = "Entrer un prénom valide";
        validFirstName = false
      }
    })
    lastName.addEventListener("input", function(e){
      if(regPrenomNom.test(e.target.value)){
        lastNameErreur.textContent = "";
        validLastName = true;
        contact.lastName = e.target.value;
      }
      else{
        lastNameErreur.textContent = "Entrer un nom valide";
        validFirstName = false
      }
    })
    address.addEventListener("input", function(e){
      if(regAddress.test(e.target.value)){
        addressErreur.textContent = "";
        validAddress = true;
        contact.address = e.target.value;
      }
      else{
        addressErreur.textContent = "Entrer une adresse valide";
        validAddress = false
      }
    })
    city.addEventListener("input", function(e){
      if(regCity.test(e.target.value)){
        cityErreur.textContent = "";
        validCity = true;
        contact.city = e.target.value;
      }
      else{
        cityErreur.textContent = "Entrer une ville valide";
        validCity = false
      }
    })
    email.addEventListener("input", function(e){
      if(regEmail.test(e.target.value)){
        emailErreur.textContent = "";
        validEmail = true;
        contact.email = e.target.value;
      }
      else{
        emailErreur.textContent = "Entrer une adresse email valide";
        validEmail = false
      }
    })
  }
}

//j'appelle la fonction
formulaireValide();

//j'écoute le bouton commander
validation.addEventListener("click", (event) => {
  event.preventDefault();
//si un des champs est pas ou mal renseignés alors j'alert de vérifier le formulaire
  if(validFirstName == false || validLastName == false || validAddress == false || validCity == false || validEmail == false){
    alert("Verifier le formulaire")
  }
//si les champs sont bien remplis alors je met dans un local storage les information renseignées par le client 
  else{
    localStorage.setItem("contact", JSON.stringify(contact));
//je créer une boucle pour récupérer chaque id des produits présents dans le panier
    for (let i = 0; i < panier.length; i++) {
      products.push(panier[i].id);
    }
//je créer un objet qui va contenir mes variables contact et products
    const infos = {
      contact: contact,
      products: products,
    }
//j'envoi les infos récupèrer à l'api
    const api = {
      method: "POST",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(infos)
    }
//j'envoie les données au serveur
    fetch("https://api-kanap-eu.herokuapp.com/api/products/order", api)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((data) => {
                let commandeId = data.orderId;
                window.location.assign("confirmation.html?id=" + commandeId);
            })
  }
})



