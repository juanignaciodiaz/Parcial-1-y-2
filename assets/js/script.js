(function (d, w) {
    const rutas = {
        '/':{
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
        '/contacto' : {
            archivo: 'contacto.html',
            titulo: 'Contacto'
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
        w.addEventListener('hashchange', function(){
            const ruta = w.location.hash;
    
            cargarPagina(ruta);
            console.log(ruta);
        });
        cargarPagina(w.location.hash);
    }

    function cargarPagina(r) {
        const ruta = rutas[r.substring(1)];

        fetch(`${w.location.origin}/assets/pages/${ruta.archivo}`,{
            method: 'GET'
        }).then(function(respuesta){
            return respuesta.text();
        }).then(function(respuesta) {
            const contenedor = d.getElementById('contenido-pagina');
            contenedor.innerHTML = '';
            contenedor.innerHTML = respuesta;
            d.title = ruta.titulo;
            console.log(respuesta);
        });

        // console.log(`${w.location.origin}/assets/pages/${ruta.archivo}`);
    }
})(document, window);



// script trabajar con nosotros

// (function () {
//     function cargarDatosDesdeLocalStorage() {
//         let retorno = [];
//         if (localStorage.getItem('personas') !== null) {
//             retorno = JSON.parse(localStorage.getItem('personas'));
//         }
//         return retorno;
//     } 
//     const datosUsuario = cargarDatosDesdeLocalStorage();
//     const formulario = document.getElementsByTagName('form')[0];
//     const tbody = document.getElementById('contenido');
//     formulario.addEventListener('submit', function(evento) {
//         evento.preventDefault();

//     });
    
//     formulario.addEventListener('submit', function (evento) {
//         const rut = formulario.rut.value;
//         const nombre = formulario.nombre.value;
//         const apellido = formulario.apellido.value;
//         const telefono = formulario.telefono.value;
//         const correoelectronico = formulario.correoelectronico.value;
//         const cargo = formulario.cargo.value;
//         const objetoPersonaTemporal = {
//             rut: rut,
//             nombre: nombre,
//             apellido: apellido,
//             telefono: telefono,
//             correoelectronico: correoelectronico,
//             cargo: cargo,
//         };

//         anadirElementoALaListaYLocalStorange(objetoPersonaTemporal);
//         anadirElementoATabla(objetoPersonaTemporal);
//         alert('Haz sido registrado');
//         formulario.reset();

//     });
//     function anadirElementoALaListaYLocalStorange(persona){
//         datosUsuario.push(persona);
//         localStorage.setItem('personas', JSON.stringify(datosUsuario));
//     }

//     function anadirElementoATabla(hijoAAnadir) {
//         const trTemporal = document.createElement('tr');

//         const tdRut = document.createElement('td');
//         tdRut.innerText = hijoAAnadir.rut;

//         const tdNombre = document.createElement('td');
//         tdNombre.innerText = hijoAAnadir.nombre;

//         const tdApellido = document.createElement('td');
//         tdApellido.innerText = hijoAAnadir.apellido;

//         const tdTelefono = document.createElement('td');
//         tdTelefono.innerText = hijoAAnadir.telefono;

//         const tdCorreoelectronico = document.createElement('td');
//         tdCorreoelectronico.innerText = hijoAAnadir.correoelectronico;

//         const tdCargo = document.createElement('td');

//         tdCargo.innerText= hijoAAnadir.cargo;
//         tdCargo.addEventListener('click', function() {
//             console.log('oprimido :', hijoAAnadir.cargo);

//         });

//         trTemporal.appendChild(tdRut);
//         trTemporal.appendChild(tdNombre);
//         trTemporal.appendChild(tdApellido);
//         trTemporal.appendChild(tdTelefono);
//         trTemporal.appendChild(tdCorreoelectronico);
//         trTemporal.appendChild(tdCargo);

//         tbody.appendChild(trTemporal);
//     }

//         function pintarTablaInicio() {
//             for (let i = 0; i < datosUsuario.length; i++) {
//                 anadirElementoATabla(datosUsuario[i]);
//             }
//         }
//         document.addEventListener('readystatechange', function () {
//             if (document.readyState === 'interactive') {
//                 pintarTablaInicio();
//             }

//     });


   
// }());
