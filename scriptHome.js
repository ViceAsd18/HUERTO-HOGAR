function inicializarMenu() {
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));

    if (usuarioLogueado) {
        if (usuarioLogueado.correo.endsWith("@profesor.duoc.cl")) {
            document.getElementById("link-profesor").style.display = "block";
        }
    } else {
        window.location.href = "login.html";
        return;
    }

    // Botón de logout
    const btnLogout = document.getElementById("btn-logout");
    if (btnLogout) {
        btnLogout.addEventListener("click", () => {
            localStorage.removeItem("usuarioLogueado");
            window.location.href = "login.html";
        });
    }
    mostrarCarrito();
    actualizarContadorCarrito();
}

// Devuelve el RUN del usuario actual (o null si no hay sesión)
function getUsuarioRun() {
  const u = JSON.parse(localStorage.getItem("usuarioLogueado") || "null");
  return (u && u.run) ? u.run : null;
}

// Lee el carrito del usuario actual desde "carritos"
function leerCarrito() {
  const key = getUsuarioRun();            // RUN actual
  if (!key) return [];                    // sin sesión → sin carrito
  const carritos = JSON.parse(localStorage.getItem("carritos") || "{}");
  return carritos[key] || [];             // carrito del usuario o []
}

// Guarda el carrito del usuario actual dentro de "carritos"
function guardarCarrito(items) {
  const key = getUsuarioRun();            // RUN actual
  if (!key) return;
  const carritos = JSON.parse(localStorage.getItem("carritos") || "{}");
  carritos[key] = items;
  localStorage.setItem("carritos", JSON.stringify(carritos));
}

// Buscar producto por ID en el arreglo global window.productos
function obtenerProductoPorId(id) {
  return (window.productos || []).find(p => p.id === id);
}

// Agrega un producto al carrito por ID (si ya existe, suma cantidad)
function agregarAlCarritoPorId(idProducto) {
  const producto = obtenerProductoPorId(idProducto);
  if (!producto) {
    alert("Producto no encontrado");
    return;
  }

  const carrito = leerCarrito();
  const indice = carrito.findIndex(item => item.id === idProducto);

  if (indice >= 0) {
    carrito[indice].cantidad = (carrito[indice].cantidad || 1) + 1;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: Number(producto.precio),
      imagen: producto.imagen[0],
      cantidad: 1
    });
  }

  guardarCarrito(carrito);
  mostrarCarrito();
  actualizarContadorCarrito();
}

// Formatea número a CLP (miles)
function CLP(n) {
  return "$ " + Number(n).toLocaleString("es-CL");
}

// Sube o baja cantidad (mínimo 1)
function actualizarCantidad(idProducto, parCantidad) {
  const carrito = leerCarrito();
  const item = carrito.find(i => i.id === idProducto);

  item.cantidad = Math.max(1, (item.cantidad || 1) + parCantidad);
  guardarCarrito(carrito);
  mostrarCarrito();
  actualizarContadorCarrito();
}

// Elimina un producto por ID
function eliminarDelCarrito(idProducto) {
  let carrito = leerCarrito(); 
  carrito = carrito.filter(i => i.id !== idProducto);
  guardarCarrito(carrito);
  mostrarCarrito();
  actualizarContadorCarrito();
}

// Suma las cantidades de todos los productos del carrito
function contarUnidadesCarrito() {
  const carrito = leerCarrito();
  let total = 0;
  for (const producto of carrito) {
    const unidades = Number(producto.cantidad)
    total += unidades;
  }
  return total;
}

// Pone el total de unidades en <p id="contador-carrito">
function actualizarContadorCarrito() {
  const p = document.getElementById("contador-carrito");
  if (!p) return;
  const total = contarUnidadesCarrito();
  p.textContent = total;
}

//Plantilla para mostrar el carrito
function mostrarCarrito() {
  const cont = document.getElementById("carrito-lista");
  const totalEl = document.getElementById("total-precio");
  if (!cont || !totalEl) return;

  const carrito = leerCarrito();
  cont.innerHTML = "";

  if (!carrito.length) {
    cont.innerHTML = '<p>Tu carrito está vacío.</p>';
    totalEl.textContent = CLP(0);
    return;
  }

  let total = 0;

  carrito.forEach(prod => {
    const cantidad = prod.cantidad || 1;
    const subtotal = prod.precio * cantidad;
    total += subtotal;

    // Armar HTML de la fila (corregido con backticks)
    const imgHtml = prod.imagen
      ? `<img class="img-carrito" src="${prod.imagen}" alt="${prod.nombre}">`
      : "";

    const fila = document.createElement("div");
    fila.className = "fila-carrito";
    fila.innerHTML = `
      <div class="col-img">
        ${imgHtml}
      </div>
      <div class="col-info">
        <div class="nombre-carrito">${prod.nombre}</div>
        <div class="precio-unit">${CLP(prod.precio)} c/u</div>
      </div>
      <div class="col-cantidad">
        <button class="btn-menos" data-id="${prod.id}">-</button>
        <input class="cantidad" type="text" value="${cantidad}" readonly>
        <button class="btn-mas" data-id="${prod.id}">+</button>
      </div>
      <div class="col-acciones">
        <span class="subtotal">${CLP(subtotal)}</span>
        <button class="btn-eliminar" data-id="${prod.id}">X</button>
      </div>
    `;
    cont.appendChild(fila);
  });

  totalEl.textContent = CLP(total);

  // Conectar botones (+), (-) y (X)
  cont.querySelectorAll(".btn-mas").forEach(b =>
    b.onclick = () => actualizarCantidad(b.dataset.id, +1)
  );
  cont.querySelectorAll(".btn-menos").forEach(b =>
    b.onclick = () => actualizarCantidad(b.dataset.id, -1)
  );
  cont.querySelectorAll(".btn-eliminar").forEach(b =>
    b.onclick = () => eliminarDelCarrito(b.dataset.id)
  );
}

// Arranque
document.addEventListener("DOMContentLoaded", inicializarMenu);