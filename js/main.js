// Funciones para almacenar y traer los datos que se almacenan
function guardarAlmacenamientoLocal(llave, valor_a_guardar) {
    localStorage.setItem(llave, JSON.stringify(valor_a_guardar))
}
function obtenerAlmacenamientoLocal(llave) {
    const datos = JSON.parse(localStorage.getItem(llave))
    return datos
}

function visualizarProductos() {
    contenedor.innerHTML = ""
    if(productos1.length > 0){
        for (let i = 0; i < productos1.length; i++) {
            if (productos1[i].existencia > 0) {
                contenedor.innerHTML += `<div><img src="${productos1[i].urlImagen}"><div class="informacion"><p>${productos1[i].nombre}</p><p class="precio">$${productos1[i].valor}</p><button onclick=comprar(${i})>Comprar</button></div></div>`
            }
            else {
                contenedor.innerHTML += `<div><img src="${productos1[i].urlImagen}"><div class="informacion"><p>${productos1[i].nombre}</p><p class="precio">$${productos1[i].valor}</p><p class="soldOut">Sold Out</p></div></div>`
            }
        }
    }else{
        contenedor.innerHTML = `<p class="listaVacia">Para poder visualizar productos primero debe cargarlos.</p>`;
    }
}

function comprar(indice) {
    lista.push({ nombre: productos1[indice].nombre, precio: productos1[indice].valor })


    let van = true
    let i = 0
    while (van == true) {
        if (productos1[i].nombre == productos1[indice].nombre) {
            productos1[i].existencia -= 1
            if (productos1[i].existencia == 0) {
                visualizarProductos()
            }
            van = false
        }
        guardarAlmacenamientoLocal("productos1", productos1)
        i += 1
    }

    numero.innerHTML = lista.length
    numero.classList.add("diseñoNumero")

    Toastify({
        text: "Se agrego al carrito",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){} // Callback after click
    }).showToast();
    
    return lista
}

function mostrarElemtrosLista() {
    productosCompra.innerHTML = ""
    valortotal = 0
    for (let i = 0; i < lista.length; i++){
        productosCompra.innerHTML += `<div><div class="img"><button onclick=eliminar(${i}) class="botonTrash"><img src="./img/trash.png"></button><p>${lista[i].nombre}</p></div><p> $${lista[i].precio}</p></div>`
        valortotal += parseInt(lista[i].precio)
    }
    total.innerHTML = `<p>Valor Total</p> <p><span>$${valortotal}</span></p>`
}

function eliminar(indice){
    let van = true
    let i = 0
    while (van == true) {
        if (productos1[i].nombre == lista[indice].nombre) {
            productos1[i].existencia += 1
            lista.splice(indice, 1)
            van = false
        }
        i += 1
    }
    guardarAlmacenamientoLocal("productos1", productos1)

    numero.innerHTML = lista.length
    if (lista.length == 0){
        numero.classList.remove("diseñoNumero")
    }
    visualizarProductos()
    mostrarElemtrosLista()
}

// Scroll de nuestra pagina
window.addEventListener("scroll", function () {
    if (contenedor.getBoundingClientRect().top < 10) {
        header.classList.add("scroll")
    }
    else {
        header.classList.remove("scroll")
    }
})

let productos1 = obtenerAlmacenamientoLocal('productos1') || [];

// Variables que traemos de nuestro html
const informacionCompra = document.getElementById('informacionCompra');
const contenedorCompra = document.getElementById('contenedorCompra');
const productosCompra = document.getElementById('productosCompra');
const contenedor = document.getElementById('contenedor');
const carrito = document.getElementById('carrito');
const numero = document.getElementById("numero");
const header = document.querySelector("#header");
const total = document.getElementById('total');
const body = document.querySelector("body");
const x = document.getElementById('x')

// Variables que vamos a usar en nuestoro proyecto
let lista = []
let valortotal = 0



//Cargado de lista de productos
window.addEventListener('load', () => {
    visualizarProductos();
    contenedorCompra.classList.add("none")
})

//abrir carrito de compras
carrito.addEventListener("click", function(){
    body.style.overflow = "hidden"
    contenedorCompra.classList.remove('none')
    contenedorCompra.classList.add('contenedorCompra')
    informacionCompra.classList.add('informacionCompra')
    mostrarElemtrosLista()
})

//salir del carrito de compras
x.addEventListener("click", function(){
    body.style.overflow = "auto"
    contenedorCompra.classList.add('none')
    contenedorCompra.classList.remove('contenedorCompra')
    informacionCompra.classList.remove('informacionCompra')
})