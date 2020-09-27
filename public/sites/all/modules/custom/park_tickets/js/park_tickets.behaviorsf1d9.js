(function ($) {
  Drupal.behaviors.park_tickets = {
    attach:function (context, settings) {
      if (typeof Drupal.settings.park_tickets !== 'undefined' && Drupal.settings.park_tickets.debug) {
        var debug = parseInt(Drupal.settings.park_tickets.debug); // Variable pasada desde la configuración del modulo (php)
      } else {
        var debug = 0;
      }

      if(debug){
        //console.info( settings );
        $( "#park_tickets_module form" ).submit(function( event ) {
          console.clear();
          console.log('Send form ----------->>  '+$(this).attr("action")); 
          $(this).find(':input').each(function() {
            var elemento=this;
            console.log(elemento.name + " = " + elemento.value); 
          });
          event.preventDefault();  // Descomentar si no deseamos enviar el formulario
        });
      }
      var selector_padre = '#park_tickets_module';

      // Controlador
      $(window).on("load resize",function() {
        if( $(this).width() < "480" ){
          if( !$(selector_padre+' span.dispara_visualizacion')){ // Si está desplegado el widget
            // $('.park_ticket_element').css('display','none').addClass('close').removeClass('open');
            $(selector_padre+' span.dispara_visualizacion').css('display','block').addClass('close').removeClass('open');
          }else{
            $(selector_padre+' span.dispara_visualizacion').css('display','block')
          }
        }else{
          $('.park_ticket_element').css('display','block');
          $(selector_padre+' span.dispara_visualizacion').css('display','none');
          $('.park_ticket_element, '+selector_padre+' span.dispara_visualizacion').removeClass('close').addClass('open');
        }
      });
      $( selector_padre ).on('click','span.dispara_visualizacion.close',function(){
        Drupal.behaviors.park_tickets.muestraWidget( selector_padre );
        $( this ).removeClass('close').addClass('open');
      });
      $( selector_padre ).on('click','span.dispara_visualizacion.open',function(){
        Drupal.behaviors.park_tickets.ocultaWidget( selector_padre );
        $( this ).removeClass('open').addClass('close');
        Drupal.behaviors.park_tickets.ocultaGruposExtra( selector_padre );
        $( selector_padre +' span.activa_grupos_extra').removeClass('open').addClass('close');
      });

      $( selector_padre ).on('click','span.activa_grupos_extra.open',function(){
        Drupal.behaviors.park_tickets.ocultaGruposExtra( selector_padre );
        $(this).removeClass('open').addClass('close');
      });
      $( selector_padre ).on('click','span.cierra',function(){
        Drupal.behaviors.park_tickets.ocultaGruposExtra( selector_padre );
        $( selector_padre +' span.activa_grupos_extra').removeClass('open').addClass('close');
      });
      $( selector_padre ).on('click','span.activa_grupos_extra.close',function(){
        Drupal.behaviors.park_tickets.muestraGruposExtra( selector_padre );
        $( this ).removeClass('close').addClass('open');
      });
      //////////////

    },
    muestraWidget:function( selector_padre ){
      $('.park_ticket_element').slideDown( "slow", function() {
        $(this).removeClass('close').addClass('open');
      });
    },
    ocultaWidget:function( selector_padre ){
      $('.park_ticket_element').slideUp( "slow", function() {
        $(this).removeClass('open').addClass('close');
      });
    },
    muestraGruposExtra:function( selector_padre ){
      $(selector_padre+' #contenedor_grupos_extra').css('height',Drupal.behaviors.park_tickets.obtieneRecorridoContenedor(selector_padre)+'px')
      $(selector_padre+' #contenedor_grupos_extra').slideDown( "slow", function() {
        $(selector_padre+' #contenedor_grupos_extra').removeClass('close').addClass('open');
      });
    },
    ocultaGruposExtra:function( selector_padre ){
      $(selector_padre+' #contenedor_grupos_extra').slideUp( "slow", function() {
        $(selector_padre+' #contenedor_grupos_extra').removeClass('open').addClass('close');
      });
    },
    obtieneRecorridoContenedor:function( selector_padre ){
      var x = $(selector_padre+' ul#menu').height();
      var alto_widget = $(selector_padre+' #widget ').height();
      var recorrido_contenedor = ($(selector_padre+' #widget ').height()) - x;
      return recorrido_contenedor;
    },
  };
})(jQuery);
