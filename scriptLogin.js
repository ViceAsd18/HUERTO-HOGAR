function loginUsuario(email,password){
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || []
    const usuario = usuarios.find(u => u.correo === email && u.password === password);
    if(usuario){

        alert("Bienvenido "+ usuario.nombre)

        localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
        window.location.href = "home.html";

    }else{
        alert("usuario desconocido:((")
    }
    

}