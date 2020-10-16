const botonLimpiar = document.getElementById('boton-limpiar')
const filtroNombre = document.getElementById('busqueda')
const checkBoxes = document.querySelectorAll("input[type ='checkbox']")
const listaCheckBoxPuntaje = document.querySelectorAll("input[type ='checkbox'][name='puntuacion']")
const listaCheckBoxCategoria = document.querySelectorAll("input[type ='checkbox'][name='categoria']")
const cantidadProducto = document.querySelector('.cantidad-productos > p')
const totalProducto = document.getElementsByClassName('card-producto')
const productosOcultos = document.getElementsByClassName('card-producto hidden')
const cards = document.getElementsByClassName('card-producto')
const botonVerComoLista = document.querySelector('.show-list')
const botonVerComoGrid = document.querySelector('.show-grid')
const contenedorTarjetas = document.querySelector('.contenedor-productos')
const botonAbrirCarrito = document.getElementById('abrir-carrito')
const botonCerrarCarrito = document.getElementById('cerrar-carrito')
const menuCarrito = document.querySelector('.menu-carrito')
const botonAbrirFiltro = document.getElementById('show-filtro')
const botonCerrarFiltro = document.getElementById('cerrar-filtro')
const menuFiltro = document.querySelector('.filtros-busquedas')
const overlay = document.getElementById('overlay')
const botonRealizarCompra = document.getElementById('realizar-compra')
const botonSeguirComprando = document.getElementById('seguir-comprando')
const botonFinalizarCompra = document.getElementById('finalizar-compra')
const modal = document.querySelector('.modal-container')
const botonVaciarCarrito = document.querySelector('#vaciar-carrito')
const body = document.body


const renglonSubtotal = document.querySelector(".renglon-subtotal")
const subtotal = Number(document.getElementById("monto-subtotal").textContent.replace('$', ''))

const renglonDescuento = document.querySelector(".renglon-descuento")
let descuento = document.getElementById("monto-descuento")

const renglonEnvio = document.querySelector(".renglon-envio")
const envio = document.getElementById("monto-envio")

const renglonRecargo = document.querySelector(".renglon-recargo")
let recargo = document.getElementById("monto-recargo")

const renglonTotal = document.querySelector(".renglon-total")
let total = document.getElementById("monto-total")

const opcionesDePago = document.querySelectorAll(".opciones-de-pago")

const efectivo = document.querySelector("#efectivoDebito")
const credito = document.querySelector("#credito")
const envioOpcion = document.querySelector("#envio")
const tarjetaDescuento = document.querySelector("#descuento")


const textosCards = document.querySelectorAll('.texto')
const descripcionesProductos = document.querySelectorAll('.descripcion')
const contenidoProductos = document.querySelectorAll('.contenido-producto')

const btnAgregarAlCarrito = document.querySelectorAll('.btn-add-to-cart')
const productoEnCarrito = document.querySelectorAll('.btn-add-to-cart')


// console.log(productosAgregados.length)
const accionesCarrito = document.querySelector('.acciones-carrito')
const productosAgregados = document.getElementsByClassName('producto-agregado')
const botonesEliminar = document.getElementsByClassName('boton-eliminar')



console.log(botonesEliminar)
// // =============================
// //          FUNCIONES
// // ============================

// agregando clase 'producto agregado'

for (let boton of btnAgregarAlCarrito) {

    boton.onclick = (e) => {
        let botonclicked = e.target
        botonclicked.parentElement.parentElement.classList.add('producto-agregado')

    }
}



// elimando card item del carrito y  clase 'producto agregado'
for (let boton of botonesEliminar) {
    boton.onclick = (e) => {
        let botonclicked = e.currentTtarget
        botonclicked.parentElement.parentElement.parentElement.remove();

    }
}

const hide = (element) => {
    return element.classList.add("hidden")
}
const show = (element) => {
    return element.classList.remove("hidden")
}

const AddAClassAnElement = (ListElements, clase) => {
    for (let element of ListElements) {
        element.classList.add(clase)
    }
}

const removeAClassAnElement = (ListElements, clase) => {
    for (let element of ListElements) {
        element.classList.remove(clase)
    }
}


const caracteristicaTarjeta = (checkbox, card) => {

    if (checkbox.name === "puntuacion") {
        return card.dataset.rating;
    } else {
        return card.dataset.categoria;
    }
}

const hayAlgunCheckBoxChequeado = (filtro) => {
    for (let checkbox of filtro) {
        if (checkbox.checked) {
            return true
        }
    }
    return false
}
const hayAlgoEscritoEnElInput = () => {
    if (filtroNombre.value) {
        return true
    } else {
        return false
    }
}



const compararInputConTarjeta = (card) => {
    if (card.dataset.nombre.includes(filtroNombre.value.toLowerCase())) {
        return true
    } else {
        return false
    }
}

const compararCheckboxConTarjeta = (card, filtro) => {


    for (let checkbox of filtro) {
        caracteristica = caracteristicaTarjeta(checkbox, card)
        if (checkbox.checked) {
            if (checkbox.value === caracteristicaTarjeta(checkbox, card)) {
                return true
            }
        }
    }
    return false
};



const validarInput = (card) => {
    if (hayAlgoEscritoEnElInput()) {
        if (compararInputConTarjeta(card)) {
            return true
        } else {
            return false
        }
    } else {
        return true
    }
}


//devuelve el resultado de la cantidad de productos al hacer una busqueda
const contarProductos = (cantidad) => {
    cantidad = totalProducto.length - cantidad
    cantidadProducto.textContent = `Mostrando ${cantidad} producto(s) de ${totalProducto.length}`
}

const validarchecks = (card, filtro) => {

    if (hayAlgunCheckBoxChequeado(filtro)) {
        if (compararCheckboxConTarjeta(card, filtro)) {
            return true
        } else {
            return false
        }
    } else {
        return true
    };

}
const pasaFiltros = (card) => {

    if (validarchecks(card, listaCheckBoxCategoria) && validarchecks(card, listaCheckBoxPuntaje) && validarInput(card)) {
        return true
    } else {
        return false
    }

}

const filtrarTarjetas = () => {
    for (let card of cards) {
        if (pasaFiltros(card)) {
            show(card)
        }
        else {
            hide(card)
        }
    }
    contarProductos(productosOcultos.length);
}


const abrirModal = () => {
    overlay.style.zIndex = "3";
    body.classList.add('no-scroll')
    modal.classList.add('mostrar-modal')
    show(modal)
}

const cerrarModal = () => {
    modal.classList.remove('mostrar-modal')
    overlay.style.zIndex = "1"
    body.classList.remove('no-scroll')
}



let contenidoDelCarrito = document.querySelector('.contenido-carrito')

const crearCardProducto = (producto) => {
    // console.log(producto.dataset.nombre)
    const card = `

    <article class="card-carrito">
        <img src="${producto.dataset.imagen}" alt="mouse gamer negro - detalles multicolor" class="cardCarrito-img">
      
        <div class="contenedor-detalles-producto">
            <div>
            <p class = "offscreen">nombre del producto:</p>
                <h4> ${producto.dataset.nombre} </h4>
                <button id="boton-eliminar">
                <i class="far fa-trash-alt icono-size"></i>
            </button>
            </div>

            <div>
                <label for="cantidad-items">
                    <input type="number" name="" id="cantidad-items" min="1" value="1"> unidades
                </label>
                <p>x $ ${producto.dataset.precio}</p>

            </div>
        </div>
    </article>`


    return card
}

const showItemsInCart = () => {

    console.log(productosAgregados.length)
    if (productosAgregados.length == 0) {
        contenidoDelCarrito.innerHTML = `No tienes productos en el carrito, ¡agrega algunos!`
        // hide(accionesCarrito)
    } else {
        contenidoDelCarrito.innerHTML = `hay productos`

        for (let producto of productosAgregados) {
            contenidoDelCarrito.innerHTML += crearCardProducto(producto)
        }
        show(accionesCarrito)
        contenidoDelCarrito.classList.add('scroll')
    }
}


const eliminarItemsCarrito = (producto) => {


}


const abrirCarrito = () => {
    show(menuCarrito)
    show(overlay)
    botonAbrirCarrito.tabIndex = -1
    body.classList.add('no-scroll')
    menuCarrito.setAttribute("aria-hidden", "false")
    botonAbrirCarrito.setAttribute("aria-expanded", "true")
    menuCarrito.tabIndex = 0
    menuCarrito.focus();
    menuCarrito.classList.add('mostrar-carrito')

    showItemsInCart()


}

const abrirFiltro = () => {
    show(menuFiltro)
    show(overlay)
    botonAbrirFiltro.tabIndex = -1
    body.classList.add('no-scroll')
    menuFiltro.tabIndex = 0
    menuFiltro.classList.add('mostrar-filtro')
}



const cerrarFiltro = () => {
    hide(overlay)
    menuFiltro.classList.remove('mostrar-filtro')
    body.classList.remove('no-scroll')
    menuFiltro.setAttribute("aria-hidden", "true")
}



const cerrarCarrito = () => {
    hide(overlay)
    botonAbrirCarrito.tabIndex = 0
    botonAbrirCarrito.setAttribute("aria-expanded", "false")
    menuCarrito.classList.remove('mostrar-carrito')
    body.classList.remove('no-scroll')
    menuCarrito.setAttribute("aria-hidden", "true")

}


for (let opcion of opcionesDePago) {
    opcion.oninput = () => {
        calcularTotal()
    }
}

let resultadoRecargo

const recargoTarjeta = () => {
    if (credito.checked) {
        resultadoRecargo = subtotal * 0.1
        recargo.textContent = "$" + resultadoRecargo
        renglonRecargo.classList.remove('hidden')
    }
    else {
        resultadoRecargo = 0
        renglonRecargo.classList.add('hidden')
    }
    return resultadoRecargo
}


let resultadoDescuento

const aplicarDescuento = () => {
    if (tarjetaDescuento.checked) {
        resultadoDescuento = - subtotal * 0.1
        descuento.textContent = "$" + resultadoDescuento
        renglonDescuento.classList.remove('hidden')
    }
    else {
        resultadoDescuento = 0
        renglonDescuento.classList.add('hidden')
    }
    return resultadoDescuento
}


let resultadoEnvio

const recargoEnvio = () => {
    if (envioOpcion.checked) {
        resultadoEnvio = 50
        envio.textContent = "$" + resultadoEnvio
        renglonEnvio.classList.remove('hidden')

    }
    else {
        resultadoEnvio = 0
        renglonEnvio.classList.add('hidden')
    }
    return resultadoEnvio
}


const calcularTotal = () => {
    let totalReal = subtotal
    totalReal = subtotal + recargoEnvio() + aplicarDescuento() + recargoTarjeta()
    total.textContent = "$" + totalReal
    return totalReal
}




//============================
//          Eventos
//============================

// filtrar busqueda por textbox
filtroNombre.oninput = () => {

    filtrarTarjetas()

};

for (let checkbox of listaCheckBoxCategoria) {
    checkbox.oninput = () => {
        filtrarTarjetas()
    }

};

for (let checkbox of listaCheckBoxPuntaje) {
    checkbox.oninput = () => {
        filtrarTarjetas()
    }

};

botonLimpiar.onclick = () => {
    filtroNombre.value = ""

    for (let checkBox of checkBoxes) {
        if (checkBox.checked) {
            checkBox.checked = false;
        }
    }

    for (let card of cards) {
        show(card)
    }
    contarProductos(productosOcultos.length);
};


//  ver como lista o grilla
botonVerComoLista.onclick = () => {
    contenedorTarjetas.classList.add('list-view')
    AddAClassAnElement(cards, "list-view");
    AddAClassAnElement(textosCards, "grid-view")
    AddAClassAnElement(contenidoProductos, "grid-view")
    removeAClassAnElement(descripcionesProductos, "hidden")
};

botonVerComoGrid.onclick = () => {
    contenedorTarjetas.classList.remove('list-view')
    removeAClassAnElement(cards, "list-view");
    removeAClassAnElement(textosCards, "grid-view")
    removeAClassAnElement(contenidoProductos, "grid-view")
    AddAClassAnElement(descripcionesProductos, "hidden")
};


botonAbrirFiltro.onclick = () => {
    abrirFiltro();
}

botonCerrarFiltro.onclick = () => {
    cerrarFiltro();
}

botonAbrirCarrito.onclick = () => {
    abrirCarrito();
};

botonCerrarCarrito.onclick = () => {
    cerrarCarrito();
};

botonVaciarCarrito.onclick = () => {
    contenidoDelCarrito.innerHTML = "No tienes productos en el carrito, ¡agrega algunos!"
    contenidoDelCarrito.classList.remove('scroll')
    hide(accionesCarrito)
}

botonRealizarCompra.onclick = () => {
    abrirModal();
};

botonSeguirComprando.onclick = () => {
    cerrarModal();
    cerrarCarrito();
};

botonFinalizarCompra.onclick = () => {
    cerrarModal();
};
