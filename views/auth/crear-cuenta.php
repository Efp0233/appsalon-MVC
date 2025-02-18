<h1 class="nombre-pagina">Crear cuenta</h1>
<p class="descripcion-pagina">Crea una cuenta para poder iniciar sesion</p>

<?php 
    include_once __DIR__.'/../templates/alertas.php';
?>

<form class="formulario" method="POST" action="/crear-cuenta">
    <div class="campo">
        <label for="nombre">Nombre: </label>
        <input type="text" name="nombre" id="nombre" placeholder="Tu Nombre" value="<?php echo s($usuario->nombre); ?>"
        />
    </div>
    <div class="campo">
        <label for="apellido">Apellido: </label>
        <input type="text" name="apellido" id="apellido" placeholder="Tu Apellido" value="<?php echo s($usuario->apellido); ?>" >
    </div>
    <div class="campo">
        <label for="telefono">Telefono: </label>
        <input type="tel" name="telefono" id="telefono" placeholder="Tu Telefono" value="<?php echo s($usuario->telefono); ?>">
    </div>
    <div class="campo">
        <label for="email">Email: </label>
        <input type="email" name="email" id="email" placeholder="Tu Email" value="<?php echo s($usuario->email); ?>">
    </div>
    <div class="campo">
        <label for="password">Password: </label>
        <input type="password" name="password" id="password" placeholder="Tu Password">
    </div>
    <input type="submit" value="Crear Cuenta" class="boton">
</form>

<div class="acciones">
    <a href="/">¿ya tienes una cuenta? Inicia sesion</a>
    <a href="/olvide">Olvide mi Contraseña</a>
</div>