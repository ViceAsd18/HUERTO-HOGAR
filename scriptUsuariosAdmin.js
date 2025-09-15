$(function () {
  //Leer usuarios del localStorage
  let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

  //Inicializar DataTable
  const tabla = $('#tablaUsuarios').DataTable({
    data: usuarios,
    columns: [
      { data: 'run',      title: 'RUN' },
      { data: 'name',     title: 'Nombre' },
      { data: 'lastName', title: 'Apellido' },
      { data: 'correo',   title: 'Correo' },
      { data: 'rol',      title: 'Rol' },
      { data: 'region',   title: 'Región' },
      { data: 'commune',  title: 'Comuna' },
      {
        data: null, title: 'Acciones',  
        render: row => `<button class="btn-eliminar-usuario-admin" data-run="${row.run}">Eliminar</button>`
      }
    ],
    language: { url: 'https://cdn.datatables.net/plug-ins/1.13.8/i18n/es-ES.json' }
  });


  //Filtrar por Rol
  $('#filtroRol').on('change', function () {
    tabla.column(4).search(this.value).draw();
  });

  //Eliminar por RUN 
  $('#tablaUsuarios').on('click', '.btn-eliminar-usuario', function () {
    const run = $(this).data('run');
    if (!confirm(`¿Eliminar al usuario de run ${run}?`)) return;

    //quitar del arreglo
    usuarios = usuarios.filter(u => u.run !== run);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    //refrescar DataTable
    tabla.clear().rows.add(usuarios).draw();
  });
});
