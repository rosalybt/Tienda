const botonEliminar = document.querySelector("#limpiar")
const busqueda = document.querySelector("#busqueda")
const listaCheckBox = document.querySelectorAll("input[type ='checkbox'][name='categoria']")



//funcion limpiar 
botonEliminar.onclick = () => {
    busqueda.value = ""

    for (let checkBox of listaCheckBox) {
        if (checkBox.checked) {
            checkBox.checked = false;
        }
    }

}


