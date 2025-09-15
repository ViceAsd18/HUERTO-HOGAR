function loginUsuario(){

    // Capturo los valores del formulario
    const email = document.getElementById("login-email").value
    const password = document.getElementById("login-password").value

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || []
    const usuario = usuarios.find(u => u.correo === email); //Borre la validadcion de la contraseña por que la implemento despues para mostrar el alert

    if(!usuario) {
        alert("No existe un usuario con ese correo.");
        return false; //para que el formulario no c envie
    }    
    
    if(usuario.password !== password) {
        alert("Contraseña incorrecta."); /*Agrege esto por que cuando ingresaba el correo bien y la contraseña mal me salia que el usuario no fue encontrado*/
        return false; //lo mismo
    }

    //Guarda sesion del usuario logueado
    localStorage.setItem("usuarioLogueado", JSON.stringify({
    run: usuario.run,
    correo: usuario.correo,
    rol: usuario.rol,
    name: usuario.name,
    lastName: usuario.lastName
    }));

    // Decide destino según rol
    var destino

    if (usuario.rol === "admin") {
        destino = "home_admin.html";
    } else if (usuario.rol === "cliente") {
        destino = "home.html";
    } else {
        destino = "home.html";
    }

    //Redirección
    window.location.href = destino;

    return false;


}