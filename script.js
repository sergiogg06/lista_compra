// Función para guardar la lista en el localStorage
function guardarLista() {
    const listaItems = [];
    const items = document.querySelectorAll("#lista li");

    items.forEach(item => {
        const texto = item.querySelector("span").textContent;
        const completado = item.querySelector("input").checked;
        listaItems.push({ texto, completado });
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

// Función para agregar un nuevo item
function agregarItem(texto, completado = false) {
    let nuevoElemento = document.createElement("li");
    
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completado;

    let textoElemento = document.createElement("span");
    textoElemento.textContent = texto;
    textoElemento.classList.add(completado ? "comprado" : "pendiente");

    let eliminarBtn = document.createElement("button");
    eliminarBtn.textContent = "X";
    eliminarBtn.classList.add("eliminar");

    eliminarBtn.addEventListener("click", function() {
        nuevoElemento.remove();
        guardarLista(); // Guardar después de eliminar
    });

    checkbox.addEventListener("change", function() {
        if (checkbox.checked) {
            textoElemento.classList.remove("pendiente");
            textoElemento.classList.add("comprado");
        } else {
            textoElemento.classList.remove("comprado");
            textoElemento.classList.add("pendiente");
        }
        guardarLista(); // Guardar después de cambiar el estado del checkbox
    });

    nuevoElemento.appendChild(checkbox);
    nuevoElemento.appendChild(textoElemento);
    nuevoElemento.appendChild(eliminarBtn);
    document.getElementById("lista").appendChild(nuevoElemento);

    guardarLista(); // Guardar cuando se agrega un nuevo ítem
}

// Cargar la lista cuando la página se recarga
document.addEventListener("DOMContentLoaded", cargarLista);

// Evento para añadir un nuevo item
document.getElementById("agregar").addEventListener("click", function() {
    let item = prompt("¿Qué elemento quieres agregar a la lista de la compra?");
    if (!item) return;

    agregarItem(item);
});
