/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
  },

  borrarPregunta: function(idPregunta) {
    this.modelo.borrarPregunta(idPregunta);
},
borrarTodo: function () {
  this.modelo.borrarTodo();
},
editarPregunta: function(idPregunta, tituloNuevoPregunta) {
   
  this.modelo.editarPregunta(idPregunta, tituloNuevoPregunta);
},
agregarVoto: function (nombrePregunta,respuestaSeleccionada) {
  this.modelo.agregarVoto(nombrePregunta, respuestaSeleccionada);
},
};
