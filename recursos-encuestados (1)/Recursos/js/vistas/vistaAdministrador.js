/*
 * Vista administrador
 */
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function() {
    contexto.reconstruirLista();
  });

  this.modelo.preguntaBorrada.suscribir(
    function(){
      contexto.reconstruirLista();

    }
  );
  
  this.modelo.preguntaBorradaCompleta.suscribir(
    function(){
      contexto.reconstruirLista();
    }
  );

  this.modelo.preguntaEditada.suscribir(
    function(){
      contexto.reconstruirLista();
  });

};


VistaAdministrador.prototype = {
  //lista
  inicializar: function() {

    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    
    this.reconstruirLista();
    this.configuracionDeBotones();

    validacionDeFormulario();
  },

  construirElementoPregunta: function(pregunta){
    var contexto = this;
    var nuevoItem;

    //completar
    //asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"
    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);

    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp){
      return " " + resp.textoRespuesta;
    }));

    
    //CONTINUAR ACA (CREAR nuevoItem)
    
    nuevoItem = $(`<li id="${pregunta.id}" class="list-group-item">${pregunta.textoPregunta}</li>`);
    nuevoItem.html($('.d-flex').html());

    return nuevoItem;
  },

  reconstruirLista: function() {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    for (var i=0;i<preguntas.length;++i){
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function(){
    var e = this.elementos;
    var contexto = this;

    //asociacion de eventos a boton
    e.botonAgregarPregunta.click(function() {
      
      let value = e.pregunta.val();
      let radioRespuestas = $('[name="option[]"]');

      if ( value.trim() == '' ) {

        alert('Por Favor ingrese una pregunta');
        
      }if (radioRespuestas.length > 0) {
        alert('por favor ingrese una respuestas');

      }
       else{

          let respuestas = [];

          for(let i=0; i < radioRespuestas.length - 1; i++){
            respuesta = {'textoRespuesta': radioRespuestas[i].value, 'cantidad': 0};

            respuestas.push( respuesta );

            console.log(respuesta);
          }

          contexto.limpiarFormulario();
          contexto.controlador.agregarPregunta(value, respuestas);
        }

    });
    //asociar el resto de los botones a eventos
    e.botonBorrarPregunta.click(function(){
      let id = parseInt($('.list-group-item.active').attr('id'));

      contexto.controlador.borrarPregunta(id);
    });

    e.botonEditarPregunta.click(function(){
      
      let tituloPregunta = prompt("Ingrese el titulo de la pregunta");

      let id = parseInt($('.list-group-item.active').attr('id'));
      if(tituloPregunta==''){
        alert('por favor ingrese una nueva pregunta');
        return false;
      }else{
        contexto.controlador.editarPregunta(id, tituloPregunta);
      }

      
    });

    e.borrarTodo.click(function () {
      
      contexto.controlador.borrarTodo();
      alert("Borrar todo");
    });

  },

  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};
