let paso = 1;
let pasoInicial = 1;
let pasoFinal = 3;

const cita = {
    id: '',
    nombre: '',
    fecha: '',
    hora: '',
    servicios: []

}


document.addEventListener('DOMContentLoaded', () => {
    iniciarApp();
});

function iniciarApp() {
    mostrarSeccion();//muestra la seccion de acuerdo al paso
    tabs();//agrega la funcionalidad de los tabs
    botonesPaginador();//agrega o quita los botones del paginador
    paginaSiguiente();//cambia de seccion
    paginaAnterior();//cambia de seccion
    consultarAPI(); //consulta la API en el backend


    idCliente();//anade el id del cliente al objeto cita
    nombreCliente();//anade el nombre del cliente al objeto cita
    seleccionarFecha();//anade la fecha al objeto cita
    seleccionarHora();//anade la hora al objeto cita
    mostrarResumen();//muestra el resumen de la cita
    

}

function mostrarSeccion() {
    //ocultar seccion anterior
    const seccionAnterior = document.querySelector('.mostrar');
    if(seccionAnterior){
       seccionAnterior.classList.remove('mostrar');
    }
    //seleccionar la seccion con el paso
    const seccion = document.querySelector(`#paso-${paso}`);
    seccion.classList.add('mostrar');
    //quita la clase actual en el tab anterior
    const tabAnterior = document.querySelector('.actual');
    if(tabAnterior){
        tabAnterior.classList.remove('actual');
    }
    //resaltar el tab actual
    const tab = document.querySelector(`[data-paso="${paso}"]`);
    tab.classList.add('actual');

}

function tabs(){
    const botones = document.querySelectorAll('.tabs button');
    botones.forEach(boton => {
        boton.addEventListener('click',function(e) {
           e.preventDefault();

           paso = parseInt(e.target.dataset.paso);  
           mostrarSeccion();  

           botonesPaginador();

        });
    })
}

function botonesPaginador(){
    const paginaSiguiente = document.querySelector('#siguiente');
    const paginaAnterior = document.querySelector('#anterior');

    if(paso === 1){
        paginaAnterior.classList.add('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    } else if(paso === 3){
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.add('ocultar');

        mostrarResumen();
        
    } else {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    }

    mostrarSeccion();
}


function paginaAnterior(){
    const paginaAnterior = document.querySelector('#anterior');
    paginaAnterior.addEventListener('click', function() {
        if(paso <= pasoInicial) return;
            paso--;
            botonesPaginador();
            mostrarSeccion();
        
    });
    
}

function paginaSiguiente(){
    const paginaSiguiente = document.querySelector('#siguiente');
    paginaSiguiente.addEventListener('click', function() {
        if(paso >= pasoFinal) return;
            paso++;
            botonesPaginador();
            mostrarSeccion();
    });
}

async function consultarAPI() {
 
    try {
        const url = `${location.origin}/api/servicios`;
        const resultado = await fetch(url);
        const servicios = await resultado.json();
        mostrarServicios(servicios);
    
    } catch (error) {
        console.log(error);
    }
}

function mostrarServicios(servicios){
    servicios.forEach(servicio => {
        const {id, nombre, precio} = servicio;
        const nombreServicio = document.createElement('P');
        nombreServicio.classList.add('nombre-servicio');
        nombreServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.classList.add('precio-servicio');
        precioServicio.textContent = `$ ${precio}`;

        const servicioDiv = document.createElement('DIV');
        servicioDiv.classList.add('servicio');
        servicioDiv.dataset.idServicio = id;
        servicioDiv.onclick = function(){
            seleccionarServicio(servicio);
        }

        servicioDiv.appendChild(nombreServicio);
        servicioDiv.appendChild(precioServicio);
        
        document.querySelector('#servicios').appendChild(servicioDiv);

    
        
    });
}

function seleccionarServicio(servicio){
    const {id} = servicio;
    const {servicios} = cita;
    
    //indentificar el elemento al que se le da click
    const divServicio = document.querySelector( `[data-id-servicio="${id}"]`);
    //comprobar si el servicio ya esta seleccionado o quitarlo
    if( servicios.some(agregado => agregado.id === id)){
        //eliminarlo
        cita.servicios = servicios.filter(agregado => agregado.id !== id);
        divServicio.classList.remove('seleccionado');
    
    } else {
        //agregarlo
        cita.servicios = [...servicios, servicio];
        divServicio.classList.add('seleccionado');

    }

   

    // console.log(cita);
}

function idCliente(){
    cita.id = document.querySelector('#id').value;
}

function nombreCliente(){
   cita.nombre = document.querySelector('#nombre').value;


}



function mostrarAlerta(mensaje, tipo, elemento, desaparece = true){
    //si hay una alerta previa no crear otra
    const alertaPrevia = document.querySelector('.alerta');
    if(alertaPrevia){
        alertaPrevia.remove();
    }
    //crear la alerta
    const alerta = document.createElement('DIV');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');
    alerta.classList.add(tipo);

    const referencia = document.querySelector(elemento);
    referencia.appendChild(alerta);

    if(desaparece){
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}

function seleccionarFecha(){
    const inputfecha = document.querySelector('#fecha');
      inputfecha.addEventListener('input', function(e){
          const dia = new Date(e.target.value).getUTCDay();
          if([6, 0].includes(dia)){
              e.target.value = '';
              mostrarAlerta('fines de semana no permitidos', 'error', '.formulario');
          } else {
              cita.fecha = inputfecha.value;
          }
      });
  }

function seleccionarHora(){
    const inputHora = document.querySelector('#hora');
    inputHora.addEventListener('input', function(e){
        const horaCita = e.target.value;
        const hora = horaCita.split(':');
        if(hora[0] < 10 || hora[0] > 18){
            e.target.value = '';
            mostrarAlerta('hora no valida', 'error', '.formulario');
            setTimeout(() => {
                inputHora.value = '';
            }, 3000);
        } else {
            cita.hora = e.target.value;
        }
    });
}

function mostrarResumen(){
    const resumen = document.querySelector('.contenido-resumen');

    //limpiar el contenido de resumen
    while(resumen.firstChild){
        resumen.removeChild(resumen.firstChild);
    }
    

    if(Object.values(cita).includes('') || cita.servicios.length === 0){
       mostrarAlerta('faltan datos de servicio, fecha u hora', 'error', '.contenido-resumen', false);
       return;
    }

    //formatear el div de resumen
    const {nombre, fecha, hora, servicios} = cita;

   
    //heading para servicios
    const headingServicios = document.createElement('H3');
    headingServicios.textContent = 'Resumen de servicios';
    resumen.appendChild(headingServicios);

    //iterando y mostrando los servicios
    servicios.forEach(servicio => {
        const {id, nombre, precio} = servicio;
        const contenedorServicio = document.createElement('DIV');
        contenedorServicio.classList.add('contenedor-servicio');

        const textoServicio = document.createElement('P');
        textoServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.innerHTML = `<span>Precio:</span> $ ${precio}`;

        contenedorServicio.appendChild(textoServicio);
        contenedorServicio.appendChild(precioServicio);

        resumen.appendChild(contenedorServicio);

    })
    //heading para cita en resumen
    const headingCita = document.createElement('H3');
    headingCita.textContent = 'Resumen de cita';
    resumen.appendChild(headingCita);

    const nombreCliente = document.createElement('P');
    nombreCliente.innerHTML = `<span>Nombre:</span> ${nombre}`;

    //formatear la fecha a espanol
    const fechaobj = new Date(fecha);
    const mes = fechaobj.getMonth();
    const dia = fechaobj.getDate() + 2;
    const year = fechaobj.getFullYear();

    const fechaUTC = new Date(Date.UTC(year, mes, dia));
    const opciones = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    const fechaFormateada = fechaUTC.toLocaleDateString('es-MX', opciones);
    
    console.log(fechaFormateada);

    const fechaCita = document.createElement('P');
    fechaCita.innerHTML = `<span>Fecha:</span> ${fechaFormateada}`;

    const horaCita = document.createElement('P');
    horaCita.innerHTML = `<span>Hora:</span> ${hora} horas`;

    //boton para crear una cita
    const botonReservar = document.createElement('BUTTON');
    botonReservar.classList.add('boton');
    botonReservar.textContent = 'Reservar cita';
    botonReservar.onclick = reservarCita;

    resumen.appendChild(nombreCliente);
    resumen.appendChild(fechaCita);
    resumen.appendChild(horaCita);
    resumen.appendChild(botonReservar);

}

async function reservarCita() {
    const {nombre, fecha, hora, servicios, id} = cita;

    const idServicios = servicios.map(servicio => servicio.id);
    // console.log(idServicios);

    const datos = new FormData();
   
    datos.append('fecha', fecha);
    datos.append('hora', hora);
    datos.append('usuarioId', id);
    datos.append('servicios', idServicios);

    try {

         // Petición a la API
    const url = `${location.origin}/api/citas`;

    const respuesta = await fetch(url, {
        method: 'POST',
        body: datos // No olvides enviar los datos en el cuerpo de la petición
    });

    const resultado = await respuesta.json();
    console.log(resultado.resultado);

    if(resultado.resultado){
        Swal.fire({
            icon: "success",
            title: "cita creada",
            text: "tu cita fue creada correctamente!",
            boton: "ok"
          }).then(() => {
            setTimeout(() => {
              window.location.reload();
            }, 3000);
        })
    }  
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Hubo un error al guardar la cita!",
          });
        
    }

   

    // console.log([...datos]); // Para hacer una copia de los datos para que se puedan ver
}