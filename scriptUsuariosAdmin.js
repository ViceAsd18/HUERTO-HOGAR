//Carga usuarios en la tabla
function cargarUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const tbody = document.getElementById("tbodyUsuarios");
    tbody.innerHTML = "";

    usuarios.forEach((u, index) => {
    const fila = `
        <tr>
        <td>${u.run}</td>
        <td>${u.name}</td>
        <td>${u.lastName}</td>
        <td>${u.correo}</td>
        <td>${u.rol}</td>
        <td>${u.region}</td>
        <td>${u.commune}</td>
        
        <td>
            <button class="btn-eliminar-usuario-admin" onclick="eliminarUsuario(${index})">Eliminar</button>
        </td>
        </tr>
    `;
    tbody.innerHTML += fila;
    });
    }

function eliminarUsuario(index) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    if(confirm("¿Seguro que quieres eliminar este usuario?")) {
      usuarios.splice(index, 1);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      cargarUsuarios(); // recargo la tabla
    }
  }


document.addEventListener("DOMContentLoaded", cargarUsuarios);
