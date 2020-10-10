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
const overlay = document.getElementById('overlay')
const botonRealizarCompra = document.getElementById('realizar-compra')
const botonSeguirComprando = document.getElementById('seguir-comprando')
const botonFinalizarCompra = document.getElementById('finalizar-compra')
const modal = document.querySelector('.modal-container')
const body = document.body

const textosCards = document.querySelectorAll('.texto')
const descripcionesProductos = document.querySelectorAll('.descripcion')
const contenidoProductos = document.querySelectorAll('.contenido-producto')



// =============================
//          FUNCIONES
// ============================

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
    hide(modal)

}

const abrirCarrito = () => {
    // botonAbrirCarrito.setAttribute("aria-hidden", "true")
    menuCarrito.setAttribute("aria-hidden", "false")
    show(menuCarrito)
    botonAbrirCarrito.tabIndex = -1
    body.classList.add('no-scroll')
    show(overlay)
    botonAbrirCarrito.setAttribute("aria-expanded", "true")
    menuCarrito.tabIndex = 0
    menuCarrito.focus();
    menuCarrito.classList.add('mostrar-carrito')


}



const cerrarCarrito = () => {
    // botonAbrirCarrito.setAttribute("aria-hidden","true")
    botonAbrirCarrito.tabIndex = 0

    hide(overlay)
    botonAbrirCarrito.setAttribute("aria-expanded", "false")
    menuCarrito.classList.remove('mostrar-carrito')
    body.classList.remove('no-scroll')
    menuCarrito.setAttribute("aria-hidden", "true")

}

const renglonSubtotal = document.querySelector(".renglon-subtotal")
const subtotal = Number(document.getElementById("monto-subtotal").textContent.replace('$', ''))

const renglonDescuento = document.querySelector(".renglon-descuento")
let descuento = document.getElementById("monto-descuento")

const renglonEnvio = document.querySelector(".renglon-envio")
const envio = document.getElementById("monto-envio")
console.log(renglonEnvio)
const renglonRecargo = document.querySelector(".renglon-recargo")
let recargo = document.getElementById("monto-recargo")

const renglonTotal = document.querySelector(".renglon-total")
let total = document.getElementById("monto-total")

const opcionesDePago = document.querySelectorAll(".opciones-de-pago")

const efectivo = document.querySelector("#efectivoDebito")
const credito = document.querySelector("#credito")
const envioOpcion = document.querySelector("#envio")
const tarjetaDescuento = document.querySelector("#descuento")

// calcular checkout
// subtotal.textContent = 5540

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

botonAbrirCarrito.onclick = () => {
    abrirCarrito();
};

botonCerrarCarrito.onclick = () => {
    cerrarCarrito();
};

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
