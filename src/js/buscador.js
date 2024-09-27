document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});

function iniciarApp() {
    buscarPorFecha();
}

function buscarPorFecha() {
    const Fechainput = document.querySelector('#fecha');
    Fechainput.addEventListener('input', e => {
        const fechaSeleccionada = e.target.value;
        
        window.location = `?fecha=${fechaSeleccionada}`;
    });
}