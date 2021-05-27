(function (d, w) {
    // VARIABLES

    //  usuario registrado
    let usuario_log = cargarUsuarioIniciado();
    // -------------------
    let idU = 0;
    let idP = 0;
    const contenedor = d.getElementById('contenido-pagina');
    let formulario = '';
    const rutas = {
        '': {
            archivo: 'principal.html',
            titulo: 'Principal'
        },
        '/': {
            archivo: 'principal.html',
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
        },
        '/inicio_sesion': {
            archivo: 'inicio_sesion.html',
            titulo: 'Inicio Sesión'
        },
        '/crear_producto': {
            archivo: 'crear_producto.html',
            titulo: 'CRUD producto'
        },
        '/contacto': {
            archivo: 'contacto.html',
            titulo: 'Contacto'
        }
    }


    const url = 'https://mindicador.cl/api/dolar'
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let element = document.getElementById('cambioDivisa')
            element.innerHTML = ` 
        <p>${data.nombre}</p>
        <p>${data.serie[0].valor}</p>`
            console.log(data)
        })
        .catch(err => console.log(err))


    setInterval(function () { mostrarhora() }, 1000);

    let productos = cargarProductos();

    let usuarios = cargarUsuarios();

    let comentario = cargarComentarios();

    // ======  EVENTOS ======
    d.addEventListener('readystatechange', function () {
        if (d.readyState === 'interactive') {
            iniciar();
            // usuarioVacio();
            validarUsuarioIniciado();
            for (const i in productos) {
                idP = productos[i].id;
            }
            if (w.location.hash == '#/crear_producto') {
                for (const i in productos) {
                    idP = productos[i].id + 1;
                }
            }
            verificarLocalStorageUsuarioLog();
        }
    });

    // ====== FUNCIONES ======

    function iniciar() {
        w.addEventListener('hashchange', function () {
            const ruta = w.location.hash;

            cargarPagina(ruta);
            validarUsuarioIniciado();
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
            const contenedor = d.getElementById('contenido-pagina');
            contenedor.innerHTML = '';
            contenedor.innerHTML = respuesta;
            d.title = ruta.titulo;

            // console.log(`${w.location.origin}/assets/pages/${ruta.archivo}`);
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
                });

                formulario.addEventListener('submit', function (e) {
                    e.preventDefault();

                    crearUsuario(formulario)
                });


            } else if (w.location.hash == '#/inicio_sesion') {
                formulario = contenedor.getElementsByTagName('form')[0];
                formulario.addEventListener('submit', function (e) {
                    e.preventDefault();
                    iniciarSesion(formulario);

                });


            } else if (w.location.hash == '#/productos') {
                let lista_plegable = contenedor.querySelectorAll('.lista-filtro-producto li');
                usuario_iniciado_producto();
                pintarProductos();

                // lista_plegable[1].addEventListener('click', function(){
                //     lista_plegable[1].children[0].classList.toggle('desplegar');
                // });

                // lista_plegable[5].addEventListener('click', function(){
                //     lista_plegable[5].children[0].classList.toggle('desplegar');
                // });
                // lista_plegable[9].addEventListener('click', function(){
                //     lista_plegable[9].children[0].classList.toggle('desplegar');
                // });

            } else if (w.location.hash == '#/crear_producto') {
                let imagen = contenedor.getElementsByTagName('img')[0];
                pintarProductosCRUD(contenedor);
                formulario = contenedor.getElementsByTagName('form')[0];

                formulario.boton_editar.disabled = true;
                formulario.boton_editar.style.opacity = '.6';

                formulario.id_producto.value = idP;
                formulario.addEventListener('submit', function (e) {
                    e.preventDefault();
                    if (validarNuevoProducto(formulario)) {
                        crearCartaProducto(formulario);

                        let objeto_producto = {
                            id: idP,
                            nombre: formulario.titulo_producto.value,
                            precio: formulario.precio_producto.value,
                            t_producto: formulario.tipo_producto.value,
                            imagen: formulario.imagen.value
                        }


                        productosLocalStorageLista(objeto_producto);
                    }

                });
                formulario.imagen.addEventListener('input', function () {
                    imagen.src = formulario.imagen.value;
                });
            } else if (w.location.hash == '#/comentarios') {
                formulario = contenedor.getElementsByTagName('form')[0];
                let contenido_lista = contenedor.querySelector('main section article div ul');
                let condition_user = contenedor.querySelector('.comments-container p');


                formulario.style.display = 'none';
                pintarComentario(contenido_lista);
                if (usuario_log.length != 0) {
                    condition_user.style.display = 'none';
                    formulario.style.display = 'block';


                    formulario.addEventListener('submit', function (e) {
                        console.log(contenido_lista);
                        e.preventDefault();
                        console.log();
                        let objeto_comentario = {
                            foto: usuario_log.foto,
                            nombre: usuario_log.usuario_nombre,
                            comentario: formulario.comentario.value
                        }

                        comentariosLocalStorageLista(objeto_comentario);
                        crearComentario(objeto_comentario, contenido_lista);
                        formulario.reset();

                    });
                }
            } else if (w.location.hash == '#/contacto') {

                formulario = contenedor.getElementsByTagName('form')[0];

                formulario.addEventListener('submit', function (evento) {
                    evento.preventDefault();
                    formulario.addEventListener('submit', function (e) {
                        e.preventDefault();
                        alert('Haz sido registrado');


                    });
                });
            } else if (w.location.hash == '#/'){
                console.log('Aca');

                
            }
            verificarLocalStorageUsuarioLog();

        });
    }

    function verificarLocalStorageUsuarioLog(){
        if (!localStorage.getItem('usuario_iniciado')) {
            let li = d.getElementById('lista-iniciar-S');
            let li_reg = d.getElementById('lista-registrar');
            let li_cerrar = d.getElementById('cerrar-cuenta')
            li.style.display = 'block';
            li_reg.style.display = 'block';
            li_cerrar.style.display = 'none';
        } else {
            console.log('Nop');
        }
    }


    function cargarDatosDesdeLocalStorage() {
        let retorno = [];
        if (localStorage.getItem('personas') !== null) {
            retorno = JSON.parse(localStorage.getItem('personas'));
        }
        return retorno;
    }

    // const datosUsuario = cargarDatosDesdeLocalStorage();
    // formulario = document.getElementsByTagName('form')[0];



    // GUARDAR LOCALSTORAGE Y LISTA
    function usuariosLocalStorageLista(usuario) {
        usuarios.push(usuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        idU++;
    }

    function iniciarSesionLocalStorageLista(usuario) {
        usuario_log = usuario;
        localStorage.setItem('usuario_iniciado', JSON.stringify(usuario));
    }

    function productosLocalStorageLista(producto) {
        productos.push(producto);
        localStorage.setItem('productos', JSON.stringify(productos));
        idP++;
    }

    function comentariosLocalStorageLista(comentarios) {
        comentario.push(comentarios);
        localStorage.setItem('comentarios', JSON.stringify(comentario));
    }


    function pintarComentario(contenido_comentario) {
        for (const i in comentario) {
            // console.log(comentario[i]);
            crearComentario(comentario[i], contenido_comentario);
        }
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

        console.log(regUsuario);
        if (validarNuevoUsuario(user)) {
            let usuario = {
                usuario_nombre: regUsuario,
                nombre: nombre,
                correo: correo,
                contrasenia: contrasenia,
                fecha_nac: fecha_nac,
                foto: foto_perfil
            }
            // console.log(usuario.usuario_nombre);
            usuariosLocalStorageLista(usuario);
            formulario.reset();
        }
        // console.log(usuario.nombre);
        // console.log(usuarios);
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

        if (validarCorreo(usuario.regCorreo.value)) {
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

        if (validarImagen(usuario.regUrlImagen.value)) {
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

    function validarCorreo(valor) {
        re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
        let v = false;
        if (!re.exec(valor)) {

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
        for (let i = 0; i <= urlI.length; i++) {
            if (urlI[i] == '.') {
                let tipo_archivo = urlI.slice(i);
                if (tipo_archivo == '.jpg' || tipo_archivo == '.jpeg' || tipo_archivo == '.gif') {
                    val = true;
                }
            }
        }
        return val;
    }

    // FIN VALIDACIONES REGISTRO
    // INICIAR SESION
    function iniciarSesion(usuario) {
        let validacion = false;
        for (const i in usuarios) {

            if (usuarios[i].usuario_nombre == usuario.logUsuario.value) {

                validacion = true;

                if (usuarios[i].contrasenia == usuario.logContrasena.value) {
                    // alert('Contraseña existe');
                    validacion = true;
                } else {
                    usuario.logContrasena.style.border = '2px solid red';
                    // alert('Contraseña no existe');
                    validacion = false;
                }

            } else {
                usuario.logUsuario.style.border = '2px solid red';
                // alert('No existe');
                validacion = false;
            }


            if (validacion) {
                // console.log(usuarios[i]);
                usuario_log = usuarios[i];
                iniciarSesionLocalStorageLista(usuarios[i]);
                w.location.hash = '#/productos';
                break;
            }
        }
    }

    // function usuarioVacio() {
    //     if (usuario_log.length != null || usuario_log != '') {
    //         let barra_ingreso = d.getElementsByTagName('ul')[0].children;

    //         barra_ingreso[0].classList.toggle('bloqueada');
    //     }
    // }
    // FIN INCIAR SESION
    //  USUARIO INICIADO
    function validarUsuarioIniciado() {
        let listaInicioRegistro = d.getElementsByClassName('lista-sesion');
        if (usuario_log.length != 0) {
            console.log(listaInicioRegistro);
            console.log(listaInicioRegistro[0]);
            listaInicioRegistro[0].style.display = 'none';
            listaInicioRegistro[1].style.display = 'none';
            listaInicioRegistro[2].style.display = 'block';

            cerrarSesion();

        } else {
            
            // console.log('Vacio?');
            // console.log(usuario_log.length);
        }
    }
    function cerrarSesion() {
        let botonSalir = d.getElementById('cerrar-cuenta');
        
        botonSalir.addEventListener('click', function () {
            localStorage.setItem('usuario_iniciado', []);
            // console.log([].length);
            // li.style.display = 'block';
            w.location.hash = '#/';
        });
    }
    // FIN USUARIO INICIADO

    // PAGINA PRODUCTOS
    function usuario_iniciado_producto() {
        let btn_redirigir_crear = contenedor.getElementsByClassName('crear-producto')[0];
        if (usuario_log.length != 0) {
            btn_redirigir_crear.style.display = 'block';

            btn_redirigir_crear.addEventListener('click', function () {
                w.location.hash = '#/crear_producto'
            });
        } else {
            btn_redirigir_crear.style.display = 'none';

        }
    }

    // Funciones de la página comentarios

    function crearComentario(obj_comentario, contenido) {

        const lista = d.createElement('li');
        lista.setAttribute('class', 'comments-list');

        const comment_main_level = d.createElement('div');
        comment_main_level.setAttribute('class', 'comment-main-level');

        const comment_avatar = d.createElement('div');
        comment_avatar.setAttribute('class', 'comment-avatar');
        comment_main_level.appendChild(comment_avatar);

        const avatar_img = d.createElement('img');
        avatar_img.setAttribute('src', obj_comentario.foto);
        comment_avatar.appendChild(avatar_img);

        const comment_box = d.createElement('div');
        comment_box.setAttribute('class', 'comment-box');
        comment_main_level.appendChild(comment_box);

        const comment_head = d.createElement('div');
        comment_head.setAttribute('class', 'comment-head');
        comment_box.appendChild(comment_head);

        const comment_name = d.createElement('h6');
        comment_name.setAttribute('class', 'comment-name');
        comment_name.innerText = obj_comentario.nombre;
        comment_head.appendChild(comment_name);

        const comment_date = d.createElement('span');
        comment_date.setAttribute('id', 'comment-date');
        comment_date.innerText = 'Hace un momento';
        comment_head.appendChild(comment_date);

        const comment_icon_like = d.createElement('i');
        comment_icon_like.setAttribute('class', 'fas fa-thumbs-up');
        comment_head.appendChild(comment_icon_like);

        const comment_icon_edit = d.createElement('i');
        comment_icon_edit.setAttribute('class', 'fas fa-pencil-alt');
        comment_head.appendChild(comment_icon_edit);

        const comment_icon_share = d.createElement('i');
        comment_icon_share.setAttribute('class', 'fas fa-share-alt');
        comment_head.appendChild(comment_icon_share);

        const comment_content = d.createElement('div');
        comment_content.setAttribute('class', 'comment-content');
        comment_content.innerText = obj_comentario.comentario;
        comment_box.appendChild(comment_content);


        lista.appendChild(comment_main_level);
        contenido.appendChild(lista);
    }



    // FIN PAGINA PRODUCTOS
    // PAGINA CREAR PRODUCTO
    function cargarComentarios() {
        let retorno = []
        if (localStorage.getItem('comentarios') != null) {
            retorno = JSON.parse(localStorage.getItem('comentarios'));
        }
        return retorno;
    }

    function crearCartaProducto(parametro) {
        let contenedorGrande = contenedor.querySelector('section #lista-productos');

        let contenedorCartaProducto = d.createElement('article');

        let cartaProducto = d.createElement('section');
        cartaProducto.setAttribute('class', 'card mb-1');
        cartaProducto.setAttribute('style', 'width: 13rem;');
        contenedorCartaProducto.appendChild(cartaProducto);

        let imagenCarta = d.createElement('img');
        imagenCarta.setAttribute('src', parametro.imagen.value);
        imagenCarta.setAttribute('class', 'card-img-top');
        cartaProducto.appendChild(imagenCarta);

        let cuerpoCarta = d.createElement('article');
        cuerpoCarta.setAttribute('class', 'card-body');
        cartaProducto.appendChild(cuerpoCarta);

        let tituloProducto = d.createElement('h5');
        tituloProducto.setAttribute('class', 'card-title');
        tituloProducto.innerText = parametro.titulo_producto.value;
        cuerpoCarta.appendChild(tituloProducto);

        let parrafoCarta = d.createElement('p');
        parrafoCarta.setAttribute('class', 'card-text');
        parrafoCarta.innerText = parametro.precio_producto.value;
        cuerpoCarta.appendChild(parrafoCarta);

        let btnEditar = d.createElement('button');
        btnEditar.setAttribute('class', 'btn-success');
        btnEditar.innerText = 'Editar';
        cuerpoCarta.appendChild(btnEditar);

        let btnEliminar = d.createElement('button');
        btnEliminar.setAttribute('class', 'btn-danger');
        btnEliminar.innerText = 'Eliminar';
        cuerpoCarta.appendChild(btnEliminar);

        contenedorGrande.appendChild(contenedorCartaProducto);

    }

    function validarNuevoProducto(parametro) {
        let confirmacion = true;
        if (parametro.titulo_producto.value.length <= 4) {
            alert('Titulo producto');
            confirmacion = false;
        } else {
            confirmacion = true;
        }

        if (parametro.tipo_producto.value == '') {
            alert('No hay producto');
            confirmacion = false;
        } else {
        }

        console.log(confirmacion);
        return confirmacion;
    }

    function cargarProductos() {
        let retorno = [];
        if (localStorage.getItem('productos') != null) {
            retorno = JSON.parse(localStorage.getItem('productos'));
        }
        return retorno;
    }

    function editarProducto(parametro, prodc) {
        parametro.boton_editar.disabled = false;
        parametro.boton_editar.style.opacity = '1';
        parametro.id_producto.value = prodc.id;
        parametro.titulo_producto.value = prodc.nombre;
        parametro.precio_producto.value = prodc.precio;
        parametro.tipo_producto.value = prodc.t_producto;
        parametro.imagen.value = prodc.imagen;

        parametro.boton_editar.addEventListener('click', function () {
            for (const i in productos) {
                if (prodc.id == productos[i].id) {
                    productos[i].nombre = parametro.titulo_producto.value;
                    productos[i].precio = parametro.precio_producto.value;
                    productos[i].t_producto = parametro.tipo_producto.value;
                    productos[i].imagen = parametro.imagen.value;

                }
            }

            localStorage.setItem('productos', JSON.stringify(productos));

            formulario.reset();
            formulario.boton_guardar.disabled = false;
            formulario.boton_guardar.style.opacity = '1';

            formulario.boton_editar.disabled = true;
            formulario.boton_editar.style.opacity = '.6';
        })


    }
    // FIN PAGINA CREAR PRODUCTOS
    function cargarUsuarios() {
        let retorno = []
        if (localStorage.getItem('usuarios') != null) {
            retorno = JSON.parse(localStorage.getItem('usuarios'));
        }
        return retorno;
    }

    function cargarUsuarioIniciado() {
        let retorno = [];
        if (localStorage.getItem('usuario_iniciado')) {
            retorno = JSON.parse(localStorage.getItem('usuario_iniciado'));
        }

        return retorno;
    }
    // PRODUCTOS
    function pintarProductos() {
        for (const i in productos) {
            let contenedorGrande = contenedor.querySelector('#contenido-pagina section .articulos section');

            let contenedorCartaProducto = d.createElement('article');

            let cartaProducto = d.createElement('section');
            cartaProducto.setAttribute('class', 'card mb-1');
            cartaProducto.setAttribute('style', 'width: 13rem;');
            contenedorCartaProducto.appendChild(cartaProducto);

            let imagenCarta = d.createElement('img');
            imagenCarta.setAttribute('src', productos[i].imagen);
            imagenCarta.setAttribute('class', 'card-img-top');
            cartaProducto.appendChild(imagenCarta);

            let cuerpoCarta = d.createElement('article');
            cuerpoCarta.setAttribute('class', 'card-body');
            cartaProducto.appendChild(cuerpoCarta);

            let tituloProducto = d.createElement('h5');
            tituloProducto.setAttribute('class', 'card-title');
            tituloProducto.innerText = productos[i].nombre;
            cuerpoCarta.appendChild(tituloProducto);

            let parrafoCarta = d.createElement('p');
            parrafoCarta.setAttribute('class', 'card-text');
            parrafoCarta.innerText = '$' + productos[i].precio;
            cuerpoCarta.appendChild(parrafoCarta);

            let btncomprar = d.createElement('a');
            btncomprar.setAttribute('class', 'btn btn-primary');
            btncomprar.innerText = 'Comprar';
            cuerpoCarta.appendChild(btncomprar);

            contenedorGrande.appendChild(contenedorCartaProducto);
        }
    }

    function pintarProductosCRUD(con) {
        for (const i in productos) {

            let contenedorGrande = contenedor.querySelector('section #lista-productos');

            let contenedorCartaProducto = d.createElement('article');
            contenedorCartaProducto.setAttribute('class', 'mr-2');
            contenedorCartaProducto.setAttribute('id', productos[i].id);

            let cartaProducto = d.createElement('section');
            cartaProducto.setAttribute('class', 'card mb-1');
            cartaProducto.setAttribute('style', 'width: 13rem;');
            contenedorCartaProducto.appendChild(cartaProducto);

            let imagenCarta = d.createElement('img');
            imagenCarta.setAttribute('src', productos[i].imagen);
            imagenCarta.setAttribute('class', 'card-img-top');
            cartaProducto.appendChild(imagenCarta);

            let cuerpoCarta = d.createElement('article');
            cuerpoCarta.setAttribute('class', 'card-body');
            cartaProducto.appendChild(cuerpoCarta);

            let tituloProducto = d.createElement('h5');
            tituloProducto.setAttribute('class', 'card-title');
            tituloProducto.innerText = productos[i].nombre;
            cuerpoCarta.appendChild(tituloProducto);

            let parrafoCarta = d.createElement('p');
            parrafoCarta.setAttribute('class', 'card-text');
            parrafoCarta.innerText = '$' + productos[i].precio;
            cuerpoCarta.appendChild(parrafoCarta);

            let btnEditar = d.createElement('button');
            btnEditar.setAttribute('class', 'btn-warning text-light mr-1 pr-btnEditar');
            btnEditar.innerText = 'Editar';
            btnEditar.addEventListener('click', function () {
                let imagen_act = contenedor.getElementsByTagName('img')[0];
                editarProducto(formulario, productos[i]);
                formulario.boton_guardar.disabled = true;
                formulario.boton_guardar.style.opacity = '.6';;
                imagen_act.src = productos[i].imagen
            })
            cuerpoCarta.appendChild(btnEditar);

            let btnEliminar = d.createElement('button');
            btnEliminar.setAttribute('class', 'btn-danger pr-btnEditar');
            btnEliminar.innerText = 'Eliminar';
            btnEliminar.addEventListener('click', function () {
                for (const a in productos) {
                    if (productos[a].id == productos[i].id) {
                        productos.splice(a, 1);
                        // console.log(productos);

                        // eliminarFila(productos[i].id, con);

                        localStorage.setItem('productos', JSON.stringify(productos));
                    }
                }
            });
            cuerpoCarta.appendChild(btnEliminar);

            contenedorGrande.appendChild(contenedorCartaProducto);
        }
    }

    // function eliminarFila(id, con) {
    //     let prodArticulo = con.getElementsByClassName('lista-productos');
    //     console.log(prodArticulo);
    //     // return new Promise((resolve, reject) => {

    //     // });
    // }

    function mostrarhora() {
        let momentoActual = new Date();
        let hora = momentoActual.getHours();
        let minuto = momentoActual.getMinutes();
        let segundo = momentoActual.getSeconds();

        let horaImprimible = hora + ":" + minuto + ":" + segundo;

        const contenido_hora = document.getElementById('mostrarhora');
        contenido_hora.innerText = horaImprimible;
    }
})(document, window);