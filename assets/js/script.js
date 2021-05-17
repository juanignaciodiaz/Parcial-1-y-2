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
            
            if (ruta == '#/comentarios') {
                let lista = contenedor.getElementById('comments-list');
                formulario = contenedor.getElementsByTagName('form');
            
                crearComentario(formulario, lista)
            }

        });

        // console.log(`${w.location.origin}/assets/pages/${ruta.archivo}`);
    }

    // Funciones de la página comentarios

    function crearComentario(comentarios, lista) {
        
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
        comment_box.setAttribute('class', 'comment_box');
        comment_main_level.appendChild(comment_box);

        const comment_head = d.createElement('div');
        comment_head.setAttribute('class', 'comment_head');
        comment_box.appendChild(comment_head);

        const comment_name = d.createElement('h6');
        comment_name.setAttribute('class', 'comment_name');
        comment_head.appendChild(comment_name);

        // Arreglar
        const comment_date = d.createElement('span');
        comment_date.innerText = 'Hace una hora';
        comment_head.appendChild(comment_date);

        const comment_icon_like = d.createElement('i');
        comment_icon_like.setAttribute('class', 'comment_icon_like');
        comment_head.appendChild(comment_icon_like);

        const comment_icon_edit = d.createElement('i');
        comment_icon_edit.setAttribute('class', 'comment_icon_edit');
        comment_head.appendChild(comment_icon_edit);

        const comment_icon_share = d.createElement('i');
        comment_icon_share.setAttribute('class', 'comment_icon_share');
        comment_head.appendChild(comment_icon_share);

        const comment_content = d.createElement('div');
        comment_content.setAttribute('class', 'comment_content');
        comment_content.innerText = 'Comentario de prueba';
        comment_box.appendChild(comment_content);


        lista.appendChild(comment_main_level);


    }

})(document, window);