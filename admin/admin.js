function guardarAlmacenamientoLocal(llave, valor_a_guardar) {
    localStorage.setItem(llave, JSON.stringify(valor_a_guardar))
}
function obtenerAlmacenamientoLocal(llave) {
    const datos = JSON.parse(localStorage.getItem(llave))
    return datos
}

// Scroll de nuestra pagina
window.addEventListener("scroll", function () {
    let h1 = document.getElementById('h1')
    if (h1.getBoundingClientRect().top < 30) {
        header.classList.add("scroll")
    }
    else {
        header.classList.remove("scroll")
    }
})

let productos1 = obtenerAlmacenamientoLocal('productos1') || [];
let mensaje = document.getElementById('mensaje')

//Añadir un producto
const añadirProducto = document.getElementById('productoAñadir')
const añadirValor = document.getElementById('valorAñadir')
const añadirExistencia = document.getElementById('existenciaAñadir')
const añadirImagen = document.getElementById('ImagenAñadir')

document.getElementById("botonAñadir").addEventListener("click", function (event) {
    event.preventDefault()
    let productoAñadir = añadirProducto.value
    let valorAñadir = añadirValor.value
    let existenciaAñadir = añadirExistencia.value
    let imagenAñadir = añadirImagen.value

    let van = true

    if (productoAñadir == '' || valorAñadir == '' || existenciaAñadir == '' || imagenAñadir == '') {
        mensaje.classList.add('llenarCampos')
        setTimeout(() => { mensaje.classList.remove('llenarCampos') }, 2500)
        van = false
    }
    else {
        for (let i = 0; i < productos1.length; i++) {
            if (productos1[i].nombre == productoAñadir) {
                mensaje.classList.add('repetidoError')
                setTimeout(() => { mensaje.classList.remove('repetidoError') }, 2500)
                van = false
            }
        }
    }

    if (van == true) {
        productos1.push({
            nombre: productoAñadir,
            valor: valorAñadir,
            existencia: existenciaAñadir,
            urlImagen: imagenAñadir
        })
        mensaje.classList.add('realizado')
        setTimeout(() => {
            mensaje.classList.remove('repetidoError')
            window.location.reload()
        }, 1500)
    }
    guardarAlmacenamientoLocal('productos1', productos1);
})

// Editar
const productoEd = document.getElementById('productoEditar')
const atributoEd = document.getElementById('atributoEditar')
const nuevoAtributoEd = document.getElementById('nuevoAtributo')

document.getElementById("botonEditar").addEventListener("click", function (event) {
    event.preventDefault()
    let productoEditar = productoEd.value
    let atributoEditar = atributoEd.value
    let nuevoAtributo = nuevoAtributoEd.value
    let van = false
    if (productoEditar == '' || atributoEditar == '' || nuevoAtributo == '') {
        mensaje.classList.add('llenarCampos')
        setTimeout(() => { mensaje.classList.remove('llenarCampos') }, 2500)
    }
    else {
        for (let i = 0; i < productos1.length; i++) {
            if (productos1[i].nombre == productoEditar) {
                productos1[i][atributoEditar] = nuevoAtributo
                van = true
            }
        }
        if (van == true) {
            mensaje.classList.add('realizado')
            setTimeout(() => {
                mensaje.classList.remove('realizado')
                window.location.reload()
            }, 1500);
        }
        else {
            mensaje.classList.add('noExisteError')
            setTimeout(() => { mensaje.classList.remove('noExsiteError') }, 2500);
        }
        guardarAlmacenamientoLocal('productos1', productos1);
    }
})

// Eliminar
const productoE = document.getElementById('productoEliminar')

document.getElementById("botonEliminar").addEventListener("click", function (event) {
    event.preventDefault()
    let productoEliminar = productoE.value
    let van = false

    for (let i = 0; i < productos1.length; i++) {
        if (productos1[i].nombre == productoEliminar) {
            productos1.splice(i, 1)
            van = true
        }
    }

    if (van == false) {
        mensaje.classList.add('noExsiteError')
        setTimeout(() => { mensaje.classList.remove('noExsiteError') }, 2500);
    }
    else {
        mensaje.classList.add('realizado')
        setTimeout(() => {
            mensaje.classList.remove('realizado')
            window.location.reload()
        }, 1500);
    }
    guardarAlmacenamientoLocal('productos1', productos1);
})

// mostrar productos
window.addEventListener("load", () => {
    const productoEd = document.getElementById('productoEditar')
    const productoEl = document.getElementById('productoEliminar')
    for (let i = 0; i < productos1.length; i++) {
        productoEd.innerHTML += `<option>${productos1[i].nombre}</option>`
        productoEl.innerHTML += `<option>${productos1[i].nombre}</option>`
    }
    Object.keys(productos1[0]).forEach(element => {
        atributoEd.innerHTML += `<option>${element}</option>`
    });

    let mostraProductos = document.getElementById('mostrarProductos')
    mostraProductos.innerHTML = ''
    for (let i = 0; i < productos1.length; i++) {
        mostraProductos.innerHTML += `<div class="contenedorProductos"><img src="${productos1[i].urlImagen}"><div class="informacion"><p>${productos1[i].nombre}</p><p class="precio"><span>Precio: ${productos1[i].valor}$</span></p> Existencia: ${productos1[i].existencia}<p></p></div></div>`
    }
})