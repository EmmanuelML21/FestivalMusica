document.addEventListener('DOMContentLoaded', function (){//cuando el documento carge llamar la funcion
    crearGaleria();
    navegacionFija();
    resaltarEnlace();
    scrollNav();
})
function navegacionFija(){
    const header = document.querySelector('.header')
    const festival = document.querySelector('.sobre-festival')
    //window es globla y documnet solo es el html
    window.addEventListener('scroll', function(){
        //getBoundingClientRect, nos da cordenadas y si nos pasamos (.sobre-festival) nos adanmeros negativos
        if(festival.getBoundingClientRect().bottom < 1){
            header.classList.add('fixed');//cunado lo pase agregar una clase de fixed
        }
        else{
            header.classList.remove('fixed')
        }
    })
}
function crearGaleria(){
    const cantidadImg = 16;//numero de fotos
    const galeria = document.querySelector('.galeria-imagenes');
    for(let i = 1; i<= cantidadImg; i++){//crear un for para mostrar fotos
        const imagen = document.createElement('IMG');//cre un elemto tipo <img>
        imagen.src = `src/img/gallery/full/${i}.jpg`;//donde va obtner la imagen
        imagen.alt = 'imagen de galeria';
        //event handler
        imagen.onclick = function(){
            mostrarImg(i);//usar function cunado se pasan valores 
            
        }
        galeria.appendChild(imagen);//que los tome como hijos
        
    }
    
}
function mostrarImg(i){
    const imagen = document.createElement('IMG');//cre un elemto tipo <img>
    imagen.src = `src/img/gallery/full/${i}.jpg`;//donde va obtner la imagen
    imagen.alt = 'imagen de galeria';
   //Generar Modal
    const modal = document.createElement('DIV')//crear un div
    modal.classList.add('modal')//añadir clase modal
    modal.appendChild(imagen);
    modal.onclick = cerrarModal;
    //boton de cerrar Modal
    const cerrarModalButton = document.createElement('BUTTON')
    cerrarModalButton.textContent = 'X';
    cerrarModalButton.classList.add('btn-cerrar');
    
    cerrarModalButton.onclick = cerrarModal;
    modal.appendChild(cerrarModalButton);//añadir al modal
    //agragr al HTML
    const body = document.querySelector('body')//seleccionar le body
    //agregar overflow-hidden(para evitar scroll)
    body.classList.add('overflow-hidden');
    body.appendChild(modal)// que el modal este en le body(no se va ver hasta hacer estilos en sass)
}
function cerrarModal(){
    const modal = document.querySelector('.modal')
    //Agreagar animacion de salida 
    modal.classList.add('fade-out');
    //retrasar la eliminacion 0.5 s
    setTimeout(() => {
        modal?.remove();//si existe el modal lo puedes remover
        //eliminar class  overflow-hidden
        const body = document.querySelector('body')//seleccionar le body
        body.classList.remove('overflow-hidden');//remover clase
    }, 500);
    
    
}
function resaltarEnlace(){
    document.addEventListener('scroll', function(){
        const sections = document.querySelectorAll('section');
        const enlaces = document.querySelectorAll('.navegacion-principal a');
        let actual = '';
        //un forEach ya que los seccions vienen en un tipo arreglo y debo ver cada uno
        sections.forEach(section =>{
            const sectionTop = section.offsetTop;//aqui cada section me va decir qu etan lejos estan del inicio del body
            const seccionsHeigth = section.clientHeight; //saber la altuara de cada section
            //con el scrollY para ver que seccion esta mas visible en el navegador
            if(window.scrollY >= (sectionTop - seccionsHeigth / 3)){
                actual = section.id;
            }
        })
        //forEach para saber sacar cada uno de los elementos(enlaces)
        enlaces.forEach(link =>{
            link.classList.remove('active')//remover la clase, para que no se vea resaltada
            if(link.getAttribute('href') ===  '#'+ actual){//si el href se parece al id de nueta seccion
                link.classList.add('active')//aplica la clase 
            }
        })
    })
}
function scrollNav(){
    const navLinks = document.querySelectorAll('.navegacion-principal a');
    //sacar todos los enlaces del navLinks
    navLinks.forEach(link =>{
        link.addEventListener('click', evento =>{//cunado de clic en un enlace
            evento.preventDefault();//evitar el evento por defecto
            const sectionScroll = evento.target.getAttribute('href');//obtega el href del enlce donde se dio click
            const section = document.querySelector(sectionScroll);//selecionar la section donde el href del enlace coinida con el ide de la section
            section.scrollIntoView({behavior: 'smooth'});//agrgar una animacion 
            
            
        })
    })
}