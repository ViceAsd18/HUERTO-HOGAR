//Datos de los productos

// Arreglo de objetos. Cada objeto representa un producto con sus datos.
// - id: identificador único (lo usaremos para saber qué producto es)
// - nombre: cómo se mostrará en la card
// - precio: valor del producto
// - imagen: ruta de la imagen que se mostrará en la card
// - desc: descripción larga del producto
// - stock: cuántas unidades disponibles

const rutaImg = 'assests/img/productos/';
const CATEGORIAS = ["Frutas Frescas", "Verduras Orgánicas", "Productos Orgánicos", "Productos Lácteos"];
const productos = [
    { id:'FR001', 
      nombre:'Manzanas Fuji', 
      precio:1200, 
      imagen:[`${rutaImg}manzana-fuji/manzana-fuji-1.png`,`${rutaImg}manzana-fuji/manzana-fuji-2.png`,`${rutaImg}manzana-fuji/manzana-fuji-3.png`], 
      desc:'Descripción: Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule.Perfectas para meriendas saludables o como ingrediente en postres. Estas manzanasson conocidas por su textura firme y su sabor equilibrado entre dulce y ácido.', 
      stock:150, categoria:'Frutas Frescas'},

    { id:'FR002', nombre:'Naranjas Valencia', precio:1000, imagen:[`${rutaImg}naranja-valencia/naranja-valencia-1.png`,`${rutaImg}naranja-valencia/naranja-valencia-2.png`,`${rutaImg}naranja-valencia/naranja-valencia-3.jpg`], desc:'Jugosas y ricas en vitamina C, estas naranjas Valencia son ideales parazumos frescos y refrescantes. Cultivadas en condiciones climáticas óptimas que aseguran su dulzura y jugosidad.', stock:200, categoria:'Frutas Frescas'},

    { id:'FR003', nombre:'Plátanos Cavendish', precio:800,  imagen:[`${rutaImg}platanos-cavendish/platanos-cavendish-1.jpg`,`${rutaImg}platanos-cavendish/platanos-cavendish-2.jpeg`,`${rutaImg}platanos-cavendish/platanos-cavendish-3.jpg`], desc:'Plátanos maduros y dulces, perfectos para el desayuno o como snack energético. Estos plátanos son ricos en potasio y vitaminas, ideales para mantener una dieta equilibrada.', stock:250, categoria:'Frutas Frescas'},

    { id:'VR001', nombre:'Zanahorias Orgánicas', precio:900, imagen:[`${rutaImg}zanahoria-organica/zanahoria-organica-1.jpg`,`${rutaImg}zanahoria-organica/zanahoria-organica-2.jpg`,`${rutaImg}zanahoria-organica/zanahoria-organica-3.jpg`], desc:'Zanahorias crujientes cultivadas sin pesticidas en la Región de OHiggins. Excelente fuente de vitamina A y fibra, ideales para ensaladas, jugos o como snack saludable.', stock:100, categoria:'Verduras Orgánicas' },

    { id:'VR002', nombre:'Espinacas Frescas', precio:700 , imagen:[`${rutaImg}espinacas-frescas/espinacas-frescas-1.jpg`,`${rutaImg}espinacas-frescas/espinacas-frescas-2.png`,`${rutaImg}espinacas-frescas/espinacas-frescas-3.png`], desc:'Espinacas frescas y nutritivas, perfectas para ensaladas y batidos verdes. Estas espinacas son cultivadas bajo prácticas orgánicas que garantizan su calidad y valor nutricional.', stock:80, categoria:'Verduras Orgánicas'},

    { id:'VR003', nombre:'Pimientos Tricolores', precio:1500 , imagen:[`${rutaImg}pimiento-tricolor/pimiento-tricolor-1.jpg`,`${rutaImg}pimiento-tricolor/pimiento-tricolor-2.jpg`,`${rutaImg}pimiento-tricolor/pimiento-tricolor-3.jpg`], desc:'Pimientos rojos, amarillos y verdes, ideales para salteados y platos coloridos. Ricos en antioxidantes y vitaminas, estos pimientos añaden un toque vibrante y saludable a cualquier receta.', stock:120, categoria:'Verduras Orgánicas'},

    { id:'PO001', nombre:'Miel Orgánica', precio:5000 , imagen:[`${rutaImg}miel-organica/miel-organica-1.jpg`,`${rutaImg}miel-organica/miel-organica-2.png`,`${rutaImg}miel-organica/miel-organica-3.png`], desc:'Miel pura y orgánica producida por apicultores locales. Rica en antioxidantes y con un sabor inigualable, perfecta para endulzar de manera natural tus comidas y bebidas.', stock: 50, categoria:'Productos Orgánicos'},

    {id:'PO003', nombre:'Quinua Orgánica', precio:4500, imagen:[`${rutaImg}quinoa-organica/quinoa-organica-1.png`,`${rutaImg}quinoa-organica/quinoa-organica-2.png`,`${rutaImg}quinoa-organica/quinoa-organica-3.png`], desc:'Grano andino 100% orgánico, cultivado en tierras altas sin pesticidas. Rica en proteínas, fibra y minerales, ideal para ensaladas, sopas o como acompañamiento nutritivo en tus comidas.', stock:60, categoria:'Productos Orgánicos'},
    
    {id:'PL001', nombre:'Leche Entera', precio:1200, imagen:[`${rutaImg}leche-entera/leche-entera-1.png`,`${rutaImg}leche-entera/leche-entera-2.png`,`${rutaImg}leche-entera/leche-entera-3.png`], desc:'Leche entera fresca proveniente de granjas locales. Rica en calcio y nutrientes esenciales, perfecta para el desayuno, preparar postres o acompañar tus comidas diarias.', stock:90, categoria:'Productos Lácteos'}
  ];


//UTILIDADES
function obtenerProductoPorId(id) {
  return productos.find(producto => producto.id === id);
}

//busca el producto actual por id, obtiene su categoria,
//devuelve todos los demás productos de esa misma categoría (excluyendo el producto con la id que se paso por parametro).
function obtenerRelacionadosPorCategoria(idProducto) {
  const producto = obtenerProductoPorId(idProducto);

  return productos.filter(p => p.categoria === producto.categoria && p.id !== idProducto);
}

// FUNCIONES PARA MOSTRAR PRODUCTOS EN EL HTML
// =========================================
// 1) Capturar el contenedor donde irán las cards de producto
// El querySelector busca en el DOM el primer elemento con la clase .contenedor-listado-productos. Es un div en el HTML.
const contenedorProductos = document.querySelector('.contenedor-listado-productos');

// 2) Función que recibe un "producto" y devuelve el HTML de UNA "card"
// =====================================================================
/**
Construye el HTML de una card de producto. 
- data-id en el div principal: se usa luego para navegar al detalle.
- data-id, data-nombre, data-precio en el botón: 
se usan para saber qué producto añadir al carrito.
 */

function agregarCardProducto(producto) {
    return `
    <div class="card producto-card" data-id="${producto.id}">
      <img src="${producto.imagen[0]}" class="card-img-top" alt="${producto.nombre}">
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
// - Recibe una lista de productos 
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





// Navegar al detalle al hacer click en la card (excepto el botón "Añadir")
if (contenedorProductos){
  contenedorProductos.addEventListener('click', (e) => {
    // Si fue el botón "Añadir", no navegamos
    if (e.target.closest('.btn-agregar')) return;

    //El .target captura el elemento donde se hizo click
    //.closest Sube desde el elemento clickeado hasta encontrar al elemento padre con la clase .producto-card (para luego obtener su id)
    const card = e.target.closest('.producto-card');

    // Tomar el id del producto desde data-id
    const id = card.dataset.id;
    // Redirigir a la página de detalle con el id en la URL
    window.location.href = `detalle_producto.html?id=${id}`;

  });  
}





// PÁGINA DE DETALLE
// Este bloque solo se ejecuta si estamos en detalle_producto.html
document.addEventListener('DOMContentLoaded', () => {
  const img = document.getElementById('img-principal');
  if (!img) return; // no está en detalle_producto

  //obtener el id del producto desde la URL (?id=...)
  const id = new URLSearchParams(location.search).get('id');

  //buscar el producto por id
  const p = obtenerProductoPorId(id);

  // Rellenar la informacion en el HTML
  img.src = p.imagen[0];              
  img.alt = p.nombre;

  const titulo = document.getElementById('titulo');
  const precio = document.getElementById('precio');
  const descripcion = document.getElementById('descripcion');
  const cantidad = document.getElementById('cantidad');

  if (titulo) titulo.textContent = p.nombre;
  if (precio) precio.textContent = '$' + Number(p.precio);
  if (descripcion) descripcion.textContent = p.desc;
  if (cantidad) cantidad.max = p.stock;

  //Agregar las miniaturas de las imagenes 
  const mini = document.getElementById('miniaturas');
  if (mini) {
    mini.innerHTML = `<button class="miniatura seleccionada"><img src="${p.imagen[0]}" alt="${p.nombre}"></button>
                      <button class="miniatura"><img src="${p.imagen[1]}" alt="${p.nombre}"></button>
                      <button class="miniatura"><img src="${p.imagen[2]}" alt="${p.nombre}"></button>
    `;
    //Evento para cambiar la imagen principal al hacer click en una miniatura
  mini.addEventListener('click', (e) => {
  const btn = e.target.closest('.miniatura');

  // buscar el botón que actualmente está seleccionado
  const seleccionado = mini.querySelector('.seleccionada');
  if (seleccionado) {
    seleccionado.classList.remove('seleccionada'); // se le quita la clase
  }

  // Añadir la clase al botón seleccionado
  btn.classList.add('seleccionada');

  // cambio la imagen principal
  const imgClicked = btn.querySelector('img');
  if (imgClicked) img.src = imgClicked.src;


});
  }

//Capturar el contenedor de productos relacionados || obtener los productos relacionados para mostrarlos debajo del detalle
const contRel = document.getElementById('contenedor-relacionados');
const relacionados = obtenerRelacionadosPorCategoria(id);

// Si no hay relacionados, mostrar un mensaje
if (!relacionados.length) {
  contRel.innerHTML = '<p class="texto-relacionados">No hay productos relacionados.</p>';
} else {
  contRel.innerHTML = relacionados.map(prod => {
    //Genera cada card de producto relacionado
    return `
      <div class="card producto-card" data-id="${prod.id}">
        <img src="${prod.imagen[0]}" class="card-img-top" alt="${prod.nombre}">
        <div class="card-body">
          <h6 class="card-title mb-1">${prod.nombre}</h6>
          <span class="card-precio">$${prod.precio}</span>
        </div>
      </div>
    `;
  }).join('');//Junta todas las cards en un solo String para añadirlo al contenedor
}

// navegación hacia el producto relacionado al hacer click en su card
contRel.addEventListener('click', (e) => {
  const card = e.target.closest('.producto-card');
  const idRelacionado = card.dataset.id;
  if (idRelacionado) {
    window.location.href = `detalle_producto.html?id=${idRelacionado}`;
  }
});
});
// FIN PÁGINA DE DETALLE