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
const botonVaciarCarrito = document.getElementById('vaciar-carrito')
const botonSuccessOk = document.getElementById('boton-success-ok')
const botonDangerSi = document.getElementById('boton-danger-si')
const botonDangerNo = document.getElementById('boton-danger-no')
const modal = document.querySelector('.modal-container')
const body = document.body


// const renglonSubtotal = document.querySelector(".renglon-subtotal")
// const subtotal = Number(document.getElementById("monto-subtotal").textContent.replace('$', ''))

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
const cantidadItemsCarrito = document.getElementById('cantidad-items-carrito')
const productoEnCarrito = document.querySelectorAll('.btn-add-to-cart')
let contenidoDelCarrito = document.querySelector('.contenido-carrito')


const accionesCarrito = document.querySelector('.acciones-carrito')
const productosAgregados = document.getElementsByClassName('producto-agregado')
const subtotalCarrito = document.getElementById('subtotal-carrito')

const modalDanger = document.getElementById('advertencia')
const modalSuccess = document.getElementById('success')



// // =============================
// //          FUNCIONES
// // ============================



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

const limpiarCarrito = () => {

    for(let producto of cards){
        producto.dataset.cantidad ="0"
        producto.classList.remove('producto-agregado')
    }

    contenidoDelCarrito.innerHTML = "No tienes productos en el carrito, ¡agrega algunos!"
    contenidoDelCarrito.classList.remove('scroll')
    hide(accionesCarrito)
    cantidadItemsCarrito.textContent = `Carrito (0 items)`
    subtotalCarrito.textContent = ""


}

const cantidadItems = () => {
    let total = 0
    for (let producto of productosAgregados) {
        total += Number(producto.dataset.cantidad)
    }
    return total
}


// agregando clase 'producto agregado'
for (let boton of btnAgregarAlCarrito) {
    boton.onclick = (e) => {
        let card
        let botonclicked = e.target
        card = botonclicked.parentElement.parentElement
        card.classList.add('producto-agregado')
        card.dataset.cantidad = Number(card.dataset.cantidad) + 1
        cantidadItemsCarrito.textContent = `Carrito (${cantidadItems()} items)`

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

const validarTextboxs = () => {
    const nombreApellido = document.getElementById('nombreApellido')
    const email = document.getElementById('email').value

    hide(document.querySelector('.fieldNombre'))
    hide(document.querySelector('.fieldEmail'))

    if (nombreApellido.value == "" || nombreApellido.length == 0) {
        show(document.querySelector('.fieldNombre'))
        return false
    }

    if (!(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i).test(email)) {
        show(document.querySelector('.notice-field.fieldEmail'))
        return false
    }

    return true
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

}

const cerrarModal = () => {
    modal.classList.remove('mostrar-modal')
    overlay.style.zIndex = "1"
    body.classList.remove('no-scroll')
}

let totalItems = 0
const calcularSubtotalCarrito = () => {
    let subtotalCheckOut = document.getElementById('monto-subtotal')
    let subtotal = 0
    const cardCarrito = document.getElementsByClassName('card-carrito')
    for (let card of cardCarrito) {

        subtotal += (Number(card.dataset.precio) * Number(card.dataset.cantidad))

    }
    subtotalCheckOut.textContent = `$${subtotal}`
    subtotalCarrito.textContent = `Subtotal $${subtotal}`
}

const showItemsInCart = () => {
    let items = 0
    if (productosAgregados.length == 0) {
        contenidoDelCarrito.innerHTML = `No tienes productos en el carrito, ¡agrega algunos!`
        limpiarCarrito()

    } else {

        contenidoDelCarrito.innerHTML = `${cantidadItems()} producto(s) agregado(s)`

        for (let producto of productosAgregados) {
            contenidoDelCarrito.innerHTML += crearCardProducto(producto)
            items += Number(producto.dataset.cantidad)
        }
        show(accionesCarrito)
        calcularSubtotalCarrito()
        contenidoDelCarrito.classList.add('scroll')
    }
}



const borrarCardProducto = (button, productoId) => {
    button.parentNode.parentNode.parentNode.remove();

    for (let item of productosAgregados) {
        if (item.dataset.id == productoId) {
            item.classList.remove('producto-agregado')
            item.dataset.cantidad = 0

        }
    }
    showItemsInCart()
}

const actualizarCantidadesProductos = (input, productoId) => {

    let card = input.parentNode.parentNode.parentNode.parentNode
    card.dataset.cantidad = Number(input.value);
    calcularSubtotalCarrito()
    for (let item of productosAgregados) {
        if (item.dataset.id == productoId) {
            item.dataset.cantidad = Number(input.value);
        }
    }

}


const crearCardProducto = (producto) => {
    console.log(producto.dataset.cantidad)
    const card = `

    <article class="card-carrito" data-precio= "${producto.dataset.precio}" data-cantidad= "${producto.dataset.cantidad}">
        <img src="${producto.dataset.imagen}" alt="mouse gamer negro - detalles multicolor" class="cardCarrito-img">
      
        <div class="contenedor-detalles-producto">
            <div>
                <p class = "offscreen">nombre del producto:</p>
                <h4> ${producto.dataset.nombre} </h4>
                <button id="boton-eliminar" onclick="borrarCardProducto(this,${producto.dataset.id})";>
                    <i class="far fa-trash-alt icono-size"></i>
                </button>
            </div>

            <div>
                <label for="cantidad-items">
                    <input type="number" name="" id="cantidad-items" min="1" step="1" value="${producto.dataset.cantidad}" onchange="actualizarCantidadesProductos(this,${producto.dataset.id})";> unidades
                </label>
                <p>x $ ${producto.dataset.precio}</p>

            </div>
        </div>
    </article>`


    return card
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

const subtotal = () => {
    return Number(document.getElementById('monto-subtotal').textContent.replace('$', ''))
}


for (let opcion of opcionesDePago) {
    opcion.oninput = () => {
        calcularTotal()
    }
}

let resultadoRecargo

const recargoTarjeta = () => {

    if (credito.checked) {
        resultadoRecargo = subtotal() * 0.1
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
        resultadoDescuento = - subtotal() * 0.1
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

    let totalReal = subtotal()
    totalReal = subtotal() + recargoEnvio() + aplicarDescuento() + recargoTarjeta()
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


botonRealizarCompra.onclick = () => {
    abrirModal();
    calcularTotal();
};

botonSeguirComprando.onclick = () => {
    cerrarModal();
    cerrarCarrito();
};

botonSuccessOk.onclick = () => {
    limpiarCarrito()
    modalSuccess.classList.remove('mostrar-modal-notice')
    overlay.style.zIndex = "1"
    hide(overlay)
    body.classList.remove('no-scroll')


}

botonVaciarCarrito.onclick = () => {
    modalDanger.classList.add('mostrar-modal-notice')
    overlay.style.zIndex = "4"
    show(overlay)
    body.classList.remove('no-scroll')
}

botonDangerNo.onclick = () => {
    overlay.style.zIndex = "1"
    modalDanger.classList.remove('mostrar-modal-notice')
}

botonDangerSi.onclick = () => {
    // modalSuccess.classList.add('mostrar-modal-notice')
    limpiarCarrito()
    modalDanger.classList.remove('mostrar-modal-notice')
    overlay.style.zIndex = "1"
    hide(overlay)
    body.classList.remove('no-scroll')
    // cerrarCarrito()



}

const finalizarCompra = () => {
    if (validarTextboxs()) {

        cerrarModal();
        cerrarCarrito();
        overlay.style.zIndex = "4"
        show(overlay)
        body.classList.add('no-scroll')
        modalSuccess.classList.add('mostrar-modal-notice')

    }
}

botonFinalizarCompra.onclick = () => {
    finalizarCompra();
};

overlay.onclick = () => {

    if (!modal.classList.contains("mostrar-modal")) {
        cerrarCarrito();
    }
}



