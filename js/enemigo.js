
var Enemigo = function (sprite, x, y, ancho, alto, velocidad, rangoMov) {
  this.sprite = sprite;
  this.x = x;
  this.y = y;
  this.ancho = ancho;
  this.alto = alto;
  this.velocidad = velocidad;
  this.rangoMov = rangoMov;
  this.atacando = false;
}

Enemigo.prototype.atacar = function (jugador) {
  jugador.perderVidas(1);
}

Enemigo.prototype.comenzarAtaque = function (jugador) {
  if (!this.atacando) {
    this.atacar(jugador);
  }
  this.atacando = true;
}

Enemigo.prototype.dejarDeAtacar = function () {
  this.atacando = false;
}
