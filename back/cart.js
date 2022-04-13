
let panier = JSON.parse(localStorage.getItem("produitChoisi"));
let produits = [];
console.log(panier);
let total = 0;
let totalQ = 0;
let prixTotal = document.getElementById("totalPrice");
let quantiteTotal = document.getElementById("totalQuantity");


let produitChoisi = () => {
    if (panier == null || panier == 0) {
        document.getElementById("totalQuantity").innerText = 0;
        document.getElementById("totalPrice").innerText = 0;
        document.getElementById("cart__items").innerHTML +=
            `<h2 style="text-align:center; margin-bottom:80px;">Votre panier est vide</h2>`
    }
    else {
        for(const [i, produit] of panier.entries()){
            async function produitApi(){
                await fetch(`http://localhost:3000/api/products/` + produit.id)
                .then((res) => res.json())
                .then((data) => InfoProduct(data));
                console.log(produits);
            }
            
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
                  newQ();
                  supprimerProduit();
              //calcul du total, se servir de l'api qui renvoit le prix en fonction de idPanierProduits et le renseigne dans totalPrice
              let prix = product.price * produit.quantite
              total+= prix
             //totalPrice.textContent= total;
             console.log(total)
              let quantite = Number(produit.quantite);
              totalQ += quantite
              console.log(totalQ);
              prixTotal.innerHTML = total;
              quantiteTotal.innerHTML = totalQ;
            }
            produitApi();
        }
    }
}
produitChoisi();


function newQ(){
let quantiteItem = document.querySelectorAll(".itemQuantity");
  quantiteItem.forEach((tag) => {
  let article = tag.closest("article");
  let id = article.dataset.id;
  let couleur = article.dataset.color;
  let nouvelleQ = "";
  tag.addEventListener("change", event => {
    event.preventDefault();
    nouvelleQ = Number(tag.value);
    console.log(nouvelleQ);
    console.log(id);
    console.log(couleur);
    for (let i = 0; i < panier.length; i++) {
      
      if (panier[i].id == id && panier[i].couleur == couleur) {
          panier[i].quantite = nouvelleQ;
      }
    }
    localStorage.setItem("produitChoisi", JSON.stringify(panier));
    console.log(panier);
  })
  }
)}
function supprimerProduit (){
  let btnsupp = document.querySelectorAll(".deleteItem");
  btnsupp.forEach((item) => {
    item.addEventListener("click", () => {
      let cart = item.closest("article");
      let idsupp = cart.dataset.id;
      let couleur = cart.dataset.color;
     panier = panier.filter((element) => element.id !== idsupp || element.couleur !== couleur);
      localStorage.setItem("produitChoisi", JSON.stringify(panier));
      cart.remove();
      alert("Ce produit va être supprimé de votre panier");
      location.reload();
    });
  });
}

let contact = {
  firstName : "",
  lastName : "",
  address : "",
  city : "",
  email : "",
}
let products =[];

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

let regPrenomNom = /^[a-zA-Zéèàïêç\s\-]{2,21}$/;
let regAddress = /^[0-9]{0,10}[a-zA-Zéèàïêç\s\-]{2,30}$/;
let regCity = /^[a-zA-Zéèàïêç\s\-]{2,30}$/;
let regEmail = /^[a-zA-Zéèàïç0-9.!^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/;

function formulaireValide (){
  if(panier != null){
    firstName.addEventListener("input", function(e){
      if(regPrenomNom.test(e.target.value)){
        firstNameErreur.textContent = "";
        validFirstName = true;
        contact.firstName = e.target.value;
      }
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

formulaireValide();


validation.addEventListener("click", (event) => {
  event.preventDefault();
  if(validFirstName == false || validLastName == false || validAddress == false || validCity == false || validEmail == false){
    return firstNameErreur || lastNameErreur || addressErreur || cityErreur || emailErreur;
  }
  else{
    sessionStorage.setItem("contact", JSON.stringify(contact));
    for (let i = 0; i < panier.length; i++) {
      products.push(panier[i].id);
    }
    const infos = {
      contact: contact,
      products: products,
    }
    const api = {
      method: "POST",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(infos)
    }
    fetch("https://api-kanap-eu.herokuapp.com/api/products/order", api)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((data) => {
                let commandeId = data.commandeId;
                window.location.assign("confirmation.html?id=" + commandeId);
            })
  }
})



