
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//Variables pára campos:
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
eventListeners();
function eventListeners(){
     //Cuando la app arranca
     document.addEventListener('DOMContentLoaded',IniciarApp);
     //Campos del formulario
     email.addEventListener('blur' , validarformulario)
     asunto.addEventListener('blur' , validarformulario)
     mensaje.addEventListener('blur' , validarformulario)
     //Enviar Email
     //Reinicia el formulario
     btnReset.addEventListener('click', resetearFormulario);
     formulario.addEventListener('submit',enviarEmail);
}




Funciones
function IniciarApp(){
     btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed','opacity-50');
}

function validarformulario(e){
     if(e.target.value.length > 0){

      //  Elimina los errores
        const error = document.querySelector('p.error');
        if(error){
            error.remove();
        }

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    }else{
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios');
    }
    if(e.target.type ==='email'){
        if(er.test(e.target.value)){
            const error = document.querySelector('p.error');
            if(error){
                error.remove();
            }
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        }else{
             e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('Email no válido');
        }
    }
    if(er.test(email.value) && asunto.value !=="" && mensaje.value !== ''){
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed','opacity-50');
    }else{
        IniciarApp();
    }
}
    function mostrarError(mensaje){
         const mensajeError = document.createElement('p');
        mensajeError.textContent = mensaje;
        mensajeError.classList.add('border','border-red-500','backgroud-red-100','text-red-500','p-3','mt-5','text-center','error')
       
        const errores = document.querySelectorAll('.error');
        if(errores.length === 0){
             formulario.appendChild(mensajeError)
        }

    }
    //Envía el email
             function enviarEmail(e){
                 e.preventDefault();
             
              //   Mostrar el spinder
                 const spinner = document.querySelector('#spinner');
                 spinner.style.display = "flex";
             
                 setTimeout (() =>{
                     spinner.style.display = "none";
                   //  Mensaje que dice que se envió correctamente
                     const parrafo = document.createElement('p');
                     parrafo.textContent ="El mensaje se envió correctamente";
                     parrafo.classList.add('text-center','my-10','p-5','bg-green-500','text-white', 'font-bold','uppercase')
                     formulario.insertBefore(parrafo,spinner);
                     setTimeout(() =>{
                         parrafo.remove();
             
                         resetearFormulario();
                     },5000)
                 },3000)
                 
             
             }
             
             //  Funcion que resetea el formulario
             function resetearFormulario(e){
                 formulario.reset();
                 IniciarApp();
                 e.preventDefault()
             }