
var ZombieConductor = function(sprite, x, y, ancho, alto, velocidad, rangoMov, direccion) {
  Enemigo.call(this, sprite, x, y, ancho, alto, velocidad, rangoMov);
  this.direccion = direccion;
}
ZombieConductor.prototype = Object.create(Enemigo.prototype);
ZombieConductor.prototype.constructor = ZombieConductor;

ZombieConductor.prototype.mover = function(){
  if (this.direccion == "h") {
    this.x -= this.velocidad;
    if ((this.x < this.rangoMov.desdeX) || (this.x > this.rangoMov.hastaX)){
      this.velocidad *= -1;
    }
    if ((this.y < this.rangoMov.desdeY) || (this.y > this.rangoMov.hastaY)) {
      this.y = this.rangoMov.desdeY + (this.rangoMov.hastaY - this.rangoMov.desdeY)/2;
    }
  } else if(this.direccion == "v") {
    this.y += this.velocidad;
    if ((this.y < this.rangoMov.desdeY) || (this.y > this.rangoMov.hastaY)){
      this.velocidad *= -1;
    }
    if ((this.x < this.rangoMov.desdeX) || (this.x > this.rangoMov.hastaX)) {
      this.x = this.rangoMov.desdeX + (this.rangoMov.hastaX - this.rangoMov.desdeX)/2;
    }
  }
}

ZombieConductor.prototype.atacar = function(jugador) {
  jugador.perderVida(jugador.vidas);
}
