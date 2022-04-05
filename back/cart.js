
let panier = JSON.parse(localStorage.getItem("produitChoisi"));
let produits = [];
console.log(panier);



let quantitePanier = document.getElementsByClassName("cart__item__content__settings__quantity");

let produitChoisi = () => {
    if (panier == null || panier == 0) {
        document.getElementById("totalQuantity").innerText = 0;
        document.getElementById("totalPrice").innerText = 0;
        document.getElementById("cart__items").innerHTML +=
            `<h2 style="text-align:center; margin-bottom:80px;">Votre panier est vide</h2>`
    }
    else {
        for(let produit of panier){
            async function produitApi(){
                await fetch(`http://localhost:3000/api/products/` + produit.id)
                .then((res) => res.json())
                .then((data) => (produits = data));
                console.log(produits);
            }
            async function detailPanier(){
                await produitApi();
                let produitPanier = document.getElementById("cart__items");
                    produitPanier.innerHTML +=
                    `<article class="cart__item" data-id=${produit.id} data-color=${produit.couleur}>
                    <div class="cart__item__img">
                      <img src=${produits.imageUrl} alt = ${produits.altTxt}>
                    </div>
                    <div class="cart__item__content">
                      <div class="cart__item__content__description">
                        <h2>${produits.name}</h2>
                        <p>${produit.couleur}</p>
                        <p>${produits.price}€</p>
                      </div>
                      <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                          <p>Qté : ${produit.quantite}</p>
                          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="1">
                        </div>
                        <div class="cart__item__content__settings__delete">
                          <p class="deleteItem">Supprimer</p>
                        </div>
                      </div>
                    </div>
                  </article>`
                  function totalProduits (){

                    let quantiteTotal = document.getElementById("#totalQuantity");
                    if(panier == 0 || panier == null){
                      quantiteTotal.innerHTML = "0";
                    }
                    else{
                      let quantite = 0
                      for(let i = 0; i < panier.length; i++)
                      quantite += panier[i].quantite;
                      console.log(quantite);
                    }

                    }
                  totalProduits();
                  
                  newQ();
                }
            detailPanier();
            
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






