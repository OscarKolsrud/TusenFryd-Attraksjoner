(function ($) {
Drupal.behaviors.ParkMapPage = {
  attach:function (context, settings) {
    ///////////////////////////////////////////////////////// Estilos
    $( ".item-type" ).hover(
      function() {
        $(this).css({
          'background': $(this).data('second-color'),
          'color' : $(this).data('first-color'),
          'border' : '2px solid '+$(this).data('first-color'),
        });
      }, 
      function() {
        if( !$(this).hasClass('activated')){
          $(this).css({
          'background' : $(this).data('first-color'),
          'color' : $(this).data('second-color'),
          'border' : '2px solid '+$(this).data('second-color'),
          });
        }
      }
    );
    $( ".item-type, .item-type-router" ).click(function() {
      $('ul.rutas div').each(function(index){
        $(this).css({
          'background' : $(this).data('first-color'),
          'color' : $(this).data('second-color'),
          'border' : '2px solid '+$(this).data('second-color'),
        });
      });
      $(this).css({
          'background': $(this).data('second-color'),
          'color' : $(this).data('first-color'),
          'border' : '2px solid '+$(this).data('first-color'),
      });
    });
    ///////////////////////////////////////////////////////////

    // Bloque "see-on-the-map"
    // En ficha
    $( "form[name='form-see-on-the-map']" ).click(function() {
      $(this).submit();
    });
    // En mapa
    $(document).ready(function() {
      if( Drupal.park_map.cssID != 'field_map'){
        Drupal.park_map.reinitMap();
      }
      var nid = $('div#peticion_desde_nodo').text();
      var ct = $('div#peticion_desde_ct').text();
      if( nid != "" ){
        Drupal.park_map.setImWaiting();
        var filtered = $("input[name='filtered']:checked").val();
        var desde = 'block-see-on-the-map';
        Drupal.park_map.getPois( nid, filtered, desde);
      }
      var ct = $('div#peticion_desde_ct').text();
      if( ct != "" ){
        Drupal.park_map.setImWaiting();
        var filtered = $("input[name='filtered']:checked").val();
        var desde = 'block-see-on-the-map-ct';
        Drupal.park_map.getPois( ct, filtered, desde);
      }
    });
    //

    // Ventana modal
    $('div.modal .cerrar, div#ventana_modal #modal .close').click(function(){
      Drupal.park_map.closeModalWindow();
    });
            
    $("input[name='select_altura']").click(function(){
      if ( $(this).val() == 'solo'){
        $( 'ul#field_height_accompanied' ).hide();
        Drupal.park_map.clearFilterOfTaxonomy('field_height_accompanied');
        $( 'ul#field_height_unaccompanied' ).show();
      }else{
        $( 'ul#field_height_unaccompanied' ).hide();
        Drupal.park_map.clearFilterOfTaxonomy('field_height_unaccompanied');
        $( 'ul#field_height_accompanied' ).show();
      }
      var q = Drupal.park_map.getActiveFilters();
      var filtered = $("input[name='filtered']:checked").val();
      var desde = 'map';
      Drupal.park_map.getPois(q.slice(0,-1), filtered, desde);
    });


    $('.map-filter-more').click(function(event) {
      if( $(this).hasClass('ver_mas_activo') ){
        $('ul.'+ $(this).data('type') +' .map-filter-extra').hide();
        $(this).removeClass('ver_mas_activo');
        $('ul.'+ $(this).data('type') +' .map-filter-more i.menos').hide();
        $('ul.'+ $(this).data('type') +' .map-filter-more i.mas').show();  
      }else{
        $('ul.'+ $(this).data('type') +' .map-filter-extra').show();
        $(this).addClass('ver_mas_activo');
        $('ul.'+ $(this).data('type') +' .map-filter-more i.mas').hide();
        $('ul.'+ $(this).data('type') +' .map-filter-more i.menos').show();
      }
    });

    if($('#map-filters').length){
      var mapo = $(".subfilters");
      $(".item-type.activated").each(function() {
          mapo.filter('.' + $(this).data('type')).css('display', 'block');
      });
      $( ".item-type-router" ).click(function(e) {
        if( !$(this).hasClass('activated')){
          $('.item-type-router').removeClass('activated');
          $(this).addClass('activated');
          if (typeof $(this).data('query') !== typeof undefined && $(this).data('query') !== false) {
            Drupal.park_map.reinitMap();
            Drupal.park_map.setImWaiting();
            Drupal.park_map.setDefaultViewMap();
            Drupal.park_map.deleteRouterResults();
            var q = $(this).data('query');
            var filtered = null;
            var desde = 'paths';
            Drupal.park_map.getPois(q, filtered, desde);
            //$('#default_msg').hide();
            //$('div#vista_poi_reference #loading').css('display','none');
          }
        }
      });    
      $('.map-filter-type-checkbox').each(function(index){
        var icon_name = (Drupal.settings.park_map.structure[data_type].icon) ? Drupal.settings.park_map.structure[data_type].icon : Drupal.park_map.icons.def;
        //var icon = $('<i></i>').addClass('fa').addClass('fa-' + icon_name);
        $(this).parent().children('.item-type').append(icon); 
        $(this).click(function(e){
          if($(this).attr("checked")){
            $('.active-filter').removeClass('active-filter');
            $('.map-filter-type').fadeOut('fast');
            $('.map-filter-' + data_type).fadeIn('fast').addClass('active-filter');
            $('#map-filters').removeClass('filters-contracted').addClass('filters-expanded');
            $('#filter-hidder i').removeClass("fa-angle-down").addClass('fa-angle-up');
          } 
        });
      });
      //Tipo de contenido
      $( ".item-type" ).once().click(function(e) {
        //Necesario para ajustar los puntos
        Drupal.park_map.reinitMap();
        Drupal.park_map.setImWaiting();
        Drupal.park_map.setDefaultViewMap();
        if( Drupal.settings.park_map.park_map_filter_type == 'inverso'){  
          $('input[data-content-type="'+$(this).attr('data-type')+'"]').each(function(index){
            $('input#'+$(this).attr('id')).prop('checked', true);
          });
          $('fieldset.map-filter-'+$(this).attr('data-type')+' label').each(function(index){
            $(this).addClass('activado');
          });
          $('fieldset.map-filter-'+$(this).attr('data-type')+' label span').each(function(index){
            $(this).addClass('activo')
          });
        } 
        //Oculto pop-up poi del mapa
        $('div.leaflet-popup').hide();
        var filtered = $("input[name='filtered']:checked").val();
        if ($(this).hasClass('activated')) {
          var type = $(this).attr('data-type');
          $("fieldset."+type+" input:checkbox").removeAttr('checked');
          $("fieldset."+type+" label.activado").removeClass('activado');
        }
        $(this).toggleClass("activated");
        var type = $(this).attr('data-type');
        $("fieldset."+type).toggle();

        var q = '';
        $('.map-filters:checked').each(function(index){
          q += $(this).attr('data-content-type')+"~"+$(this).attr('data-field')+"~"+$(this).attr('data-tid');
          q += ',';
        }); 

        if ( Drupal.settings.park_map.park_map_filter_type != 'inverso' ){  // ++ 141028
          $('.item-type.activated').each(function(index){
            var filtros_activos = Drupal.park_map.getNumberOfFilterActives( $(this).attr('data-type') );
            if(filtros_activos==0){
              q += $(this).attr('data-type');
              q += ',';
            }
          });
          q.slice(0,-1);
        }else{
          q +=  Drupal.park_map.getActiveContentTypesWithoutFilters();
        }

        var desde = 'map';
        //alert(q)
        Drupal.park_map.getPois(q, filtered, desde);

      });
      //Taxonomias
      $( ".map-filters" ).click(function(e) {
        Drupal.park_map.setImWaiting();
        Drupal.park_map.setDefaultViewMap();
        $('div.leaflet-popup').hide();    
        var filtered = $("input[name='filtered']:checked").val();
        if( $('label[for='+ $(this).attr('id') +']').hasClass('activado') ){
          $('label[for='+ $(this).attr('id') +']').removeClass('activado');
        }else{
          $('label[for='+ $(this).attr('id') +']').addClass('activado');
        }

        var q = Drupal.park_map.getActiveFilters();
        
        var desde = 'map';
        Drupal.park_map.getPois(q.slice(0,-1), filtered, desde);
      }); 
    }
      
    if( $('#map').length && ! $('body').hasClass('page-node-panelizer') ){
      image_url = Drupal.settings.park_map.image_absolute_path;
      width = Drupal.settings.park_map.geolocation.leaflet_dashboard_weight;
      height = Drupal.settings.park_map.geolocation.leaflet_dashboard_height;
      tamLienzoW = Drupal.settings.park_map.park_map_tamLienzoW;
      tamLienzoH = Drupal.settings.park_map.park_map_tamLienzoH;
      display = Drupal.settings.park_map.park_map_display;
      if( display == 'ajustado' && Drupal.settings.park_map.park_map_ie != 'ie ie8'){
        if ( typeof Drupal.park_map.map === 'undefined' ) {
          Drupal.park_map.map = Drupal.park_map.generate_map('map', image_url, width, height, display, tamLienzoH, tamLienzoW);
        }
      }else{
        display = 'normal';
      }
      if( display == 'normal' ){
        if ( typeof Drupal.park_map.map === 'undefined' ) {
          Drupal.park_map.map = Drupal.park_map.generate_map('map', image_url, width, height, display, tamLienzoH, tamLienzoW);
        }
      }
      Drupal.park_map.map.on('popupclose', function(){
        Drupal.park_map.map.setView( Drupal.park_map.maker_position , 0);
      });             
    }

    $(window).resize(function(){
      if(Drupal.park_map.cssID == 'map'){
        if( display == 'ajustado' && Drupal.settings.park_map.park_map_ie != 'ie ie8'){
          //Drupal.park_map.map.closePopup(); //IMPORTANTE NO ELIMINAR. SI SE ELIMINA ERROR JAVASCRIPT
          Drupal.park_map.map = Drupal.park_map.resizeMap();
          Drupal.park_map.grupo = L.layerGroup();
          Drupal.park_map.grupo.addTo(Drupal.park_map.map);
          if (typeof Drupal.park_map.data !== 'undefined'){
            Drupal.park_map.runData(Drupal.park_map.data, $('#park_map_module').data('type') );
          }
          Drupal.park_map.map.on('popupclose', function(){
            Drupal.park_map.map.setView( Drupal.park_map.maker_position , 0);
          });
        }else{
          display = 'normal';
        }
        if( display == 'normal'){
          Drupal.park_map.grupo = L.layerGroup();
          Drupal.park_map.grupo.addTo(Drupal.park_map.map);
        }
      }
    });

  },
};
})(jQuery);
