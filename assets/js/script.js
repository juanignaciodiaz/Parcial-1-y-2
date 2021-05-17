(function (d, w) {
    // VARIABLES
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

    const productos = [];

    // ======  EVENTOS ======
    

    d.addEventListener('readystatechange', function () {
        if (d.readyState === 'interactive') {
            // console.log('Hola'); 
            iniciar();

        }
    });


    // ====== FUNCIONES ======

    function iniciar() {
        w.addEventListener('hashchange', function () {
            const ruta = w.location.hash;
            cargarPagina(ruta);
            // eventosFormulario();
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
                console.log(formulario);

                formulario.addEventListener('submit', function(e) {
                    e.preventDefault();
                    console.log('Camilo');
                })
            }
            


        });
    }

    function productosLocalStorageLista(producto) {
        productos.push(producto);
        localStorage.setItem('productos', JSON.stringify(productos));
    }

    function pintarProductos() {

    }
})(document, window);