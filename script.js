// Clase para representar un ítem de la lista de la compra
class ItemLista {
    constructor(texto, completado = false) {
        this.texto = texto;
        this.completado = completado;
    }

    // Función para cambiar el estado del ítem (completado o pendiente)
    toggleCompletado() {
        this.completado = !this.completado;
    }

    // Crear el elemento HTML correspondiente al ítem
    crearElemento() {
        const nuevoElemento = document.createElement("li");

        // Checkbox para marcar el estado del ítem
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = this.completado;

        // Texto del ítem
        let textoElemento = document.createElement("span");
        textoElemento.textContent = this.texto;
        textoElemento.classList.add(this.completado ? "comprado" : "pendiente");

        // Botón de eliminar
        let eliminarBtn = document.createElement("button");
        eliminarBtn.textContent = "X";
        eliminarBtn.classList.add("eliminar");

        // Acción para eliminar el ítem
        eliminarBtn.addEventListener("click", () => {
            this.eliminarElemento(nuevoElemento);
        });

        // Evento para cambiar el estado de completado
        checkbox.addEventListener("change", () => {
            this.toggleCompletado();
            textoElemento.classList.toggle("comprado", this.completado);
            textoElemento.classList.toggle("pendiente", !this.completado);
            guardarLista(); // Guardar después de cambiar el estado
        });

        nuevoElemento.appendChild(checkbox);
        nuevoElemento.appendChild(textoElemento);
        nuevoElemento.appendChild(eliminarBtn);

        return nuevoElemento;
    }

    // Eliminar el elemento de la lista
    eliminarElemento(elemento) {
        elemento.remove();
        guardarLista(); // Guardar después de eliminar
    }
}

// Función para guardar la lista en el localStorage
function guardarLista() {
    const listaItems = [];
    const items = document.querySelectorAll("#lista li");

    items.forEach(item => {
        const texto = item.querySelector("span").textContent;
        const completado = item.querySelector("input").checked;
        listaItems.push(new ItemLista(texto, completado)); // Crear un objeto ItemLista para cada ítem
    });

    localStorage.setItem("listaCompra", JSON.stringify(listaItems));
}

// Función para cargar la lista desde el localStorage
function cargarLista() {
    const listaGuardada = localStorage.getItem("listaCompra");
    if (!listaGuardada) return;

    const listaItems = JSON.parse(listaGuardada);

    listaItems.forEach(item => {
        agregarItem(item.texto, item.completado);
    });
}

// Función para agregar un nuevo ítem
function agregarItem(texto, completado = false) {
    const nuevoItem = new ItemLista(texto, completado);
    const nuevoElemento = nuevoItem.crearElemento();
    document.getElementById("lista").appendChild(nuevoElemento);
    guardarLista(); // Guardar después de agregar un nuevo ítem
}

// Función para borrar toda la lista
function borrarTodaLaLista() {
    const lista = document.getElementById("lista");
    lista.innerHTML = ""; // Borra todos los elementos de la lista en el DOM
    localStorage.removeItem("listaCompra"); // Elimina la lista del localStorage
}

// Cargar la lista cuando la página se recarga
document.addEventListener("DOMContentLoaded", cargarLista);

// Evento para añadir un nuevo ítem
document.getElementById("agregar").addEventListener("click", function() {
    let item = prompt("¿Qué elemento quieres agregar a la lista de la compra?");
    if (!item) return;

    agregarItem(item);
});

// Evento para borrar toda la lista
document.getElementById("borrar-todo").addEventListener("click", function() {
    borrarTodaLaLista();
});
