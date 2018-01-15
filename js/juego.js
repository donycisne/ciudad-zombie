
var Juego = {
  anchoCanvas: 961,
  altoCanvas: 577,
  jugador: Jugador,
  vidasInicial: Jugador.vidas,
  ganador: false,

  obstaculosCarretera: [
    new Obstaculo('imagenes/valla_horizontal.png', 160, 100, 30, 30, 1),
    new Obstaculo('imagenes/valla_horizontal.png', 133, 100, 30, 30, 1),
    new Obstaculo('imagenes/auto_verde_abajo.png', 180, 230, 15, 30, 1),
    new Obstaculo('imagenes/bache.png', 180, 280, 30, 30, 1),
    new Obstaculo('imagenes/valla_horizontal.png', 70, 430, 30, 30, 1),
    new Obstaculo('imagenes/valla_horizontal.png', 97, 430, 30, 30, 1),
    new Obstaculo('imagenes/valla_horizontal.png', 124, 430, 30, 30, 1),
    new Obstaculo('imagenes/valla_vertical.png', 185, 450, 30, 30, 1),
    new Obstaculo('imagenes/bache.png', 300, 485, 30, 30, 1),
    new Obstaculo('imagenes/auto_verde_derecha.png', 385, 470, 30, 15, 1),
    new Obstaculo('imagenes/valla_vertical.png', 480, 480, 30, 30, 1),
    new Obstaculo('imagenes/valla_vertical.png', 480, 453, 30, 30, 1),
    new Obstaculo('imagenes/valla_horizontal.png', 515, 420, 30, 30, 1),
    new Obstaculo('imagenes/bache.png', 510, 132, 30, 30, 1),
    new Obstaculo('imagenes/auto_verde_abajo.png', 855, 390, 15, 30, 1),
    new Obstaculo('imagenes/bache.png', 810, 420, 30, 30, 1)
  ],

  bordes: [
    // Bordes
    new Obstaculo('', 0, 5, 961, 18, 0),
    new Obstaculo('', 0, 559, 961, 18, 0),
    new Obstaculo('', 0, 5, 18, 572, 0),
    new Obstaculo('', 943, 5, 18, 572, 0),
    // Veredas
    new Obstaculo('', 18, 23, 51, 536, 2),
    new Obstaculo('', 69, 507, 690, 52, 2),
    new Obstaculo('', 587, 147, 173, 360, 2),
    new Obstaculo('', 346, 147, 241, 52, 2),
    new Obstaculo('', 196, 267, 263, 112, 2),
    new Obstaculo('', 196, 23, 83, 244, 2),
    new Obstaculo('', 279, 23, 664, 56, 2),
    new Obstaculo('', 887, 79, 56, 480, 2)
  ],

  enemigos: [
    new ZombieCaminante("imagenes/zombie1.png", 20, 280, 10, 10, 1, {desdeX: 20, hastaX: 941, desdeY: 20, hastaY: 557}, 0),
    new ZombieCaminante("imagenes/zombie2.png", 20, 400, 10, 10, 1, {desdeX: 20, hastaX: 941, desdeY: 20, hastaY: 557}, 0),
    new ZombieCaminante("imagenes/zombie3.png", 280, 90, 10, 10, 1, {desdeX: 20, hastaX: 941, desdeY: 20, hastaY: 557}, 0),
    new ZombieCaminante("imagenes/zombie4.png", 280, 230, 10, 10, 1, {desdeX: 20, hastaX: 941, desdeY: 20, hastaY: 557}, 0),
    new ZombieCaminante("imagenes/zombie1.png", 465, 370, 10, 10, 1, {desdeX: 20, hastaX: 941, desdeY: 20, hastaY: 557}, 0),
    new ZombieConductor("imagenes/tren_horizontal.png", 400, 322, 90, 30, 6, {desdeX: 0, hastaX: 961, desdeY: 292, hastaY: 352}, "h"),
    new ZombieConductor("imagenes/tren_vertical.png", 644, 0, 30, 90, 6, {desdeX: 614, hastaX: 674, desdeY: 0, hastaY: 577}, "v"),
    new ZombieConductor("imagenes/tren_vertical.png", 678, 0, 30, 90, 3, {desdeX: 648, hastaX: 708, desdeY: 0, hastaY: 577}, "v")
  ]

}

Juego.iniciarRecursos = function() {
  Resources.load([
    'imagenes/mapa.png',
    'imagenes/mensaje_gameover.png',
    'imagenes/Splash.png',
    'imagenes/bache.png',
    'imagenes/tren_horizontal.png',
    'imagenes/tren_vertical.png',
    'imagenes/valla_horizontal.png',
    'imagenes/valla_vertical.png',
    'imagenes/zombie1.png',
    'imagenes/zombie2.png',
    'imagenes/zombie3.png',
    'imagenes/zombie4.png',
    'imagenes/auto_rojo_abajo.png',
    'imagenes/auto_rojo_arriba.png',
    'imagenes/auto_rojo_derecha.png',
    'imagenes/auto_rojo_izquierda.png',
    'imagenes/auto_verde_abajo.png',
    'imagenes/auto_verde_derecha.png'
  ]);
  Resources.onReady(this.comenzar.bind(Juego));
};

Juego.obstaculos = function() {
  return this.obstaculosCarretera.concat(this.bordes);
};

Juego.comenzar = function() {
  Dibujante.inicializarCanvas(this.anchoCanvas, this.altoCanvas);
  /* El bucle principal del juego se llamara continuamente para actualizar
  los movimientos y el pintado de la pantalla. Sera el encargado de calcular los
  ataques, colisiones, etc*/
  this.buclePrincipal();
};

Juego.buclePrincipal = function() {
  // Con update se actualiza la logica del juego, tanto ataques como movimientos
  this.update();
  // Funcion que dibuja por cada fotograma a los objetos en pantalla.
  this.dibujar();
  // Esto es una forma de llamar a la funcion Juego.buclePrincipal() repetidas veces
  window.requestAnimationFrame(this.buclePrincipal.bind(this));
};

Juego.update = function() {
  this.calcularAtaques();
  this.moverEnemigos();
}

Juego.capturarMovimiento = function(tecla) {
  var movX = 0;
  var movY = 0;
  var velocidad = this.jugador.velocidad;

  if (tecla == 'izq') {
    movX = -velocidad;
  }
  if (tecla == 'arriba') {
    movY = -velocidad;
  }
  if (tecla == 'der') {
    movX = velocidad;
  }
  if (tecla == 'abajo') {
    movY = velocidad;
  }

  if (this.chequearColisiones(movX + this.jugador.x, movY + this.jugador.y)) {
    Jugador.mover(movX, movY);
  }
};

Juego.dibujar = function() {
  // Borrar el fotograma actual
  Dibujante.borrarAreaDeJuego();
  //Se pinta la imagen de fondo segun el estado del juego
  this.dibujarFondo();
  // Dibujar al jugador principal
  Dibujante.dibujarEntidad(Jugador);
  // Se recorren los obstaculos de la carretera pintandolos
  this.obstaculosCarretera.forEach(function(obstaculo) {
    Dibujante.dibujarEntidad(obstaculo);
  });
  // Se recorren los enemigos pintandolos
  this.enemigos.forEach(function(enemigo) {
    Dibujante.dibujarEntidad(enemigo);
  });
  // El dibujante dibuja las vidas del jugador
  var tamanio = this.anchoCanvas / this.vidasInicial;
  Dibujante.dibujarRectangulo('white', 0, 0, this.anchoCanvas, 8);
  for (var i = 0; i < this.jugador.vidas; i++) {
    var x = tamanio * i
    Dibujante.dibujarRectangulo('red', x, 0, tamanio, 8);
  }
  // Dibujar la llegada
  Dibujante.dibujarRectangulo('purple', 760, 550, 126, 8);
};

Juego.moverEnemigos = function() {
  this.enemigos.forEach(function(enemigo){
    enemigo.mover();
  })
};

/* Recorre los enemigos para ver cual esta colisionando con el jugador
Si colisiona empieza el ataque el zombie, si no, deja de atacar.*/
Juego.calcularAtaques = function() {
  this.enemigos.forEach(function(enemigo) {
    if (this.intersecan(enemigo, this.jugador, this.jugador.x, this.jugador.y)) {
      enemigo.comenzarAtaque(this.jugador);
    } else {
      enemigo.dejarDeAtacar();
    }
  }, this);
};

/* Aca se chequea si el jugador se peude mover a la posicion destino.
 Es decir, que no haya obstaculos que se interpongan. De ser asi, no podra moverse */
Juego.chequearColisiones = function(x, y) {
  var puedeMoverse = true
  this.obstaculos().forEach(function(obstaculo) {
    if (this.intersecan(obstaculo, this.jugador, x, y)) {
      obstaculo.chocar(this.jugador);
      puedeMoverse = false
    }
  }, this)
  return puedeMoverse
};

/* Este metodo chequea si los elementos 1 y 2 si cruzan en x e y
 x e y representan la coordenada a la cual se quiere mover el elemento2*/
Juego.intersecan = function(elemento1, elemento2, x, y) {
  var izquierda1 = elemento1.x
  var derecha1 = izquierda1 + elemento1.ancho
  var techo1 = elemento1.y
  var piso1 = techo1 + elemento1.alto
  var izquierda2 = x
  var derecha2 = izquierda2 + elemento2.ancho
  var techo2 = y
  var piso2 = y + elemento2.alto

  return ((piso1 >= techo2) && (techo1 <= piso2) &&
    (derecha1 >= izquierda2) && (izquierda1 <= derecha2))
};

// Método para ocultar el mapa
function ocultarMapa(){
  window.cancelAnimationFrame(idAnimation);
}

Juego.dibujarFondo = function() {
  // Si se termino el juego se muestra el mensaje de game over
  if (this.terminoJuego()) {
    Dibujante.dibujarImagen('imagenes/mensaje_gameover.png', 0, 5, this.anchoCanvas, this.altoCanvas);
    document.getElementById('reiniciar').style.visibility = 'visible';
    ocultarMapa();
  }

  // Si se gano el juego se muestra el mensaje ganador
  else if (this.ganoJuego()) {
    Dibujante.dibujarImagen('imagenes/Splash.png', 190, 113, 500, 203);
    document.getElementById('reiniciar').style.visibility = 'visible';
    ocultarMapa();
  } else {
    Dibujante.dibujarImagen('imagenes/mapa.png', 0, 5, this.anchoCanvas, this.altoCanvas);
  }
};

Juego.terminoJuego = function() {
  return this.jugador.vidas <= 0;
};

/* Se gana el juego si se llega a la altura y */
Juego.ganoJuego = function() {
  return (this.jugador.y + this.jugador.alto) >= 550;
};

Juego.iniciarRecursos();

// Activa las lecturas del teclado al presionar teclas
// Documentacion: https://developer.mozilla.org/es/docs/Web/API/EventTarget/addEventListener
document.addEventListener('keydown', function(e) {
  var allowedKeys = {
    37: 'izq',
    38: 'arriba',
    39: 'der',
    40: 'abajo'
  };

  Juego.capturarMovimiento(allowedKeys[e.keyCode]);
});
