// Funciones

function obtenerCocktail(){
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then(
    function(response) {
        if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
            response.status);
        return;
        }

        // Examine the text in the response
        response.json().then(function(data) {
        //console.log(data);
        mostrarCocktail(data);
        });
    }
    )
    .catch(function(err) {
    console.log('Fetch Error :-S', err);
    });
}

function mostrarCocktail(cocktail){

    let bebida = document.querySelector('#bebida');

    //muestra nombre del cocktail
    let bebidaNombre = cocktail.drinks[0].strDrink;
    bebida.innerHTML = `<p class="nombreBebida">${bebidaNombre}</p>`

    //muestra imagen del cocktail
    let img = document.createElement('img');
    img.src =  cocktail.drinks[0].strDrinkThumb;
    bebida.appendChild(img)

    //muestra ingredientes del cocktail
    for(let i=1; i < 16; i++){

        if (cocktail.drinks[0][`strIngredient${i}`] == null){
            break;
        }
        
        let medida = cocktail.drinks[0][`strMeasure${i}`];
        let ingrediente = cocktail.drinks[0][`strIngredient${i}`];
        if (cocktail.drinks[0][`strMeasure${i}`] == null){
            bebida.innerHTML +=`<div class="ingredientes"><p>"${ingrediente}"</p></div>`
        }else{
            bebida.innerHTML +=`<div class="ingredientes"><p>"${medida}"  : "${ingrediente}"</p></div>`
        }
        
    }

    //muestra instrucciones del cocktail
    let instrucciones = document.createElement('ons-card');
    instrucciones.innerHTML = cocktail.drinks[0].strInstructions;
    bebida.appendChild(instrucciones);


}


const header = document.querySelector("#header");
let h1 = document.getElementById('h1')

// Scroll de nuestra pagina
window.addEventListener("scroll", function () {
    if (h1.getBoundingClientRect().top < 30) {
        header.classList.add("scroll")
    }
    else {
        header.classList.remove("scroll")
    }
})


//Inicio de Programa
obtenerCocktail();