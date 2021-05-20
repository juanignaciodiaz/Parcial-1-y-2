(function (d, w) {
    // VARIABLES
    let idU = 0;
    let idP = 0;
    const contenedor = d.getElementById('contenido-pagina');
    let formulario = '';
    const rutas = {
        '/': {
            archivo: 'index.html',
            titulo: 'Principal'
        },
        '/productos': {
            archivo: 'productos.html',
            titulo: 'Productos'
        },
        '/comentarios': {
            archivo: 'comentarios.html',
            titulo: 'Comentarios'
        },
        '/registrar': {
            archivo: 'registrar.html',
            titulo: 'Registrarse'
        }
    }

    let productos = [];

    let usuarios = cargarUsuarios();

    // ======  EVENTOS ======
    d.addEventListener('readystatechange', function () {
        if (d.readyState === 'interactive') {
            iniciar();

        }
    });

    // ====== FUNCIONES ======

    function iniciar() {
        w.addEventListener('hashchange', function () {
            const ruta = w.location.hash;
            cargarPagina(ruta);

            if (ruta == '#/registrar') {
                // console.log(formulario);
            }
        });
        cargarPagina(w.location.hash);

    }

    function cargarPagina(r) {
        const ruta = rutas[r.substring(1)];

        fetch(`${w.location.origin}/assets/pages/${ruta.archivo}`, {
            method: 'GET'
        }).then(function (respuesta) {
            return respuesta.text();
        }).then(function (respuesta) {

            contenedor.innerHTML = '';
            contenedor.innerHTML = respuesta;
            d.title = ruta.titulo;

            if (w.location.hash == '#/registrar') {

                formulario = contenedor.getElementsByTagName('form')[0];

                formulario.regUrlImagen.addEventListener('input', function () {
                    let imagen = contenedor.getElementsByTagName('img')[0];

                    if (formulario.regUrlImagen.value.length != '') {
                        imagen.src = formulario.regUrlImagen.value;
                    } else {
                        imagen.src = 'assets/images/foto-incognito.jpg';
                    }
                })

                formulario.addEventListener('submit', function (e) {
                    e.preventDefault();

                    crearUsuario(formulario)
                })
            }



        });
    }

    // GUARDAR LOCALSTORAGE Y LISTA
    function usuariosLocalStorageLista(usuario) {
        usuarios.push(usuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        idU++;
    }
    function productosLocalStorageLista(producto) {
        productos.push(producto);
        localStorage.setItem('productos', JSON.stringify(productos));
    }

    // FUNCIONES
    function crearUsuario(user) {
        
        const regUsuario = user.regUsuario.value;
        const nombre = user.regNombre.value;
        const correo = user.regCorreo.value;
        const contrasenia = user.regCon.value;
        const rep_contrasenia = user.regRepCon.value;
        const fecha_nac = user.fechaN.value;
        const foto_perfil = user.regUrlImagen.value;

        // console.log(usuario);
        if (validarNuevoUsuario(user) && valUsuarioExiste(user)) {
            let usuario = {
                nomUsuario: regUsuario,
                nombre: nombre,
                correo: correo,
                contrasenia: contrasenia,
                fecha_nac: fecha_nac,
                foto: foto_perfil
            }
            usuariosLocalStorageLista(usuario);

        }
        // console.log(usuario.nombre);
        console.log(usuarios);
    }
    //  VALIDACIONES REGISTRO
    function validarNuevoUsuario(usuario) {
        let user = '';
        let confirmacion = false;
        if (usuario.regUsuario.value.length <= 4) {
            alert('Usuario');
            confirmacion = false;
        } else {
            confirmacion = true;
        }
        
        if (usuario.regNombre.value.length <= 4) {
            alert('Nombre');
            confirmacion = false;
        } else {
            confirmacion = true;
        }

        if (validarCorreo(usuario.regCorreo.value)){
            confirmacion = true;
        } else {
            confirmacion = false;
        }
    

        if (usuario.regCon.value.length <= 4) {
            alert('Contrasenia');
            confirmacion = false;
        } else {
            confirmacion = true;
        }

        if (usuario.regRepCon.value != usuario.regCon.value) {
            alert('Contraseña no es igual');
            confirmacion = false;
        } else {
            confirmacion = true;
        }

        if (validarFecha(usuario.fechaN.value)) {
            confirmacion = true;
        } else {
            confirmacion = false;
        }

        if (validarImagen(usuario.regUrlImagen.value)){
            confirmacion = true;
        } else {
            confirmacion = false;
        }


        // user = usuario;

        return confirmacion;
    }
    function validarFecha(fecha) {
        let val = false;
        let fecha_partes = fecha.split('-');
        let anio = parseInt(fecha_partes[0]);
        let mes = parseInt(fecha_partes[1]);
        let dia = parseInt(fecha_partes[2]);

        if (anio <= 1920) {
            alert('Año de nacimiento no valido');
        } else {
            val = true;
        }

        return val;
    }
    
    function validarCorreo(valor){
        re=/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
        let v = false;
        if(!re.exec(valor)){

            alert('email no válido');
        }
        else {
            alert('email válido');
            v = true;
        }

        return v;
    }

    function validarImagen(urlI) {
        let val = false;
        for(let i = 0; i <= urlI.length ; i++){
            if (urlI[i] == '.') {
                let tipo_archivo = urlI.slice(i);
                if (tipo_archivo == '.jpg' || tipo_archivo == '.jpeg' || tipo_archivo == '.gif') {
                    val = true;
                }
            }
        }
        return val;
    }

    function valUsuarioExiste(user) {
        let val = true;
        for (let i = 0; i <= usuarios.length; i++) {

            if (usuarios.length != 0) {
                
                if (user.regUsuario.value == usuarios[i].nomUsuario) {
                    alert('Nombre de usuario ya existe');
                    val = false;
                } else {
                    val = true;
                }
                
                if (user.regCorreo.value == usuarios[i].correo) {
                    alert('El correo ya existe');
                    val = false;
                } else {
                    val = true;
                }
            }
        }

        return val;
    }

    // FIN VALIDACIONES REGISTRO


    function cargarUsuarios() {
        let retorno = []
        if (localStorage.getItem('usuarios') != null) {
            retorno = JSON.parse(localStorage.getItem('usuarios'));
        }
        return retorno;
    }
    // PRODUCTOS
    function pintarProductos() {

    }
})(document, window);