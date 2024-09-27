<?php
  foreach($alertas as $key => $mensajes): 
      foreach($mensajes as $mensaje): 
?>
<div class="alerta <?php echo $key; ?>">
    <?php echo $mensaje; ?>
</div> <!-- Cerramos el div correctamente aquí -->
<?php 
      endforeach;
  endforeach;
?>