//Je récupère l'id de la commande avec search params
let params = (new URL(document.location)).searchParams;
let commandeId = params.get("id");

//Je cible le numéro de commande
let idCommande = document.getElementById("orderId")
idCommande.innerText = commandeId;

//Je supprime les informations stockées dans le local storage
localStorage.removeItem("produitChoisi");
localStorage.removeItem("contact");