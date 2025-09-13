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


function registrarUsuario(run,name,lastName,emailx1,emailx2,passx1,passx2,BirthDate,region,commune){
    
    if(!validarEmail(emailx1)) return;
    if(!confirmarEmail(emailx1,emailx2)) return;
    if(!confirmarContraseña(passx1,passx2)) return;

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || []
    if (usuarios.find(u => u.correo === emailx1)){
        alert("Usuario registrado correctamente")
        return;
    }
    usuarios.push({run,name,lastName,correo:email,password: pass,fechaNacimiento: BirthDate,region,commune});
    //guardamos y actualizamos a JSON
    localStorage.setItem("usuarios",JSON.stringify(usuarios))
    alert("Usuario registrado")

}