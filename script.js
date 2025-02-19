// hacemos la funcion añadir
document.getElementById("agregar").addEventListener("click", function() {
    let item = prompt("¿Qué elemento quieres agregar a la lista de la compra?"); 
    if (!item) return; // Si no entra ningun elemento o se le da a cancel automaticamente hace un return y deja de pedir elementos
    
    let nuevoElemento = document.createElement("li"); // creamos un li para añadirlo a la lista
    //  Aqui esto es importante ya que creamos un input de tipo checkbox 
    let checkbox = document.createElement("input"); 
    checkbox.type = "checkbox";
    // Se crea el span y se le añade el contenido del item
    let texto = document.createElement("span");
    texto.textContent = item;
    texto.classList.add("pendiente");
    
    checkbox.addEventListener("change", function() {
        if (checkbox.checked) {
            texto.classList.remove("pendiente");
            texto.classList.add("comprado");
        } else {
            texto.classList.remove("comprado");
            texto.classList.add("pendiente");
        }
    });
    
    nuevoElemento.appendChild(checkbox);
    nuevoElemento.appendChild(texto);
    document.getElementById("lista").appendChild(nuevoElemento);
});

