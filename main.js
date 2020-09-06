const botonLimpiar = document.querySelector("#limpiar")
const filtroNombre = document.querySelector("#busqueda")
const checkBoxes = document.querySelectorAll("input[type ='checkbox']")

const tarjetas = document.getElementsByClassName('card-producto')



// funcion filtrar busqueda por textbox
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
};



//funcion limpiar 
botonLimpiar.onclick = () => {
    filtroNombre.value = ""

    for (let checkBox of checkBoxes) {
        if (checkBox.checked) {
            checkBox.checked = false;
        }
    }

};
