//Datos de los productos

// Arreglo de objetos. Cada objeto representa un producto con sus datos.
// - id: identificador único (lo usaremos para saber qué producto es)
// - nombre: cómo se mostrará en la card
// - precio: valor del producto
// - imagen: ruta de la imagen que se mostrará en la card
// - desc: descripción larga del producto
// - stock: cuántas unidades disponibles
const productos = [
    { id:'FR001', nombre:'Manzanas Fuji', precio:1200, imagen:'assests/img/productos/manzana-fuji.png', desc:'Descripción: Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule.Perfectas para meriendas saludables o como ingrediente en postres. Estas manzanasson conocidas por su textura firme y su sabor equilibrado entre dulce y ácido.', stock:150 },

    { id:'FR002', nombre:'Naranjas Valencia', precio:1000, imagen:'assests/img/productos/naranja-valencia.png', desc:'Jugosas y ricas en vitamina C, estas naranjas Valencia son ideales parazumos frescos y refrescantes. Cultivadas en condiciones climáticas óptimas que aseguran su dulzura y jugosidad.', stock:200 },

    { id:'FR003', nombre:'Plátanos Cavendish', precio:800,  imagen:'assests/img/productos/platanos-cavendish.jpg', desc:'Plátanos maduros y dulces, perfectos para el desayuno o como snack energético. Estos plátanos son ricos en potasio y vitaminas, ideales para mantener una dieta equilibrada.', stock:250 },

    { id:'VR001', nombre:'Zanahorias Orgánicas', precio:900, imagen:'assests/img/productos/zanahoria-organica.jpg', desc:'Zanahorias crujientes cultivadas sin pesticidas en la Región de OHiggins. Excelente fuente de vitamina A y fibra, ideales para ensaladas, jugos o como snack saludable.', stock:100 },

    { id:'VR002', nombre:'Espinacas Frescas', precio:700 , imagen:'assests/img/productos/espinacas-frescas.jpg', desc:'Espinacas frescas y nutritivas, perfectas para ensaladas y batidos verdes. Estas espinacas son cultivadas bajo prácticas orgánicas que garantizan su calidad y valor nutricional.', stock:80},

    { id:'VR003', nombre:'Pimientos Tricolores', precio:1500 , imagen:'assests/img/productos/pimiento-tricolor.jpg', desc:'Pimientos rojos, amarillos y verdes, ideales para salteados y platos coloridos. Ricos en antioxidantes y vitaminas, estos pimientos añaden un toque vibrante y saludable a cualquier receta.', stock:120 },

    { id:'PO001', nombre:'Miel Orgánica', precio:5000 , imagen:'assests/img/productos/miel-organica.jpg', desc:'Miel pura y orgánica producida por apicultores locales. Rica en antioxidantes y con un sabor inigualable, perfecta para endulzar de manera natural tus comidas y bebidas.', stock: 50},

  ];


// FUNCIONES PARA MOSTRAR PRODUCTOS EN EL HTML
// =========================================
// 1) Capturar el contenedor donde irán las cards de producto
// El querySelector busca en el DOM el primer elemento con la clase .contenedor-listado-productos. Es un div en el HTML.
const contenedorProductos = document.querySelector('.contenedor-listado-productos');

// 2) Función que recibe un "producto" y devuelve el HTML de UNA "card"
// =====================================================================
// Esta función NO inserta nada. Solo construye un string HTML que se usa para subir los productos al html.
function agregarCardProducto(producto) {
    return `
    <div class="card producto-card" data-id="${producto.id}">
      <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
      <div class="card-body">
        <h5 class="card-title">${producto.nombre}</h5>
        <h6 class="card-precio">$${producto.precio}</h6>
        <button type="button"
                class="btn btn-primary btn-agregar"
                data-id="${producto.id}"
                data-nombre="${producto.nombre}"
                data-precio="${producto.precio}">
          Añadir
        </button>
      </div>
    </div>
  `;
}

// 3) Función que arma TODAS las cards y las añade en el contenedor
// - Recibe una lista de productos (array)
// - Usa .map(...) para convertir cada producto en su HTML de card
// - .join('') pega todos los strings en uno solo
// - innerHTML inserta el contenido dentro del div contenedor
function subirProductos(listaProductos) {
    
  if (!contenedorProductos) return; // Si no se encuentra el contenedor, salir de la función

  contenedorProductos.innerHTML = listaProductos.map(agregarCardProducto).join('');
}

// Llama a la función para mostrar los productos en la página
subirProductos(productos);
// FIN FUNCIONES PARA MOSTRAR PRODUCTOS EN EL HTML







