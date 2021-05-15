(function (d, w) {
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
        }
    }

    const productos = [];
    d.addEventListener('readystatechange', function () {
        if (d.readyState === 'interactive') {
            console.log('Hola');
            iniciar();

        }
    });

    function iniciar() {
        w.addEventListener('hashchange', function () {
            const ruta = w.location.hash;

            cargarPagina(ruta);
            console.log(ruta);
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
            console.log(respuesta);
        });

        // console.log(`${w.location.origin}/assets/pages/${ruta.archivo}`);
    }
})(document, window);