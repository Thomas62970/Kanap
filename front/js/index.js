//Création d'une variable dans laquelle l'API va être récupéré.
let produits = [];

//Attente de fetch et récupération de l'api.
async function recuperation() {
    await fetch("http://localhost:3000/api/products")
        .then((res) => res.json())
        .then((data) => (produits = data));
        console.log(produits)
}

//utilisation du résultat de récupération pour créer les lien produit.
async function ajoutproduit() {
    await recuperation();
    let items = document.getElementById("items");
    for (let i = 0; i < produits.length; i++) {
        items.innerHTML +=
            `<a href="./product.html?id=${produits[i]._id}">
              <article>
                <img src="${produits[i].imageUrl}" alt="${produits[i].altTxt}">
                <h3 class="productName">${produits[i].name}</h3>
                <p class="productDescription">${produits[i].description}</p>
              </article>
            </a>`;
    }
}
//appelle de la fonction.
ajoutproduit();



