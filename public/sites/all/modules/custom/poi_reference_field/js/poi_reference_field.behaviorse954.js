(function ($) {
  Drupal.behaviors.PoiReferencePageAdmin = {
    attach:function (context, settings) {

      $( window ).load(function() {
        if( $('div.leaflet-marker-pane').length ) {
          //Drupal.behaviors.PoiReferencePageAdmin.loadsPoisWithoutSave();
        }
      });

      if( $( "tr" ).hasClass( "drag" ) ){
        $( "div#btn_update_poi_reference" ).show();
      }

      $(document).bind("ajaxSend", function(){
        $( "div#btn_update_poi_reference" ).show();
        Drupal.behaviors.PoiReferencePageAdmin.removeAllPoisReference();
      }).bind("ajaxComplete", function(){
        
      });
      
      $( '#btn_update_poi_reference' ).once().click(function(){
        Drupal.behaviors.PoiReferencePageAdmin.removeAllPoisReference();
        Drupal.behaviors.PoiReferencePageAdmin.loadsPoisWithoutSave();
        $(this).hide();
      })

      $( 'div.field-type-poi-reference select' ).on('change' ,function(){
        if( $('input.leaflet-map-field').length ) {
          Drupal.behaviors.PoiReferencePageAdmin.removeAllPoisReference();
          Drupal.behaviors.PoiReferencePageAdmin.loadsPoisWithoutSave();
        }
      })
    },
    removeAllPoisReference:function(){
      $("div#field_map div.leaflet-marker-pane *").remove();
      //$("div.leaflet-shadow-pane div").remove();
    },
    getPoiOfReference:function( nid , delta ){
      //alert(nid)
      console.clear()
      if (typeof nid != 'undefined') {
        var loc = window.location.origin;
        if (!window.location.origin) { loc = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: ''); }     
        var url = loc + '/' + Drupal.settings.pathPrefix + "query/park_map_query_poi_reference_admin";
        var data = "nid="+nid;

        $( "div#field_map_loading" ).show();
        //consulta a base de datos
        $.ajax({
          type: "GET",
          url:url,
          data:data,
          success: function (data) {
            (data.data) ? '' : data.data = new Array();
            if(data==''){
              console.log( 'No hay resultados' )
            }else{
              //console.log(data.data)
              Drupal.behaviors.leafletMapField.drawFromJSON( data.data.coor , 1 , delta);
            }
          },
          complete: function(){
           $( "div#field_map_loading" ).hide();
           $( "div#btn_update_poi_reference" ).hide();
         }
        });

      }
    },
    loadsPoisWithoutSave:function(){
      var delta = 1;
      $("div.field-type-poi-reference select").each(function(){
        //console.log(delta+' = '+$(this).val())
        Drupal.behaviors.PoiReferencePageAdmin.getPoiOfReference( $(this).val() , delta );
        delta++;
      });
    },
  }
})(jQuery);