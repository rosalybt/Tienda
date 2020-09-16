const botonLimpiar = document.getElementById('boton-limpiar')
const filtroNombre = document.getElementById('busqueda')
const checkBoxes = document.querySelectorAll("input[type ='checkbox']")
const listaCheckBoxPuntaje = document.querySelectorAll("input[type ='checkbox'][name='puntuacion']")
const listaCheckBoxCategoria = document.querySelectorAll("input[type ='checkbox'][name='categoria']")
const cantidadProducto = document.querySelector('.cantidad-productos > p')
const totalProducto = document.getElementsByClassName('card-producto')
const productosOcultos = document.getElementsByClassName('card-producto hidden')
const tarjetas = document.getElementsByClassName('card-producto')
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



// =============================
//          FUNCIONES
// ============================


//funcion filtro por puntaje
for (let checkbox of listaCheckBoxPuntaje) {
    checkbox.onclick = () => {
        filtrarTarjetas();
    };

}

const hayCheckboxSeleccionado = () => {
    for (let checkbox of listaCheckBoxPuntaje) {
        if (checkbox.checked) {
            return true;
        }
    }
};

const coincidenCheckboxYTarjeta = tarjeta => {
    const rating = tarjeta.dataset.rating;
    for (let checkbox of listaCheckBoxPuntaje) {
        if (checkbox.value === rating && checkbox.checked) {
            return true;
        }
    }
};

const filtrarTarjetas = () => {
    for (let tarjeta of tarjetas) {
        tarjeta.classList.add('hidden');
        if (hayCheckboxSeleccionado()) {
            if (coincidenCheckboxYTarjeta(tarjeta)) {
                tarjeta.classList.remove('hidden');
            }
        }
        else {
            tarjeta.classList.remove('hidden')
        }
    }
    contarProductos(productosOcultos.length);
};

//devuelve el resultado de la cantidad de productos al hacer una busqueda
const contarProductos = (cantidad) => {
    cantidad = totalProducto.length - cantidad
    cantidadProducto.textContent = `Mostrando ${cantidad} producto(s) de ${totalProducto.length}`
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

const abrirCarrito = () => {
    body.classList.add('no-scroll')
    overlay.classList.remove('hidden')
    menuCarrito.classList.add('mostrar-carrito')
  
}

const cerrarCarrito = () => {
    overlay.classList.add('hidden')
    menuCarrito.classList.remove('mostrar-carrito')
    body.classList.remove('no-scroll')
}



//============================
//          Eventos
//============================

// filtrar busqueda por textbox
filtroNombre.oninput = () => {

    for (let tarjeta of tarjetas) {

        const titulo = tarjeta.dataset.nombre;
        const busqueda = filtroNombre.value;

        if (titulo.includes(busqueda)) {
            tarjeta.classList.remove('hidden');
        } else {
            tarjeta.classList.add('hidden');
        }
    }
    contarProductos(productosOcultos.length);
};


botonLimpiar.onclick = () => {
    filtroNombre.value = ""

    for (let checkBox of checkBoxes) {
        if (checkBox.checked) {
            checkBox.checked = false;
        }
    }

    for (let tarjeta of tarjetas) {
        tarjeta.classList.remove('hidden')
    }
    contarProductos(productosOcultos.length);
};


//  ver como lista o grilla
botonVerComoLista.onclick = () => {
    contenedorTarjetas.classList.add('list-view')
}

botonVerComoGrid.onclick = () => {
    contenedorTarjetas.classList.remove('list-view')
}

botonAbrirCarrito.onclick = () => {
    abrirCarrito();
}

botonCerrarCarrito.onclick = () => {
    cerrarCarrito();
}

botonRealizarCompra.onclick = () => {
    abrirModal();
}

botonSeguirComprando.onclick = () => {
    cerrarModal();
    cerrarCarrito();
}

botonFinalizarCompra.onclick = () => {
    cerrarModal();
}
