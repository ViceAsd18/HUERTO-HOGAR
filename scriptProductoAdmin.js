$(function () {
  const data = obtenerProductos();

  const tabla = $('#tablaProductos').DataTable({
    data,
    columns: [
      { data: 'id',        title: 'ID' },
      { data: 'nombre',    title: 'Nombre' },
      { data: 'categoria', title: 'Categoría' },
      { data: 'precio',    title: 'Precio', render: v => '$' + Number(v||0).toLocaleString('es-CL') },
      { data: 'stock',     title: 'Stock' },
    ],
    language: { url: 'https://cdn.datatables.net/plug-ins/1.13.8/i18n/es-ES.json' }
  });



  //Filtro por categoría
  $('#filtroCategoria').on('change', function () {
    tabla.column(2).search(this.value).draw();
  });

  //Botón Agregar
  $('#btn-agregar').on('click', () => {
    location.href = 'agregar_producto.html';
  });



});
