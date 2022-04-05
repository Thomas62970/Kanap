//déclaration des variable pour chaque élément du produit.


let image = document.querySelector(".item__img");
let titre = document.getElementById("title");
let prix = document.getElementById("price");
let description = document.getElementById("description");
let couleur = document.getElementById("colors");



//récupération de l'id produit.

let params = (new URL(document.location)).searchParams;
let idProduit = params.get("id");

//Création d'une variable dans laquelle l'API va être récupéré.

let produits = [];

//récupération des infos produits dans l'api.

async function recuperation() {
    await fetch(`http://localhost:3000/api/products/${idProduit}`)
        .then((res) => res.json())
        .then((data) => (produits = data));
        console.log(produits)
}

//Modification des info produit avec les données récuperer dans l'API

async function ajoutinfoProduit() {
    await recuperation();
    image.innerHTML = `<img src="${produits.imageUrl}" alt="${produits.altTxt}">`;
    titre.innerHTML = `${produits.name}`;
    prix.innerHTML = `${produits.price}`;
    description.innerHTML = `${produits.description}`;
    for(let i = 0; i< produits.colors.length ; i++){
        couleur.innerHTML += `<option value="${produits.colors[i]}">"${produits.colors[i]}"</option>`;
    }
}
ajoutinfoProduit();

//Je récupére mon bouton.

let ajouterPanier = document.getElementById("addToCart");

//Jécoute le bouton en vérifiant plusieur éléments au préalable.

ajouterPanier.addEventListener("click" ,() => {
    let produitChoisi = [];
    produitChoisi = {
        id : idProduit,
        couleur : (couleur.value),
        quantite : (quantity.value),
    }


    verification(produitChoisi);

//Je vérifie que le produit a une couleur et une quantité valide.

    function verification () {
        if(produitChoisi.couleur == []){
            alert("Choisir une couleur");
        }
        else if (produitChoisi.quantite == 0 ){
            alert("choisir une quantité valide");
        }
        else if (produitChoisi.quantite == ""){
            alert("choisir une quantité valide");
        }
        else if (produitChoisi.quantite > 100 ){
            alert("choisir une quantité valide");
        }
        else{
            ajoutProduitPanier(produitChoisi);
            window.location.assign('cart.html')
        }
    }
//Je vérifie que le produits n'est pas deja dans le panier pour soit l'ajouter entiérement soit juste sa quantité supp.

    function ajoutProduitPanier(produitChoisi){
        let panier = JSON.parse(localStorage.getItem("produitChoisi"));
        if(panier == null){
            panier = [];
            panier.push(produitChoisi);
            localStorage.setItem("produitChoisi", JSON.stringify(panier));  
        }
        else if(panier){
            let produitPanier = panier.find((p) => produitChoisi.id == p.id && produitChoisi.couleur == p.couleur);
            if(produitPanier){
                produitPanier.quantite = Number(produitChoisi.quantite) + Number(produitPanier.quantite);
                localStorage.setItem("produitChoisi", JSON.stringify(panier));
            }
            else{
                panier.push(produitChoisi);
                localStorage.setItem("produitChoisi", JSON.stringify(panier));
            }
        }
    }
})