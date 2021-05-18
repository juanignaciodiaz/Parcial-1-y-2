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
                console.log(formulario);
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

        let usuario = {
            nomUsuario: regUsuario,
            nombre: nombre,
            correo: correo,
            contrasenia: contrasenia,
            fecha_nac: fecha_nac
        }
        console.log(usuario);
        // if (validarNuevoUsuario(usuario)) {
        usuariosLocalStorageLista(usuario);

        // }
        console.log(usuario.nombre);
        console.log(usuarios);
    }
    function validarNuevoUsuario(usuario) {
        let user = '';
        let confirmacion = false;
        if (usuario.nomUsuario.length <= 4) {
            alert('Usuario');

        }
        if (usuario.nombre.length <= 4) {
            alert('Nombre');
        }

        if (usuario.correo.length <= 4) {
            alert('Correo');
        }

        if (usuario.contrasenia.length <= 4) {

        }


        user = usuario

        return user;
    }

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