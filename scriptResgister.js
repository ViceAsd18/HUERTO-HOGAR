function validarEmail(email) {
    let regex = /^[\w.+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/; 
    if (regex.test(email)) {
        return true;
    } else {
        alert("El email debe ser de la institución (@duoc.cl)");
        return false;
    }
}

function confirmarEmail(emailx1,emailx2){
    if (emailx2 === emailx1){
        return true
    }else{
        alert("El Email No coincide")
        return false;
    }
}
 
function confirmarContraseña(passx1,passx2) {
    if (passx2 === passx1) {
        return true;
    } else {
        alert("La contraseña no coincide");
        return false;
    }
}


function registrarUsuario(run,name,lastName,emailx1,emailx2,passx1,passx2,BirthDate,region,commune,rol){
    
    if(!validarEmail(emailx1)) return false;
    if(!confirmarEmail(emailx1,emailx2)) return false;
    if(!confirmarContraseña(passx1,passx2)) return false;

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || []
    if (usuarios.find(u => u.correo === emailx1)){
        alert("Usuario registrado correctamente")
        return;
    }
      // Guardar (usar los nombres correctos)
  usuarios.push({run,name,lastName, correo: emailx1, password: passx1, fechaNacimiento: BirthDate || null, region, commune, rol
  });
    //guardamos y actualizamos a JSON
    localStorage.setItem("usuarios",JSON.stringify(usuarios))
    alert("Usuario registrado")
    return true

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

// -------------------- poblarRegiones --------------------
function poblarRegiones() {
// Captura el select de región del HTML
  const selRegion = document.getElementById('region');

//Limpia las opciones anteriores y deja "Seleccione region" por defecto
  selRegion.innerHTML = '<option value="">Seleccione región</option>';

// Recorre las claves de REGIONES y por cada una añade un <option> con ese texto
  Object.keys(REGIONES).forEach(r => selRegion.add(new Option(r, r)));
}


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


const formulario = document.getElementById('form-registro');
  formulario.addEventListener('submit', function (e) {
    e.preventDefault();

    const run        = document.getElementById('run').value;
    const name       = document.getElementById('nombre').value;
    const lastName   = document.getElementById('apellidos').value;
    const email1     = document.getElementById('email').value;
    const email2     = document.getElementById('confirm-email').value;
    const pass1      = document.getElementById('password').value;
    const pass2      = document.getElementById('confirmPassword').value;
    const birthDate  = document.getElementById('nacimiento').value;
    const region     = document.getElementById('region').value;
    const commune    = document.getElementById('comuna').value;

    // Llamar a la función que guarda en localStorage
    const usuarioRegistrar = registrarUsuario(
      run, name, lastName,
      email1, email2,
      pass1, pass2,
      birthDate, region, commune,
      "cliente"
    );

    // Si todo salió bien, limpio el formulario
    if (usuarioRegistrar) {
      formulario.reset();
      document.getElementById('comuna').disabled = true;

      //Redirigir al login
      window.location.href = "login.html"

    }
  });