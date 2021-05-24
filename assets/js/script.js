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
        },
        '/contacto': {
            archivo: 'contacto.html',
            titulo: 'Contacto'
        }

    }

    let contenedor = d.getElementById('contenido-pagina');
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

            contenedor.innerHTML = '';
            contenedor.innerHTML = respuesta;
            d.title = ruta.titulo;

            if (w.location.hash == '#/contacto') {

                formulario = contenedor.getElementsByTagName('form')[0];

                formulario.addEventListener('submit', function(e){
                    e.preventDefault();
                alert('Haz sido registrado');
                    


                });
            }

        });
    }
}) (document, window);


    
        // const tbody = document.getElementById('contenido');
        

        // formulario.addEventListener('submit', function (evento) {
        //     const rut = formulario.rut.value;
        //     const nombre = formulario.nombre.value;
        //     const apellido = formulario.apellido.value;
        //     const telefono = formulario.telefono.value;
        //     const correoelectronico = formulario.correoelectronico.value;
        //     const cargo = formulario.cargo.value;
        //     const objetoPersonaTemporal = {
        //         rut: rut,
        //         nombre: nombre,
        //         apellido: apellido,
        //         telefono: telefono,
        //         correoelectronico: correoelectronico,
        //         cargo: cargo,
        //     };

        //     anadirElementoALaListaYLocalStorange(objetoPersonaTemporal);
        //     anadirElementoATabla(objetoPersonaTemporal);
        //     alert('Haz sido registrado');
        //     formulario.reset();

        // });
        // function anadirElementoALaListaYLocalStorange(persona) {
        //     datosUsuario.push(persona);
        //     localStorage.setItem('personas', JSON.stringify(datosUsuario));
        // }



        // function anadirElementoATabla(contenidoTabla) {
        //     const trTemporal = document.createElement('tr');


        //     const tdRut = document.createElement('td');
        //     tdRut.innerText = contenidoTabla.rut;

        //     const tdNombre = document.createElement('td');
        //     tdNombre.innerText = contenidoTabla.nombre;

        //     const tdApellido = document.createElement('td');
        //     tdApellido.innerText = contenidoTabla.apellido;

        //     const tdTelefono = document.createElement('td');
        //     tdTelefono.innerText = contenidoTabla.telefono;

        //     const tdCorreoelectronico = document.createElement('td');
        //     tdCorreoelectronico.innerText = contenidoTabla.correoelectronico;

        //     const tdCargo = document.createElement('td');

        //     tdCargo.innerText = contenidoTabla.cargo;
        //     tdCargo.addEventListener('click', function () {
        //         console.log('oprimido :', contenidoTabla.cargo);

        //     });

        //     trTemporal.appendChild(tdRut);
        //     trTemporal.appendChild(tdNombre);
        //     trTemporal.appendChild(tdApellido);
        //     trTemporal.appendChild(tdTelefono);
        //     trTemporal.appendChild(tdCorreoelectronico);
        //     trTemporal.appendChild(tdCargo);

        //     tbody.appendChild(trTemporal);
        // }

        // function pintarTablaInicio() {
        //     for (let i = 0; i < datosUsuario.length; i++) {
        //         anadirElementoATabla(datosUsuario[i]);
        //     }
        // }
        // document.addEventListener('readystatechange', function () {
        //     if (document.readyState === 'interactive') {
        //         pintarTablaInicio();
        //     }

        // });
