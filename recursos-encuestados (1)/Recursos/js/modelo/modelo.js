/*
 * Modelo
 */
var Modelo = function() {

  this.preguntas = [];

  if ( localStorage.getItem('preguntas') ){
    this.preguntas = JSON.parse( localStorage.getItem('preguntas') );
    
  }
 
  
  

  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaBorrada = new Evento(this);
  this.preguntaBorradaCompleta = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.preguntaguardadaUsuario= new Evento(this);
  this.votoAgregado = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  //ESTO LO HICE
  obtenerUltimoId: function() {
   
    let maxID;

    if ( this.preguntas.length == 0){
      maxID = 0;
    }
  
    this.preguntas.forEach(
      (pregunta, i) => {

        if ( i == 0 ){
          maxID = pregunta.id;
        }
        else{
          if ( maxID < pregunta.id ){
            maxID = pregunta.id;
          }
        }
      }
    );
  
    return maxID;
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
  
    var id = this.obtenerUltimoId();

    id++;
  
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    
    this.preguntas.push(nuevaPregunta);
  
    this.guardar();
    this.preguntaAgregada.notificar();

    localStorage.setItem( 'preguntas', JSON.stringify( this.preguntas ) );

  },

  borrarPregunta: function(idPregunta){
    
    this.preguntas = this.preguntas.filter(
          
                            pregunta => {
                              
                              let devolver = false;
                              
                              if ( pregunta.id != idPregunta ){
                                devolver = true;
                              }

                              return devolver;
                            }

                          );
    
    this.preguntaBorrada.notificar();

    localStorage.setItem( 'preguntas', JSON.stringify( this.preguntas ) );

  },
  // aqui va otra function igual a la de arriba pero this.preguntas=[]
  // luego se notifica al controlador notificar()
  // luego se manda a la vista con  suscribir() y context.reconstruirVista()

  //se guardan las preguntas

   borrarTodo:function (){
   
    this.preguntas = [];
    
    this.preguntaBorradaCompleta.notificar();
    
    localStorage.setItem( 'preguntas', JSON.stringify( this.preguntas ) );
  },

  editarPregunta: function (idPregunta, tituloNuevoPregunta) {
     
    
   
      let i = 0;
    let encontrado = false; 
      while( i < this.preguntas.length && encontrado == false ){
      
        if ( this.preguntas[i].id == idPregunta ){
          this.preguntas[i].textoPregunta = tituloNuevoPregunta;
          encontrado = true;
        }
        
        i++;
      }
  
      this.preguntaEditada.notificar();
  
      localStorage.setItem( 'preguntas', JSON.stringify( this.preguntas ) );
     
  },

  guardar: function(){
  
   
  },


  agregarVoto: function(nombre, respuesta){
    console.log(respuesta);
    
    if(nombre.trim() ==''){
      
      alert('por favor llenar los campos');
      
    }else{

      let i = 0;
      let respuestaEncontrada = false;
     

      

      while( i < this.preguntas.length && !respuestaEncontrada ){
        
        let k = 0;

        while( k < this.preguntas[i].cantidadPorRespuesta.length && !respuestaEncontrada ){
         

          if ( this.preguntas[i].cantidadPorRespuesta[k].textoRespuesta == respuesta ){
            respuestaEncontrada = true;
            
            this.preguntas[i].cantidadPorRespuesta[k].cantidad++;
            
          }

          k++;
         
        }

        i++;
        
      }
      
      localStorage.setItem( 'preguntas', JSON.stringify(this.preguntas) );
     

      this.votoAgregado.notificar();


  }
    
  
  }
  
};
