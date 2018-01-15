
var Dibujante = {
  canvas: document.createElement('canvas'),

  borrarAreaDeJuego: function () {
    this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  inicializarCanvas: function (anchoCanvas, altoCanvas) {
    this.canvas.width = anchoCanvas;
    this.canvas.height = altoCanvas;
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
  },

  dibujarImagen: function (ruta, x, y, ancho, alto) {
    var imagen = Resources.get(ruta);
    this.canvas.getContext('2d').drawImage(imagen, x, y, ancho, alto);
  },

  dibujarEntidad: function (entidad) {
    this.dibujarImagen(entidad.sprite, entidad.x, entidad.y, entidad.ancho, entidad.alto);
  },

  dibujarRectangulo: function (color, x, y, ancho, alto) {
    var ctx = this.canvas.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(x, y, ancho, alto);
  },
}
