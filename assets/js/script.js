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


    const url = 'https://mindicador.cl/api/dolar'
    fetch (url)
    .then(response => response.json())
    .then(data => {
        let element = document.getElementById('cambioDivisa')
        element.innerHTML = ` 
        <p>${data.nombre}</p>
        <p>${data.serie[0].valor}</p>
         `
        console.log(data)
    })
    .catch(err=>console.log(err))


    setInterval(function () { mostrarhora() }, 1000);

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
        });
        // console.log(`${w.location.origin}/assets/pages/${ruta.archivo}`);
    }
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
