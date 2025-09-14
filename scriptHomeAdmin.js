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
usuarios.push({run, name: nombre, lastName: apellidos, correo: email,password: pass,telefono: cel, fechaNacimiento: fechaNac || null, direccion,rol: tipo,
  region,
  commune: comuna
});

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


// -------------------- poblarRegiones --------------------
function poblarRegiones() {
// Captura el select de región del HTML
  const selRegion = document.getElementById('region');

//Limpia las opciones anteriores y deja "Seleccione region" por defecto
  selRegion.innerHTML = '<option value="">Seleccione región</option>';

// Recorre las claves de REGIONES y por cada una añade un <option> con ese texto
  Object.keys(REGIONES).forEach(r => selRegion.add(new Option(r, r)));
}



// Arreglo complementario: regiones -> comunas
const REGIONES = {
  "Región Metropolitana": [
    "Santiago", "Maipú", "Puente Alto", "La Florida", "Las Condes", "Ñuñoa", "Providencia", "La Reina", "Pudahuel", "Cerro Navia"
  ],
  "Región del Maule": [
    "Talca", "Linares", "Curicó", "San Clemente", "San Javier", "Longaví", "Parral", "Maule"
  ],
  "Región del Biobío": [
    "Concepción", "Talcahuano", "Hualpén", "San Pedro de la Paz", "Chiguayante", "Los Ángeles", "Lota", "Coronel"
  ],
  "Región de Ñuble": [
    "Chillán", "Chillán Viejo", "San Carlos", "Bulnes", "Quillón", "Yungay"
  ],
  "Región de La Araucanía": [
    "Temuco", "Padre Las Casas", "Villarrica", "Pucón", "Angol", "Victoria"
  ]
};


// -------------------- poblarComunas --------------------
// Creación de la función (llena el <select id="comuna"> según la región entregada en el parametro)
function poblarComunas(region) {
// Capturo el select de comuna del HTML
  const selComuna = document.getElementById('comuna');

// Limpia las opciones anteriores y deja "seleccione comuna" por defecto
  selComuna.innerHTML = '<option value="">Seleccione comuna</option>';

// Si la región existe en REGIONES...
  if (REGIONES[region]) {
    //recorre el arreglo de comunas y agrego un <option> por cada una
    REGIONES[region].forEach(c => selComuna.add(new Option(c, c)));
    // Habilito el select porque ya tiene opciones válidas
    selComuna.disabled = false;
  } else {
    // Si la región no existe (o está vacía), deshabilita el select de comunas
    selComuna.disabled = true;
  }
}

// -------------------- Inicialización al cargar la página --------------------
document.addEventListener('DOMContentLoaded', () => {
  // Llenar regiones al cargar
  poblarRegiones();

  // Cambiar comunas al cambiar región
  document.getElementById('region').addEventListener('change', (e) => {
    poblarComunas(e.target.value);
  });
});


// Enlazar el formulario de registro del admin
const formulario = document.getElementById("form-registro-admin");
if (formulario) {
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const run = document.getElementById("run").value;
    const nombre = document.getElementById("nombre").value;
    const apellidos = document.getElementById("apellidos").value;
    const email = document.getElementById("email").value;
    const email2 = document.getElementById("email2").value;
    const pass = document.getElementById("password").value;
    const pass2 = document.getElementById("password2").value;
    const cel = document.getElementById("cel").value;
    const nacimiento = document.getElementById("nacimiento").value;
    const rol = document.getElementById("rol").value;
    const region = document.getElementById("region").value;
    const comuna = document.getElementById("comuna").value;
    const direccion = document.getElementById("direccion").value;

    registrarUsuario(
      run, nombre, apellidos, email, email2, pass, pass2,
      cel, nacimiento, direccion, rol, region, comuna
    );

    formulario.reset()

  });
}
