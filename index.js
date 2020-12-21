let choiceColor = null
let choiceName = null
let choicePrice = null
let choiceId = null
let choiceImg = null
let choiceTime = 0
let articles = 0

let panier = []

$(function(){
  listeDesProduits();

  $("#add-article")[0].addEventListener('click', () => {
    let monPanier = [choiceName, choicePrice, choiceColor, choiceImg, choiceId, choiceTime]
    ajoutPanier(monPanier)
  })

  $("#visu-panier")[0].addEventListener('click', () => {

  })

  let nombreArticle = document.createTextNode(articles)
  $("#articles")[0].appendChild(nombreArticle)
})
// lister des produits
function listeDesProduits(){
  $.ajax({
    method: 'get',
    url: 'http://localhost:3000/api/teddies',
    dataType:'json',
    success:function(data){
      data.forEach(element => {
      	let div = document.createElement("div")
      	div.className = "produit"

        let image = document.createElement('img')
        image.className = "image"
        image.src = element.imageUrl;

        let name = document.createElement("h4")
        let textName = document.createTextNode(element.name)
        name.appendChild(textName)

      	let button = document.createElement("button")
      	let textButton = document.createTextNode("Voir "+element.name)
      	button.setAttribute("data-target", "#modalExemple")
      	button.setAttribute("data-toggle", "modal")
        button.appendChild(textButton)

        button.addEventListener('click', () => {
          detailProduit(element._id)
        })

        div.appendChild(image)
        div.appendChild(name)
        div.appendChild(button)

        document.getElementById("liste-article").appendChild(div)
      });
    }
  })
}

// fonction permetant d'afficher le détail du produit
function detailProduit(idProduit){
  $.ajax({
    method: 'get',
    url: 'http://localhost:3000/api/teddies/'+idProduit,
    dataType: 'json',
    success: function(data){
      choiceName = data.name
      choicePrice = data.price
      choiceId = data._id
      choiceImg = data.imageUrl

			let image = document.createElement("img")
			image.src = data.imageUrl
      image.className = "descriptionimg"
      
      let name = document.createTextNode(data.name)
      let price = document.createTextNode(data.price+ " €")
      let textDescription = document.createTextNode(data.description)
      let listColor = data.colors
      personalisation(listColor)

      $("#price")[0].innerHTML = ''
      $("#price")[0].appendChild(price)
      $("#name-produit")[0].innerHTML = ''
      $("#name-produit")[0].appendChild(name)
			$("#imgdetail")[0].innerHTML = ''
			$("#imgdetail")[0].appendChild(image)
			$("#description")[0].innerHTML = ''
			$("#description")[0].appendChild(textDescription)
    }
  })
}

function personalisation(colors){
  $("#color")[0].innerHTML = ""
  colors.forEach(color => {
    let span = document.createElement("span")
    let radio = document.createElement('input')
    radio.type = 'radio'
    radio.name = 'choix'
    radio.value = color
    let label = document.createElement('label')
    let textlabel = document.createTextNode("  "+color)
    label.appendChild(textlabel)
    span.appendChild(radio)
    span.appendChild(label)
    radio.addEventListener('click', () => {
      choix(color)
    })

    $("#color")[0].appendChild(span)
  })
}

function choix(color){
  choiceColor = color
}

function choiceTimef(){
  //choiceTime = choiceTime + 1
}

function ajoutPanier(produit){
  if(panier.length === 0){
    panier.push(produit)
    articles = articles + 1
    //choiceTime = choiceTime + 1
    let nombreArticle = document.createTextNode(articles)
    $("#articles")[0].innerHTML = ''
    $("#articles")[0].appendChild(nombreArticle)
  }else{
    for(i = 0; i < panier.length; i++){
      if(panier[i]['choiceId'] == produit['choiceId']){
        articles = articles + 1
        panier[i]['choiceTime'] = panier[i]['choiceTime'] + 1
      }
    }
    let nombreArticle = document.createTextNode(articles)
    $("#articles")[0].innerHTML = ''
    $("#articles")[0].appendChild(nombreArticle)
  }

  console.log(panier)
  
}