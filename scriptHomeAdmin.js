function validarRun(run) {
  let regex = /^[0-9]{7,8}[0-9Kk]$/;
  if (!regex.test(run)) {
    alert("El RUN no es válido. Ejemplo: 19011022K (sin puntos ni guión)");
    return false;
  }
  return true;
}

function validarEmail(email) {
  let regex = /^[\w.+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/; 
  if (regex.test(email)) {
    return true;
  } else {
    alert("El email debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com");
    return false;
  }
}

function confirmarEmail(emailx1, emailx2) {
  if (emailx2 === emailx1) return true;
  alert("El Email no coincide");
  return false;
}

function confirmarContraseña(passx1, passx2) {
  if (passx2 === passx1) return true;
  alert("La contraseña no coincide");
  return false;
}

function registrarUsuario(run, nombre, apellidos, email, emailx2, pass, passx2, cel, fechaNac, direccion, tipo, region, comuna) {
  if (!validarRun(run)) return;
  if (!validarEmail(email)) return;
  if (!confirmarEmail(email, emailx2)) return;
  if (!confirmarContraseña(pass, passx2)) return;

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  if (usuarios.find(u => u.run === run)) {
    alert("El RUN ya está registrado");
    return;
  }
  if (usuarios.find(u => u.correo === email)) {
    alert("El correo ya está registrado");
    return;
  }
  usuarios.push({run,nombre,apellidos,correo: email,password: pass,telefono: cel,fechaNacimiento: fechaNac,direccion,tipoUsuario: tipo,region,comuna});

  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  alert("Usuario registrado correctamente");
  mostrarUsuarios();
}

function eliminarUsuario(i) {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  usuarios.splice(i, 1);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  mostrarUsuarios();
}

function mostrarUsuarios() {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const lista = document.getElementById("lista-usuarios");
  if (!lista) return;
  lista.innerHTML = "";

  usuarios.forEach((u, i) => {
    const li = document.createElement("li");
    li.textContent = `${u.run} - ${u.nombre} ${u.apellidos} - ${u.correo} - ${u.region}/${u.comuna}`;

    const btn = document.createElement("button");
    btn.textContent = "Eliminar";
    btn.style.marginLeft = "10px";
    btn.onclick = function() {
      eliminarUsuario(i);
    };

    li.appendChild(btn);
    lista.appendChild(li);
  });
}

// Inicializar
window.onload = function() {
  mostrarUsuarios();
};
////////////////////////////////////////////////////////////////
function registrarAlimento(nombre, precio) {
    if (!nombre.trim()) {
        alert("El nombre del alimento no puede estar vacío");
        return;
    }
    const alimentos = JSON.parse(localStorage.getItem("alimentos")) || [];
    if (alimentos.find(a => a.nombre.toLowerCase() === nombre.toLowerCase())) {
        alert("Ese alimento ya está registrado");
        return;
    }
    alimentos.push({
        nombre: nombre,
        precio: parseInt(precio)
    });

    localStorage.setItem("alimentos", JSON.stringify(alimentos));
    alert("Alimento registrado correctamente");

    mostrarAlimentos();
}
function eliminarAlimento(index) {
    const alimentos = JSON.parse(localStorage.getItem("alimentos")) || [];
    alimentos.splice(index, 1);
    localStorage.setItem("alimentos", JSON.stringify(alimentos));
    mostrarAlimentos();
}



function mostrarAlimentos() {
    const alimentos = JSON.parse(localStorage.getItem("alimentos")) || [];
    const lista = document.getElementById("lista-alimentos");
    if (!lista) return;
    lista.innerHTML = "";

    alimentos.forEach((a, index) => {
        const li = document.createElement("li");
        li.textContent = `${a.nombre} - $${a.precio}`;

        // Botón eliminar
        const btn = document.createElement("button");
        btn.textContent = "X";
        btn.style.marginLeft = "10px";
        btn.onclick = function() {
            eliminarAlimento(index);
        };

        li.appendChild(btn);
        lista.appendChild(li);
    });
}

// Al cargar la página mostramos lo que ya exista
window.onload = function() {
    mostrarUsuarios();
    mostrarAlimentos();
};