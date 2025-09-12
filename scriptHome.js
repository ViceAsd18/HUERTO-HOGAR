function inicializarMenu() {
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));

    if (usuarioLogueado) {
        if (usuarioLogueado.correo.endsWith("@profesor.duoc.cl")) {
            document.getElementById("link-profesor").style.display = "block";
        }
    } else {
        window.location.href = "login.html";
    }

    // Botón de logout
    const btnLogout = document.getElementById("btn-logout");
    if (btnLogout) {
        btnLogout.addEventListener("click", () => {
            localStorage.removeItem("usuarioLogueado");
            localStorage.removeItem("carrito");
            window.location.href = "login.html";
        });
    }
    mostrarCarrito();
}
//fuction para agregarlo a un btn (para agregarlo a un local)
function agregarAlCarrito(nombre, precio) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push({ nombre, precio });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}
//fuction para eliminarlo a un btn (po si lo necesitan)
function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1); 
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}
//el "mostrar carrito debe ir en el carrito xd"
function mostrarCarrito() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const lista = document.getElementById("lista-carrito");
    const totalSpan = document.getElementById("total-carrito");

    lista.innerHTML = "";

    let total = 0;

    carrito.forEach((item, index) => {
        let li = document.createElement("li");

        
        let texto = document.createTextNode(`${item.nombre} - $${item.precio}`);

        // Botón eliminar //esto se puede separar y que sea una fuction aparte
        let btnEliminar = document.createElement("button");
        btnEliminar.textContent = "X";
        btnEliminar.style.marginLeft = "10px";
        btnEliminar.onclick = () => eliminarDelCarrito(index);

        // Agregar texto + botón al <li>
        li.appendChild(texto);
        li.appendChild(btnEliminar);

        lista.appendChild(li);

        total += item.precio;
    });

    totalSpan.textContent = total;
}