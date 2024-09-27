<h1 class="nombre-pagina">olvide password</h1>
<p class="descripcion-pagina">Ingresa tu email para recuperar tu password</p>

<?php 
    include_once __DIR__.'/../templates/alertas.php';
?>

<form class="formulario" method="POST" action="/olvide">
    <div class="campo">
        <label for="email">Email: </label>
        <input type="email" name="email" id="email" placeholder="Tu Email">
    </div>
    <input type="submit" value="Enviar Instrucciones" class="boton">
</form>


<div class="acciones">
     <a href="/">¿aun no tienes una cuenta? Crear Una.</a>
    <a href="/crear-cuenta">¿aun no tienes una cuenta? Inicia Sesion.</a>
</div>