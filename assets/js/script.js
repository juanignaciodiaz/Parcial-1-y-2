(function (d, w) {

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
            
            if (w.location.hash == '#/comentarios') {
                formulario = contenedor.getElementsByTagName('form')[0];
                let contenido_lista = contenedor.querySelector('main section article div ul');
                formulario.addEventListener('submit', function(e) {
                    console.log(contenido_lista);
                    e.preventDefault();

                    crearComentario(formulario, contenido_lista);

                });
            }

        });

        // console.log(`${w.location.origin}/assets/pages/${ruta.archivo}`);
    }

    // Funciones de la página comentarios

    function crearComentario(formComentarios, contenido) {
        
        const lista = d.createElement('li');
        lista.setAttribute('class', 'comments-list');

        const comment_main_level = d.createElement('div');
        comment_main_level.setAttribute('class', 'comment-main-level');
    
        const comment_avatar = d.createElement('div');
        comment_avatar.setAttribute('class', 'comment-avatar');
        comment_main_level.appendChild(comment_avatar);

        const avatar_img = d.createElement('img');
        avatar_img.setAttribute('src', 'assets/images/avatar/cesar_avatar.jpg');
        comment_avatar.appendChild(avatar_img);

        const comment_box = d.createElement('div');
        comment_box.setAttribute('class', 'comment-box');
        comment_main_level.appendChild(comment_box);

        const comment_head = d.createElement('div');
        comment_head.setAttribute('class', 'comment-head');
        comment_box.appendChild(comment_head);

        const comment_name = d.createElement('h6');
        comment_name.setAttribute('class', 'comment-name');
        comment_name.innerText = 'Test1';
        comment_head.appendChild(comment_name);
        
        
        const comment_date = d.createElement('span');
        comment_date.innerText = 'Hace una hora';
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
        comment_content.innerText = formComentarios.comentario.value;
        comment_box.appendChild(comment_content);


        lista.appendChild(comment_main_level);
        contenido.appendChild(lista);
        formComentarios.reset();

    }

})(document, window);