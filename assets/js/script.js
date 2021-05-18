(function (d, w) {
    const rutas = {
        '': {
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
        '/Prueba': {
            archivo: 'paginaprueba.html',
            titulo: 'Pagina prueba'
        }
    }

    setInterval(function(){mostrarhora()}, 1000);

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
    function mostrarhora(){
        let momentoActual = new Date();
        let hora = momentoActual.getHours();
        let minuto = momentoActual.getMinutes();
        let segundo = momentoActual.getSeconds();
    
        let horaImprimible = hora + ":" + minuto + ":" + segundo;
    
        const contenido_hora = document.getElementById('mostrarhora');
        contenido_hora.innerText = horaImprimible ;
    }
})(document, window);
