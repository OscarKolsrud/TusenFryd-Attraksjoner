(function ($) {
  Drupal.park_map = {
    geometric_settings: {
      color:'red',
      opacity: 0.7,
      weight_polyline: 10,
      weight_shape: 5,
    },
    getNumberOfFilterActives:function(content_type){
      var num = $("fieldset."+content_type+" label.activado").size();
      //console.log('activos filtros = '+num)
      return num;
    },
    clearFilterOfTaxonomy:function(taxonomia_a_limpiar_filtros){
      $('ul#'+taxonomia_a_limpiar_filtros+' .map-filters:checked').each(function(index){
        if ( $(this).attr('checked') ) {
          $(this).attr('checked', false);
          $(this).siblings('label').removeClass('activado');
        }
      });
    },
    getActiveContentTypesWithoutFilters:function(){
      var x = '';
      $('.item-type.activated').each(function(index){
        if( $('input[data-content-type="'+$(this).attr('data-type')+'"]').length == 0 ){
          x += $(this).attr('data-type')+',';
        }
      });
      x = x.slice(0,-1);
      if( x != ''){
        return x;
      } else{
        return '';
      }
    },
    getActiveFilters:function(){
      q='';
      $('.item-type.activated').each(function(index){
        var filtros_activos = Drupal.park_map.getNumberOfFilterActives( $(this).attr('data-type') );
        if(filtros_activos==0){
          q += $(this).attr('data-type');
          q += ',';
        }
      });
      $('.map-filters:checked').each(function(index){
        q += $(this).attr('data-content-type')+"~"+$(this).attr('data-field')+"~"+$(this).attr('data-tid');
        q += ','
      });
      return q;
    },
    getPois:function( datos_a_consultar, filtered, desde){
      var lang = Drupal.settings.park_map.lang;
      var loc = window.location.origin;
      if (!window.location.origin) { loc = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: ''); }
            
      var mode = Drupal.settings.park_map.park_map_mode;
      //var datos_consulta = datos_a_consultar;
            
      if( desde == 'map' ){
        var url = loc + '/' + Drupal.settings.pathPrefix + "query/park_map_pois";
        var data = "debug=0&lang="+lang+"&filtered="+filtered+"&mode="+mode+"&query="+datos_a_consultar;
      }
      if( desde == 'paths' ){
        var url = loc + '/' + Drupal.settings.pathPrefix + "query/park_map_route_of_interest";
        var data = "debug=0&lang="+lang+"&nid="+datos_a_consultar;
      }
      if( desde == 'block-see-on-the-map' || desde == 'block-location' ){
        var url = loc + '/' + Drupal.settings.pathPrefix + "query/park_map_pois";
        var data = "debug=0&lang="+lang+"&filtered=node&mode="+mode+"&nid="+datos_a_consultar;
      }
      if( desde == 'block-see-on-the-map-ct' || desde == 'block-location' ){
        var url = loc + '/' + Drupal.settings.pathPrefix + "query/park_map_pois";
        var data = "debug=0&lang="+lang+"&filtered=ct&mode="+mode+"&ct="+datos_a_consultar;
      }

      if( Drupal.settings.park_map.park_map_debug == '1'){
        console.info("%cpark_map : Consulta a base de datos ", "color: blue;font-weight:bold;");
        console.log( 'Consulta a db ---------------------- ' );
        console.log( 'park_map: Consulta desde = '+desde );
        //console.log( '[datos_consulta] = '+datos_consulta )
        console.log( 'park_map: [data] = '+data );
        console.log( 'park_map: [url+data] = '+url+'?'+data );
        console.log("%c----------------------------------- ", "color: blue;font-weight:bold;");
      }

      if( Drupal.settings.park_map.park_map_cache == '1' && desde != 'paths' ){
        if( Drupal.settings.park_map.park_map_debug == '1'){
          console.info('Comprobando si los datos están cacheados...');
        }
        var file_name = data;
        var url_cache = loc + '/' + Drupal.settings.pathPrefix + "query/park_map_check_cache";
        if( Drupal.settings.park_map.park_map_debug == '1' ){
          console.info( url_cache+'?'+file_name );
        }
        $.ajax({
          url: url_cache,
          data: file_name,
          success: function( isset ) {
            if( isset.cache == 'FALSE' ){
              if( Drupal.settings.park_map.park_map_debug == '1'){
                console.info('Habilitada caché : '+isset.cache+' , coge de bbdd, y cachea');
              }
              //consulta a base de datos
              Drupal.park_map.getPoisFromDDBB( url , data, desde );
            }else{
              if( Drupal.settings.park_map.park_map_debug == '1'){
                console.info('Habilitada caché...');
                console.info( isset.cache+' == '+file_name );
                console.info( 'Obteniendo datos desde json cacheado...' );
              }
              var version = Math.random();
              $.getJSON( loc+'/'+Drupal.settings.park_map.park_map_cache_path+isset.cache+".json?v="+version, function(data) {
                if( Drupal.settings.park_map.park_map_debug == '1'){
                  console.info( "Datos cargados desde archivo json" );
                }
                if (typeof Drupal.park_map.data !== 'undefined'){
                  Drupal.park_map.resetData();
                }
                Drupal.park_map.data = data;
                Drupal.park_map.runData( data,'pois' )
              }).done(function() {
                if( Drupal.settings.park_map.park_map_debug == '1'){
                  console.info( "Completada carga de datos desde archivo json" );
                }
              }).fail(function() {
                if( Drupal.settings.park_map.park_map_debug == '1'){
                  console.error( "No se ha podido importar los POI's desde cache json" );
                  Drupal.park_map.removeImWaiting()
                }
              });
            }
          },
          error: function( data ) {
            var msg = error.statusText;
            Drupal.park_map.setMsg( msg, "error" );
          }
        });
      } else {
        if( Drupal.settings.park_map.park_map_debug == '1' ){
          console.info('Habilitada caché : 0 , carga datos desde BBDD, y NO cachea');
        }
        //consulta a base de datos
        Drupal.park_map.getPoisFromDDBB( url , data, desde );
      }
    },
    getPoisFromDDBB:function( url, data, desde){
      $.ajax({
        type: "GET",
        url:url,
        //data:datos_a_consultar,
        data:data,
        success: function (data) {
          Drupal.park_map.map.removeLayer(Drupal.park_map.grupo);
          Drupal.park_map.grupo.clearLayers();
          (data.data) ? '' : data.data = new Array();
          if(data.data==''){
            //Si no devueve datos la consulta
            if( Drupal.settings.park_map.park_map_debug == '1'){ 
              console.log( 'park_map: [data] = No hay resultados' ) 
            };
            Drupal.park_map.resetData();
            Drupal.park_map.removeImWaiting();
          }else{
            //Si hay datos
            //if( Drupal.settings.park_map.park_map_debug == '1'){ console.log( '[query] = '+data.q ) }
            if( Drupal.settings.park_map.park_map_debug == '1'){
              console.info("%cpark_map: Resultados -------", "color: blue;font-weight:bold;");;
            }
            Drupal.park_map.data = data;
            // Recorro los datos recibidos en función del callback
            if ( desde == 'paths' ){
              Drupal.park_map.runData(Drupal.park_map.data , "paths");
            }else{
              Drupal.park_map.runData(Drupal.park_map.data , "pois");
            }
          }
        },
        error: function (error) {
          var msg = error.statusText;
          Drupal.park_map.setMsg( msg, "error" );
        }
      });
    },
    setMsg:function( msg , type ){
      if( type == "error" ){
        $( 'div#park_map_info' ).html( '<span class="park_map_error"></span>' );
        $( 'div#park_map_info .park_map_error' ).html( msg );
      }
      if( type == "warning" ){
        $( 'div#park_map_info' ).html( '<span class="park_map_warning"></span>' );
        $( 'div#park_map_info .park_map_warning' ).html( msg );
      }
      Drupal.park_map.removeImWaiting();
    },
    /*
    get_device:function(){
      //establezco variables
      Drupal.park_map.maxTabScreen = Drupal.settings.park_map.park_map_maxTabScreen;
      Drupal.park_map.maxMobileScreen = Drupal.settings.park_map.park_map_maxMobileScreen;
      var device;
      var ancho_pantalla = $(window).width();

      //proceso
      if (ancho_pantalla <= Drupal.park_map.maxMobileScreen){ 
        device = 'mobile';
        if( Drupal.settings.park_map.park_map_debug == '1'){ console.log('park_map: device = mobile'); }
      }
      else if (ancho_pantalla >= Drupal.park_map.maxMobileScreen && ancho_pantalla <= Drupal.park_map.maxTabScreen){ 
        device = 'tab'; 
        if( Drupal.settings.park_map.park_map_debug == '1'){ console.log('park_map: device = tab'); }
      }
      else { 
        device = 'desk';
        if( Drupal.settings.park_map.park_map_debug == '1'){ console.log('park_map: device = desk'); }
      }
      return device;
    },
    */
    setDefaultViewMap:function(){
      if(Drupal.park_map.map.getZoom() != 1){
        Drupal.park_map.grupo.clearLayers();
        Drupal.park_map.map.setView( [0,0] , 0);
      }
    },
    generate_map:function(cssID, image_url, width, height, display, tamLienzoH, tamLienzoW){
      Drupal.park_map.cssID = cssID;
      Drupal.park_map.image_path = image_url;
      Drupal.park_map.imageSelector = '#'+Drupal.park_map.cssID+' .leaflet-overlay-pane img.leaflet-image-layer';
      Drupal.park_map.ancho_imagen_original = width;
      Drupal.park_map.alto_imagen_original = height;
      Drupal.park_map.display = display;    

      if( Drupal.park_map.display == 'normal' ){
        Drupal.park_map.w_lienzo = tamLienzoW;
        Drupal.park_map.h_lienzo = tamLienzoH;
        $('#'+Drupal.park_map.cssID).addClass('normal');
        $('#'+Drupal.park_map.cssID).css('height', tamLienzoH+'px');


        $('#park_map_module').css('height','auto');
        //$('#park_map_module').css('height',tamLienzoH+'px');

        if($('#'+Drupal.park_map.cssID).length) {
          var map = L.map(Drupal.park_map.cssID,{
            crs: L.CRS.Simple, //L.CRS.EPSG3857
            //center: [51.505, -0.09],
            center: [0, 0],
            minZoom: 1,
            maxZoom: 4,
          });

          var sP = map.unproject([ 0 , Drupal.park_map.h_lienzo ],map.getMinZoom());
          var nP = map.unproject([ Drupal.park_map.w_lienzo, 0 ],map.getMinZoom());
           
          if(Drupal.park_map.cssID!='field_map'){
            if( Drupal.settings.park_map.park_map_debug == '1'){
              console.clear()
              console.log('Tam original imagen='+Drupal.park_map.ancho_imagen_original+' x '+Drupal.park_map.alto_imagen_original)
              console.log('Tam actual #'+Drupal.park_map.cssID+'='+ancho_actual_lienzo+' x '+alto_actual_lienzo )
            }
          }       
        }
      }
      if( Drupal.park_map.display == 'ajustado'){

        Drupal.park_map.w_lienzo = tamLienzoW;
        Drupal.park_map.h_lienzo = tamLienzoH; //512
        
        $('#park_map_module').css('height','auto');
        //$('#park_map_module').css('height',tamLienzoH+'px');

        $('#'+Drupal.park_map.cssID).addClass('ajustado');
        if($('#'+Drupal.park_map.cssID).length) {
          var map = L.map(Drupal.park_map.cssID,{
            crs: L.CRS.Simple, //L.CRS.EPSG3857
            //center: [51.505, -0.09],
            center: [0, 0],
            minZoom: 1,
            maxZoom: 4,
          });
          var ancho_actual_lienzo = $('#'+Drupal.park_map.cssID).width();
          var alto_actual_lienzo = $('#'+Drupal.park_map.cssID).height();
                    
          if(Drupal.park_map.cssID!='field_map'){
            if( Drupal.settings.park_map.park_map_debug == '1'){
              console.info("%cpark_map: Inicio -----", "color: blue;font-weight:bold;");
              //console.log('Tamaño imagen original = '+Drupal.park_map.ancho_imagen_original+' x '+Drupal.park_map.alto_imagen_original)
              //console.log('Tam actual #'+Drupal.park_map.cssID+'='+ancho_actual_lienzo+' x '+alto_actual_lienzo )
            }
          }
                    
          var h = ((ancho_actual_lienzo*Drupal.park_map.alto_imagen_original) /Drupal.park_map.ancho_imagen_original)-1;
          $('#'+Drupal.park_map.cssID).height(h)
          var sP = map.unproject([ 0 , h ],map.getMinZoom());
          var nP = map.unproject([ $('#'+Drupal.park_map.cssID).width()-1, 0 ],map.getMinZoom());
        }
      }

      //Establezco valores del mapa
      map.setMaxBounds( L.latLngBounds(sP,nP) ); // evita el desplazamiento infinito de la imagen
      L.imageOverlay(Drupal.park_map.image_path,[sP,nP]).addTo(map);
      Drupal.park_map.bounds = [sP,nP];
      map.fitBounds([sP,nP]);
                  
      if(Drupal.park_map.cssID!='field_map'){
        if( Drupal.settings.park_map.park_map_debug == '1'){
          //console.clear()
          console.info('%cpark_map: El ancho de la capa "div#map_container" en su ANCHO MÁXIMO debe configurarse como valor de la variable "park_map_tamLienzoWAncho"','color:#5E610B;font-weight:bold');
          console.info('park_map: Ancho actual de "div#map_container" = '+$('div#map-container').width()+' px');
          console.log('park_map: Ancho y alto de la imagen orignal del mapa = '+width+' x '+height);
          console.log('park_map: Ancho y alto de #'+cssID+' (capa del mapa) = '+ $('#'+cssID).width()+' x '+$('#'+cssID).height());
          console.log('park_map: Modo de rederizar el mapa = '+Drupal.settings.park_map.park_map_display);
          console.log('park_map: Zoom máximo y minimo = '+map.getMaxZoom()+' - '+map.getMinZoom());
          console.log('park_map: [sP] = '+ sP);
          console.log('park_map: [nP] = '+ nP);
          console.log('Maximo desplazamiento del mapa = '+map.latLngToLayerPoint( sP , nP ));
          console.log('park_map : Opciones establecidas...');
          console.log(map.options);
          console.log("%c --------------------- ", "color: blue;font-weight:bold;");
        }
      }
      return map;
    },
    resetData:function(){
      Drupal.park_map.data = '';
      Drupal.park_map.grupo.clearLayers();
    },
    runData:function( data , desde ){
      Drupal.park_map.setImWaiting();
      counter = 0;
      if( Drupal.settings.park_map.park_map_debug == '1'){ 
        console.log(data.data);
      }

      if ( desde == "paths" ){
        Drupal.park_map.dataViewPaths = new Array();
      }

      delta = counter + 1;
      for (var i in data.data) {
        var o_poi = data.data[i];
        json = JSON.parse(data.data[i].coordinates);
        if( json != null ){
          //Drupal.park_map.resultados_rutas = '';
          $.each(json, function(i,obj) {
            if (typeof obj.type != 'undefined') {
              // Fuerza el delta del POI's para evitar que se produzcan errores si se eliminan nodos
              o_poi.delta = delta;
              var marker_options = {
                id : obj.id,
                geometric_type : obj.type,
                radius : obj.radius,
                coords: obj.coords,
                objetoDrupal: o_poi, //objeto con las propiedades de la consulta
                id_ruta : o_poi.id_ruta
              }
              if ( desde == "pois" ){
                var marker = Drupal.park_map.generateMarker( marker_options , "pois" );
                Drupal.park_map.grupo.addLayer(marker);  
              }
              if ( desde == "paths" ){
                var marker = Drupal.park_map.generateMarker( marker_options , "paths" );
                Drupal.park_map.grupo.addLayer(marker);
                
                //Set data view paths
                if (typeof o_poi.delta !== 'undefined'){
                  var data_view = {
                    type : o_poi.type,
                    id_ruta : o_poi.id_ruta,
                    title_router : o_poi.title_router,
                    description_router : o_poi.description_router,
                    coords : o_poi.coordinates,
                    delta : o_poi.delta, 
                    title : o_poi.title, 
                    alias_path : o_poi.alias_path, 
                    tiempo : o_poi.tiempo
                  };
                  Drupal.park_map.dataViewPaths[delta] = data_view;
                }
              }
            }
          });
          delta++;
          counter++;
        }
      };

      if ( desde == "paths" ){
        Drupal.park_map.setRouterResults( Drupal.park_map.dataViewPaths );
      }

      if( Drupal.settings.park_map.park_map_debug == '1'){
        console.log('park_map: Resultados obtenidos = '+counter)
        console.log('%c---------------------------- ','color:blue;font-weight:bold');
      }

      //Añade todas las formas de una vez al mapa
      Drupal.park_map.grupo.addTo(Drupal.park_map.map);

      Drupal.park_map.getRouterResults();
      Drupal.park_map.removeImWaiting();

      // Contamos resultados de la consulta
      if(counter > 0){
        $('#info_map #sin_resultados').hide();
        $('#info_map #numero_de_resultados').show();
        $('#info_map #numero_de_resultados span').html( counter );
      }
      if(counter == 0){
        $('#info_map #numero_de_resultados').hide();
        $('#info_map #sin_resultados').show();
      }         
    },
    setRouterResults:function( data_view ){ //info_view: array de objetos
      if( Drupal.settings.park_map.park_map_debug == '1'){
        console.info('data_view');
        console.info(data_view);
      }

      //leyenda
      if( Drupal.settings.park_map.park_map_poi_type != 'all_the_same' ){
        var leyenda = '';
        for( var i in data_view){
          leyenda += '<div class="item_leyenda">';
          leyenda += '<div class="color" style="background:'+Drupal.settings.park_map.structure[data_view[i].type].second_color+'"></div>';
          leyenda += '<div class="nombre">'+data_view[i].type+'</div>';
          leyenda += '</div>';
        }
        $('div#vista_poi_reference div#leyenda').html( leyenda );
      }
      //

      $('div#vista_poi_reference div#titulo_ruta').html( '<h3>'+data_view[1].title_router+'</h3>' );
      $('div#vista_poi_reference div#descripcion_ruta').html( data_view[1].description_router );
      
      for( var i in data_view) {
          if (typeof data_view[i].type != 'undefined') {
              Drupal.park_map.resultados_rutas += '<div class="ruta_reg">';

              //Icono
              var class_icon = Drupal.settings.park_map.park_map_color_poi_all_the_same[data_view[i].id_ruta]['icon'];
              if (class_icon == 'park_map_default') {
                  var custom_icon = Drupal.park_map.getIcon("icono_para_resultados_rutas_default", class_icon, data_view[i].coords, color_secundario_ruta, class_icon, color_principal_ruta, options.objetoDrupal.delta);
              } else {
                  var color_principal_ruta = Drupal.settings.park_map.park_map_color_poi_all_the_same[data_view[i].id_ruta]['color_principal_ruta'];
                  var color_secundario_ruta = Drupal.settings.park_map.park_map_color_poi_all_the_same[data_view[i].id_ruta]['color_secundario_ruta'];
                  if (Drupal.settings.park_map.park_map_poi_type == 'all_the_same') {
                      var custom_icon = Drupal.park_map.getIcon("icono_para_resultados_rutas", class_icon, data_view[i].coords, color_secundario_ruta, class_icon, color_principal_ruta, data_view[i].delta);
                  } else {
                      var icon = Drupal.settings.park_map.structure[data_view[i].type].icon;
                      var color = Drupal.settings.park_map.structure[data_view[i].type].color;
                      var second_color = Drupal.settings.park_map.structure[data_view[i].type].second_color;
                      var custom_icon = Drupal.park_map.getIcon("icono_para_resultados_rutas", class_icon, data_view[i].coords, second_color, icon, color, data_view[i].delta);
                  }
              }
              Drupal.park_map.resultados_rutas += custom_icon;
              //////

              Drupal.park_map.resultados_rutas += '<div class="item link"><span class="comodin"></span><a href="/' + Drupal.settings.pathPrefix + data_view[i].alias_path + '">' + data_view[i].title + '</a></div>';

              if (data_view[i].tiempo != null) {
                  Drupal.park_map.resultados_rutas += '<div class="item time">' + data_view[i].tiempo + '</div>';
              } else {
                  Drupal.park_map.resultados_rutas += '<div class="item time"></div>';
              }
              Drupal.park_map.resultados_rutas += '</div><br />';
          }
      }
    },
    getRouterResults:function(){
      $( 'div#vista_poi_reference div#reg' ).html( Drupal.park_map.resultados_rutas );
      Drupal.park_map.deleteRouterResults();
    },
    deleteRouterResults:function(){Drupal.park_map.resultados_rutas = '';
    },
    resizeMap:function(){
      Drupal.park_map.map.remove()
      var map = L.map(Drupal.park_map.cssID,{
        crs: L.CRS.Simple, //L.CRS.EPSG3857
        center: [0, 0],
        minZoom: 1,
        maxZoom: 4,
      });

      var ancho_actual_lienzo = $('#'+Drupal.park_map.cssID).width();
      var alto_actual_lienzo = $('#'+Drupal.park_map.cssID).height();
      var h = ((ancho_actual_lienzo*Drupal.park_map.alto_imagen_original) /Drupal.park_map.ancho_imagen_original)-1;
            
      $('#'+Drupal.park_map.cssID).height(h)
      var sP = map.unproject([ 0 , h ],map.getMinZoom());  //Vertical
      var nP = map.unproject([ $('#'+Drupal.park_map.cssID).width()-1, 0 ],map.getMinZoom());

      map.setMaxBounds( L.latLngBounds(sP,nP) ); // evita el desplazamiento infinito de la imagen
      L.imageOverlay(Drupal.park_map.image_path,[sP,nP]).addTo(map);
      Drupal.park_map.bounds = [sP,nP];
      map.fitBounds([sP,nP]);
      return map;
    },
    reinitMap:function(){
      if( Drupal.park_map.display=='ajustado'){
        Drupal.park_map.map = Drupal.park_map.resizeMap();
        Drupal.park_map.grupo = L.layerGroup();
        Drupal.park_map.grupo.addTo(Drupal.park_map.map);
      }
    },
    getCoordsRecalculated:function( cssID, points){ // points puede ser un Array o un String
      var string_coordenadas = '';
      string_coordenadas = '[';
      for( var i in points ){
        if( Array.isArray( points ) ){
          var point_w = ((points[i].toString().split(','))[0].split('(')[1]).trim();
          var point_h = ((points[i].toString().split(','))[1].split(')')[0]).trim();
        }else{
          var point_w = ((points.toString().split(','))[0].split('(')[1]).trim();
          var point_h = ((points.toString().split(','))[1].split(')')[0]).trim();
        }
        var w_actual_lienzo = $('#'+cssID).width();
        var h_actual_lienzo = $('#'+cssID).height();
        var w_ok = ((w_actual_lienzo*point_w) /Drupal.park_map.w_lienzo);
        var h_ok = ((h_actual_lienzo*point_h) /Drupal.park_map.h_lienzo);
        var coord_recal = Drupal.park_map.map.layerPointToLatLng( new L.point( w_ok , h_ok ) );
        var coord_lat = ((coord_recal.toString().split(','))[0].split('(')[1]).trim();
        var coord_lng = ((coord_recal.toString().split(','))[1].split(')')[0]).trim();

        if( Array.isArray( points ) ){
          string_coordenadas += '['+coord_lat+','+coord_lng+'],';
        }else{
          string_coordenadas = '['+coord_lat+','+coord_lng+'],';
        }
      }
      if( Array.isArray( points ) ){
        string_coordenadas = string_coordenadas.slice(0,-1);
        string_coordenadas += ']';
      }else{
        string_coordenadas = string_coordenadas.slice(0,-1);
      }
      return string_coordenadas;
    },
    generateMarker:function( options, desde ){
      if( Drupal.settings.park_map.park_map_debug == '1'){
        //console.info('generateMarker:');
        //console.log(options);
      }
      if ( options.geometric_type == "marker") {
        var type = options.objetoDrupal.type;
        var color = (Drupal.settings.park_map.structure[type].color) ? Drupal.settings.park_map.structure[type].color : "white";
        var second_color = (Drupal.settings.park_map.structure[type].second_color) ? Drupal.settings.park_map.structure[type].second_color : "blue";
        var icon = (Drupal.settings.park_map.structure[type].icon) ? Drupal.settings.park_map.structure[type].icon : '';
      }

      var coords = JSON.parse(options.coords);

      if ( options.geometric_type == "marker" ) {
          if( desde == "pois" ){
            var class_icon = Drupal.settings.park_map.park_map_icon_map;
            if( class_icon == 'park_map_default'){
              var custom_icon = Drupal.park_map.getIcon( "icono_para_mapa_default", class_icon, coords, second_color, icon);
            } else {
              var custom_icon = Drupal.park_map.getIcon( "icono_para_mapa", class_icon, coords, second_color, icon ,color );
            }
            var geometric = L.marker( coords , {
              id: options.id,
              type: options.geometric_type,
              icon: custom_icon,
              riseOnHover: true
            });
          }
          if( desde == "paths" ){
            var class_icon = Drupal.settings.park_map.park_map_color_poi_all_the_same[options.objetoDrupal.id_ruta]['icon'];
            if( class_icon == 'park_map_default'){
              var custom_icon = Drupal.park_map.getIcon("icono_para_mapa_rutas_default", class_icon, coords, color_secundario_ruta, class_icon ,color_principal_ruta, options.objetoDrupal.delta);
            } else {
              var color_principal_ruta = Drupal.settings.park_map.park_map_color_poi_all_the_same[options.objetoDrupal.id_ruta]['color_principal_ruta'];
              var color_secundario_ruta = Drupal.settings.park_map.park_map_color_poi_all_the_same[options.objetoDrupal.id_ruta]['color_secundario_ruta'];
              if( Drupal.settings.park_map.park_map_poi_type == 'all_the_same' ){
                var custom_icon = Drupal.park_map.getIcon( "icono_para_mapa_rutas", class_icon, coords, color_secundario_ruta, class_icon ,color_principal_ruta, options.objetoDrupal.delta);
              }else{
                var custom_icon = Drupal.park_map.getIcon( "icono_para_mapa_rutas", class_icon, coords, second_color, icon ,color, options.objetoDrupal.delta);
              }
            }
            var geometric = L.marker( coords , {
              id: options.id,
              type: options.geometric_type,
              icon: custom_icon,
              riseOnHover: true
            });
          }

          geometric.objetoDrupal = options.objetoDrupal; //no eliminar

          /*Eventos
          *********/
          if( Drupal.settings.park_map.park_map_active_mouseover_poi == '1' ){
            geometric.on('click mouseover', Drupal.park_map.callbackMarker);
            geometric.on('click mouseover', function(){
              Drupal.park_map.maker_position = geometric.getLatLng();
            });
          }else{
            geometric.on('click', Drupal.park_map.callbackMarker);
            geometric.on('click', function(){
              Drupal.park_map.maker_position = geometric.getLatLng();
            });
          }
      } else if ( options.geometric_type == "polyline" ) {
          if( desde == "pois" ){
            var geometric = L.polyline( coords , {
              id: options.id,
              type: options.geometric_type,
              color: color,
              weight: Drupal.park_map.geometric_settings.weight_polyline,
              opacity: Drupal.park_map.geometric_settings.opacity,
              fill: false,
            })
          }
          if( desde == "paths" ){
            var geometric = L.polyline( coords , {
              id: options.id,
              type: options.geometric_type,
              color: Drupal.settings.park_map.park_map_color_poi_all_the_same[options.objetoDrupal.id_ruta]['color_principal_ruta'],
              weight: Drupal.park_map.geometric_settings.weight_polyline,
              opacity: Drupal.park_map.geometric_settings.opacity,
              fill: false,
            })
          }
          //drawnItems.addLayer( polyline );
      } else if ( options.geometric_type == "rectangle" ) {
          var geometric = L.rectangle( coords , {
            id: options.id,
            type: options.geometric_type,
            color: color,
            weight: Drupal.park_map.geometric_settings.weight_shape,
            opacity: Drupal.park_map.geometric_settings.opacity,
            fill: true,
          })
          //drawnItems.addLayer( rectangle );
      } else if ( options.geometric_type == "polygon" ) {
        if (typeof Drupal.settings.park_map.structure[options.objetoDrupal.type] !== 'undefined') {
          var color = (Drupal.settings.park_map.structure[options.objetoDrupal.type].color) ? Drupal.settings.park_map.structure[options.objetoDrupal.type].color : "white";
        } else {
          var color = 'transparent'; //Drupal.park_map.geometric_settings.color
        }
        var geometric = L.polygon( coords , {
          id: options.id,
          type: options.geometric_type,
          color: color,
          weight: Drupal.park_map.geometric_settings.weight_shape,
          opacity: Drupal.park_map.geometric_settings.opacity,
          fill: true,
        })

      } else if ( options.geometric_type == "circle" ) {
          var geometric = L.circle( coords , options.radius, {
              id: options.id,
              type: options.geometric_type,
              color: color,
              fillColor: color,
              //fillOpacity: Drupal.park_map.geometric_settings.opacity,
              fill: true,
          })
      }

      /* Calcular puntos */////////////////////////////////////////////////////////////
      if( Drupal.park_map.display=='ajustado'){
        //if( Drupal.settings.park_map.park_map_always_recalculate == '1' || (Drupal.settings.park_map.park_map_always_recalculate == '0' && Drupal.park_map.get_device()!='desk')){
          if ( options.geometric_type == "marker" || options.geometric_type == "circle" ) {
            var points = '';
            var points = Drupal.park_map.map.latLngToLayerPoint( coords );
          }else{
            var points = Array();
            for( var i in coords ){
              points[i] = Drupal.park_map.map.latLngToLayerPoint( coords[i] );
            }
          }

          //recalculo coordenadas
          if( Drupal.settings.park_map.park_map_debug == '1'){ 
            //console.log('Coordenadas a recalcular = '+coords); 
          }
          var coords_to_device = Drupal.park_map.getCoordsRecalculated( Drupal.park_map.cssID, points )
          if( Drupal.settings.park_map.park_map_debug == '1'){ 
            //console.log('coords_to_device = '+coords_to_device); 
          }
          
          if ( options.geometric_type == "marker" || options.geometric_type == "circle" ) {
            geometric.setLatLng( JSON.parse(coords_to_device) );
          }else{
            geometric.setLatLngs( JSON.parse(coords_to_device) );
            // Set area's zoom
            if( geometric.options.type == 'polygon' ){
              Drupal.park_map.map.setView( geometric.getBounds().getCenter() , 1.8);
            }
          }
        //}
      }
      /////////////////////////////////////////////////////////////////////////////////

      if( Drupal.settings.park_map.park_map_debug == '1'){ 
        //console.log(geometric);
        //console.info('--------');
      }
      return geometric;
    },
    callbackMarker:function(e){
      var poi = e.target._icon;
      $('.park_map_icon.activated').removeClass('activated');
      $(poi).addClass('activated');

      // Datos popup
      var array_images = e.target.objetoDrupal.array_images;
      var title = e.target.objetoDrupal.title;
      var content_type = e.target.objetoDrupal.content_type;
      //var img = (e.target.objetoDrupal.img) ? e.target.objetoDrupal.img : e.target.objetoDrupal.image;
      var map_poi_image = e.target.objetoDrupal.map_poi_image;
      var map_poi_text = (e.target.objetoDrupal.map_poi_text) ? e.target.objetoDrupal.map_poi_text : "";
      var node_url = window.location.origin + '/' + Drupal.settings.pathPrefix +'node/'+e.target.objetoDrupal.nid;
      var alias_path = e.target.objetoDrupal.alias_path;
      var taxonomy_icons = e.target.objetoDrupal.taxonomy_icons;

      var popup_content = '';
            
      if ( map_poi_image != null) { popup_content += '<img class="field_image" src="'+map_poi_image+'"><br>';
      }else{ popup_content += '<br>'; }

      var available_link = Drupal.settings.park_map.structure[e.target.objetoDrupal.type].available_link ;
      popup_content += '<h3>';

      if( available_link ){
        //popup_content += '<a href="'+alias_path+'">'+title+'</a>';
        popup_content += '<a href="/'+Drupal.settings.pathPrefix+alias_path+'">'+title+'</a>';
      }else{
        popup_content += '<span>'+title+'</span>';
      }
      popup_content += '</h3>';
      popup_content += '<div class="map_poi_text">'+map_poi_text+'</div>';
      if(array_images!=null){
        popup_content += '<div class="imagenes_pop_up">';
        for (var i = array_images.length - 1; i >= 0; i--) {
          var clase_img = array_images[i].split('/');
          clase_img = clase_img[clase_img.length-1];
          clase_img = clase_img.split('.');

          //popup_content += '<span>'+array_images[i]+'</span><br>';
          if ( i == (array_images.length - 1)  && content_type == 'animal'){ //custom
            popup_content += '<img class="special_style" id='+clase_img[0]+' src='+array_images[i]+'></img>';
          }else{
            popup_content += '<img id='+clase_img[0]+' src='+array_images[i]+'></img>';
          } 
        };
        popup_content += '</div>';
      }
      if(taxonomy_icons!=null){
        popup_content += '<div class="taxonomy_icons">';
        for (var i = 0; i < taxonomy_icons.length; i++) {
          if( taxonomy_icons[i] != null ){
            popup_content += '<i class="'+taxonomy_icons[i]+'"></i>';
          }
        };
        popup_content += '</div>';
      }
      //Tamaño del pop-up
      Drupal.park_map.maxWidthPopUP = Drupal.settings.park_map.park_map_maxWidthPopUP;
      Drupal.park_map.maxHeightPopUP = Drupal.settings.park_map.park_map_maxHeightPopUP;
      

      //Ventana modal no soportada en ie8
      if( Drupal.settings.park_map.park_map_modal_window == 'yes' && Drupal.settings.park_map.park_map_ie != 'ie ie8'){
        Drupal.park_map.openModalWindow( popup_content )
      }else{
        // Genera popup
        if( Drupal.settings.park_map.park_map_popup_display=='normal'){
          var popup = new L.Rrose({
            XBound: 0,
            YBound: 0,
            keepInView: true,
            offset: new L.Point(0,-3), 
            closeButton: true, 
            autoPan: true,
            maxWidth: Drupal.park_map.maxWidthPopUP,
            maxHeight: Drupal.park_map.maxHeightPopUP,
          }).setLatLng(e.latlng).setContent(popup_content).openOn(Drupal.park_map.map)
        }
        if( Drupal.settings.park_map.park_map_popup_display=='inside'){
          var popup = new L.Rrose({
            XBound: $('#'+Drupal.park_map.cssID).width()/2,
            YBound: $('#'+Drupal.park_map.cssID).height()/2,
            keepInView: true,
            offset: new L.Point(0,-3), 
            closeButton: true, 
            autoPan: true,
            maxWidth: Drupal.park_map.maxWidthPopUP,
            maxHeight: Drupal.park_map.maxHeightPopUP,
          }).setLatLng(e.latlng).setContent(popup_content).openOn(Drupal.park_map.map)
        }
        Drupal.park_map.popup = popup;                
      }
    },
    getIcon:function( what_return, class_icon, coords, color, class_icon_inside, color_icon_inside, delta ){
      switch(what_return) {
        case "icono_para_mapa_default":
          var icon = L.divIcon({
            className: 'park_map_icon_default break-'+class_icon_inside, 
            html: "<span class='icono'></span><span class='delta'><i class='"+class_icon_inside+"'></i></span>",
          });
          break;
        case "icono_para_mapa":
          var icon = L.divIcon({
            className: 'park_map_icon park_map_icon_'+class_icon, 
            html: "<i class='park_map_icon_poi "+class_icon+"' style='color:"+color+"'><i class='park_map_icon_inside_poi "+class_icon_inside+"' style='color:"+color_icon_inside+";background:"+color+"'></i></i>",
          });
          break;
        case "icono_para_mapa_rutas_default":
          var icon = L.divIcon({
            className: 'park_map_icon_default', 
            html: "<span class='icono'></span><span class='delta'>"+delta+"</span>",
          });
          break;
        case "icono_para_mapa_rutas":
          var icon = L.divIcon({
            className: 'park_map_icon park_map_icon_'+class_icon, 
            html: "<i class='park_map_icon_poi "+class_icon+"' style='color:"+color+"'></i><span class='delta' style='color:"+color_icon_inside+";background:"+color+"'>"+delta+"</span>",
          });
          break;
        case "icono_para_resultados_rutas_default":
          var icon = "<div class='item contenedor_icono'><div class='park_map_icon_default resultados_rutas'><span class='icono'></span><span class='delta'>"+delta+"</span></div></div>";
          break;
        case "icono_para_resultados_rutas":
          var icon = "<div class='item contenedor_icono'><div class='park_map_path_icon park_map_path_icon_"+class_icon+"'><i class='park_map_icon_poi "+class_icon+"' style='color:"+color+"'></i><span class='delta' style='color:"+color_icon_inside+";background:"+color+"'>"+delta+"</span></div></div>";
          break;
        default:
          //default code block
      }
      return icon;
    },
    setImWaiting:function(){
      $('div#vista_poi_reference #loading').css('display','block');
      $('.imWaiting').css({
        "display":"block",
        "background-repeat": "no-repeat",
        "background-position": "center center",
        "position":"absolute",
        "z-index": 9999,
        "height":$('.imWaiting').parent().height(),
        "width":$('.imWaiting').parent().width(),
        //"background":"red",
      });
    },
    removeImWaiting:function(){
      $('.imWaiting').css({"display":"none"});
      $('div#vista_poi_reference #default_msg').css('display','none');
      $('div#vista_poi_reference #loading').css('display','none');
    },
    openModalWindow:function( contenido_ventana){
      $('div#ventana_modal #modal #contenedor #contenido *').remove()
      $('div#ventana_modal #modal #contenedor #contenido').append( contenido_ventana )
      $('div#ventana_modal #modal #contenedor').addClass('leaflet-rrose')
      $('div#ventana_modal #modal #contenedor .close').addClass('leaflet-rrose-close-button')
      $('div#ventana_modal #modal #contenedor #contenido').addClass('leaflet-rrose-content')
      $('div#ventana_modal #modal').addClass('activada')
    },
    closeModalWindow:function(){ $('div#ventana_modal #modal').removeClass('activada')
    }
  };
})(jQuery);
