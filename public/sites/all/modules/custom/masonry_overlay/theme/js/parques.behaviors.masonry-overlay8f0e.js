(function ($) {

  Drupal.behaviors.masonryOverlay = {

    attach: function (context, settings) {

      var contenedorMasonry = '.distributiva';
      var contenedorMasonry23 = '.distributiva23';
      var contenedorOverlay = '.field--name-field-overlay';
      var itemMasonry = '.caja-item';
      var brickClass1x1 = '.caja-1x1';
      var brickClass1x2 = '.caja-1x2';
      var brickClass2x1 = '.caja-2x1';
      var overlayClassHover = '.ch_hover';
      var overlayClassNormal = '.ch_normal';
      var overlayClassWrapper = '.ch_wrapper';
      var overlayContenthoverClass = '.contenthover';
      var overlayItemBase = '.overlay-item-';

      $(contenedorMasonry).masonry({
        columnWidth: function( containerWidth ) {
          return containerWidth / 3;
        },
        itemSelector: itemMasonry,
        gutterWidth: 0,
        isAnimated: true,
        isFitWidth: false,
        isResizable: true,
        isRTL: false,
        animationOptions: {
          duration: 400
        }
      });

      $(contenedorMasonry23).masonry({
        columnWidth: function( containerWidth ) {
          return containerWidth / 2;
        },
        itemSelector: itemMasonry,
        gutterWidth: 0,
        isAnimated: true,
        isFitWidth: false,
        isResizable: true,
        isRTL: false,
        animationOptions: {
          duration: 400
        }
      });
      $('.field--name-field-tipo-de-distributiva').hide();
      Drupal.behaviors.masonryOverlay.imageLink(contenedorMasonry, itemMasonry, overlayItemBase, contenedorMasonry23);
      //Drupal.behaviors.masonryOverlay.detectBrowserAndSO();
      //console.log('Nombre del navegador: ' + Drupal.behaviors.masonryOverlay.detectBrowserAndSO())
      //Controlador
      $(window).bind('resize load', function (evento){
        // console.log(evento);
        // console.log('Pasa por load and resize');
        Drupal.behaviors.masonryOverlay.resize( contenedorMasonry , contenedorOverlay, itemMasonry, brickClass1x1, brickClass1x2, brickClass2x1, overlayClassHover, overlayClassNormal, overlayClassWrapper, overlayContenthoverClass , overlayItemBase, contenedorMasonry23 );
        Drupal.behaviors.masonryOverlay.ajusteResize( contenedorMasonry, itemMasonry, brickClass1x1, brickClass1x2, brickClass2x1, contenedorMasonry23 );
      });
    },
    resize: function ( contenedorMasonry , contenedorOverlay, itemMasonry, brickClass1x1, brickClass1x2, brickClass2x1, overlayClassHover, overlayClassNormal, overlayClassWrapper, overlayContenthoverClass , overlayItemBase, contenedorMasonry23) {
      var $this = $(this);
      var reAncho1x1 = 0;
      var reAlto1x1 = -4;
      var reAncho2x1 = -4;
      var reAlto2x1 = -6;
      var reAncho1x2 = 0;
      var reAlto1x2 = -8;
      var altoBorde = -40;
      var marginBottom = 5;
      var verticalGutter = 5;
      var horizontalGutter = 10;

      // Procesamos cajas 1x1
      $( itemMasonry + brickClass1x1 ).each(function(){
        $(this).css({'height': $(this).width()*0.85 });
        Drupal.behaviors.masonryOverlay.overlay( contenedorOverlay, contenedorMasonry, itemMasonry, overlayItemBase, contenedorMasonry23, brickClass1x1 );

        var ancho = $(this).width();
        var alto =  $(this).height();

        $(brickClass1x1 + ' ' + overlayClassWrapper + ',' + brickClass1x1 + ' ' + overlayClassNormal + ',' + brickClass1x1 + ' ' + overlayClassHover + ',' + brickClass1x1 + ' ' + overlayClassHover + ' ' + overlayContenthoverClass + ',' + brickClass1x1 + ' ' + overlayClassHover + ' ' + contenedorOverlay).css({
          width : ancho + reAncho1x1 + 'px',
          height : alto + reAlto1x1 + 'px',
        });
      });

      // Procesamos cajas 2x1
      $( itemMasonry + brickClass2x1 ).each(function(){
        if ($(itemMasonry + brickClass1x1).length) {
          var ancho1x1 = $(itemMasonry + brickClass1x1).width();
        } else if ($(window).width() >= 768) {
          var ancho1x12 = ($(this).width() - verticalGutter)/2;
          $(this).css({'height': ancho1x12*0.85 });
        }
        $(this).css({'height': ancho1x1*0.85 });
        Drupal.behaviors.masonryOverlay.overlay( contenedorOverlay, contenedorMasonry, itemMasonry, overlayItemBase, contenedorMasonry23, brickClass2x1 );

        var ancho2 = $(this).width();
        var alto2 =  $(this).height();

        $(brickClass2x1 + ' ' + overlayClassWrapper + ',' + brickClass2x1 + ' ' + overlayClassNormal + ',' + brickClass2x1 + ' ' + overlayClassHover + ',' + brickClass2x1 + ' ' + overlayClassHover + ' ' + overlayContenthoverClass).css({
          width : ancho2 + reAncho2x1 + 'px',
          height : alto2 + reAlto2x1 + 'px',
        });
        $(brickClass2x1 + ' ' + overlayClassHover + ' ' + contenedorOverlay).css({
          width : ancho2 + reAncho2x1 + 'px',
          height : alto2 + altoBorde + 'px',
        });
      });

      // Procesamos caja 1x2
      $( itemMasonry + brickClass1x2 ).each(function(){
        var alto1x1 =  $(itemMasonry + brickClass1x1).height();
        var ancho1x1 =  $(itemMasonry + brickClass1x1).width();
        var relacion = (alto1x1 * 2 + marginBottom)/ancho1x1;
        if ( relacion == "Infinity" || typeof altoTexto == "undefined") {
          relacion = 1.725;
        };
        if ( $(itemMasonry + brickClass1x1).length) {
          var height = $(itemMasonry + brickClass1x1).width()*relacion;
        } else {
          var height = $(this).width()*relacion;
        };

        $(this).css({'height': height});
        Drupal.behaviors.masonryOverlay.overlay( contenedorOverlay, contenedorMasonry, itemMasonry, overlayItemBase, contenedorMasonry23, brickClass1x2 );

        var ancho3 = $(this).width();
        var alto3 =  $(this).height();

        $(brickClass1x2 + ' ' + overlayClassWrapper + ',' + brickClass1x2 + ' ' + overlayClassNormal + ',' + brickClass1x2 + ' ' + overlayClassHover + ',' + brickClass1x2 + ' ' + overlayClassHover + ' ' + overlayContenthoverClass + ',' + brickClass1x2 + ' ' + overlayClassHover + ' ' + contenedorOverlay).css({
          width : ancho3 + reAncho1x2 + 'px',
          height : alto3 + reAlto1x2 + 'px',
        });
      });

      Drupal.behaviors.masonryOverlay.ajusteResize( contenedorMasonry, itemMasonry, brickClass1x1, brickClass1x2, brickClass2x1, contenedorMasonry23 );
    },
    overlay: function( contenedorOverlay , contenedorMasonry, itemMasonry, overlayItemBase, contenedorMasonry23, brickClass){
      if ($( contenedorMasonry + ' ' + itemMasonry).length != 0) {
        var items = $( contenedorMasonry + ' ' + itemMasonry).length;
      }
      else if ($( contenedorMasonry23 + ' ' + itemMasonry)){
        var items = $( contenedorMasonry23 + ' ' + itemMasonry).length;
      }
      $(contenedorOverlay).closest('.caja-item').css({'cursor': 'pointer'});
      $(contenedorOverlay).closest('.caja-item').mousedown(function(e){
        switch(e.which)
        {
          case 1:
          //case 3:
            if(typeof $(this).find("a").attr("href") != "undefined"){
              window.location = $(this).find("a").attr("href");
              // console.log('Case 1 if: ' + window.location);
            }else if ($(this).parents('.ch_element.ch_wrapper').siblings('.field--name-field-titulo-de-caja').find('.field--name-field-link-distributiva a').attr("href")){
              window.location = $(this).parents('.ch_element.ch_wrapper').siblings('.field--name-field-titulo-de-caja').find('.field--name-field-link-distributiva a').attr("href");
              // console.log('Case 1 else: ' + window.location);
            }
          break;
          case 2:
            if(typeof $(this).find("a").attr("href") != "undefined"){
              window.open($(this).find("a").attr("href"));
              // console.log('Case 2 if: ' + window.location);
              e.stop();
            }else if ($(this).parents('.ch_element.ch_wrapper').siblings('.field--name-field-titulo-de-caja').find('.field--name-field-link-distributiva a').attr("href")){
              window.open($(this).parents('.ch_element.ch_wrapper').siblings('.field--name-field-titulo-de-caja').find('.field--name-field-link-distributiva a').attr("href"));
              // console.log('Case 2 else: ' + window.location);
              e.stop();
            }
          break;
        }
        return true;// to allow the browser to know that we handled it.
      });
      // console.log('Overlay items: ' + items);
      for (i = 1; i < items+1; i++) {
        // console.log('indice:' + i);
        if ($(overlayItemBase+i+' '+ contenedorOverlay).find("a").attr("href")) {
          $(overlayItemBase+i+' '+ contenedorOverlay).css({'cursor': 'pointer'});
        }
        $(brickClass + overlayItemBase+i+' .content > .field').not('.field--name-field-tipo-de-caja').not('.procesed-overlay').each(function() {
          $(this).addClass('procesed-overlay');
          $(this).contenthover({
            data_selector: overlayItemBase+i+' .content ' + contenedorOverlay,
            //overlay_background:'#004599',
            overlay_opacity:0.85,
            overlay_y_position: 'center',
            fade_speed: 1,
          });
        });
      };
    },
    imageLink: function( contenedorMasonry, itemMasonry, overlayItemBase, contenedorMasonry23 ){

      if($( contenedorMasonry + ' ' + itemMasonry).length != 0){
        var items = $( contenedorMasonry + ' ' + itemMasonry).length;
      }
      else if ($( contenedorMasonry23 + ' ' + itemMasonry)){
        var items = $( contenedorMasonry23 + ' ' + itemMasonry).length;
      }

      for (i = 1; i < items+1; i++) {
        //console.log('i dentro fuera: ' + i);
        $(overlayItemBase+i+' .field--type-image,'+overlayItemBase+i+' .field--name-field-titulo-de-caja').append($(overlayItemBase+i+' .field--name-field-link-distributiva'));
        $(overlayItemBase+i+' .field--name-field-link-distributiva').hide();
        if ($(overlayItemBase+i+' .field--type-image').find("a").attr("href")) {
          $(overlayItemBase+i+' .field--type-image').css({'cursor': 'pointer'});
        }
        if ($(overlayItemBase+i+' .field--name-field-titulo-de-caja').find("a").attr("href")) {
          $(overlayItemBase+i+' .field--name-field-titulo-de-caja').css({'cursor': 'pointer'});
        }
      };
      $('.field-collection-item-field-cajas-de-distributiva .field--name-field-titulo-de-caja, .field-collection-item-field-cajas-de-distributiva .field--type-image').click(function(e) {
        if ($(this).find("a").attr("href")){
          window.location = $(this).find("a").attr("href");
        } else if ($(this).siblings('.field--name-field-overlay').find("a").attr("href")){
          window.location = $(this).siblings('.field--name-field-overlay').find("a").attr("href");
        }
      });
    },
    ajusteResize: function( contenedorMasonry, itemMasonry, brickClass1x1, brickClass1x2, brickClass2x1, contenedorMasonry23 ){

      var numBricks1x1 = $(brickClass1x1).length;
      var valorBricks1x1 = numBricks1x1;
      var numBricks2x1 = $(brickClass2x1).length;
      var valorBricks2x1 = numBricks2x1 * 2;
      var numBricks1x2 = $(brickClass1x2).length;
      var valorBricks1x2 = numBricks1x2 * 2;
      var valorTotalBricks = valorBricks1x1 + valorBricks2x1 + valorBricks1x2;
      var niveles = Math.floor(valorTotalBricks/3);
      var niveles23 = Math.floor(valorTotalBricks/2);

      if ($(brickClass1x1).length) {
        var alturaTotal  =  $(itemMasonry + brickClass1x1).height() * niveles + (12 * niveles);
        var alturaTotal23  =  $(itemMasonry + brickClass1x1).height() * niveles23 + (12 * niveles23);
      } else if ($(brickClass2x1).length) {
        var alturaTotal  =  $(itemMasonry + brickClass2x1).height() * niveles + (12 * niveles);
        var alturaTotal23  =  $(itemMasonry + brickClass2x1).height() * niveles23 + (12 * niveles23);
      } else {
        var alturaTotal  =  (($(itemMasonry + brickClass1x2).height()/2) - 12) * niveles + (12 * niveles);
        var alturaTotal23  =  (($(itemMasonry + brickClass1x2).height()/2) - 12) * niveles23 + (12 * niveles23);
      }
      var clientHeight = document.getElementsByClassName('distributiva');
      var clientHeight23 = document.getElementsByClassName('distributiva23');
      //console.log ('clientHeight length: ' + clientHeight.length);
      //console.log ('clientHeight23 length: ' + clientHeight23.length);
      var i;
      for (i = 0; i < clientHeight.length; i++) {
          //console.log('Altura clientHeight: ' + clientHeight[i].clientHeight);
      }
      var i2;
      for (i2 = 0; i2 < clientHeight23.length; i2++) {
          //console.log('Altura clientHeight23: ' + clientHeight23[i].clientHeight);
      }
      //console.log('Altura clientHeight: ' + clientHeight);
      //console.log('Altura clientHeight23: ' + clientHeight23);


      //console.log('Altura contenedor: ' + $(contenedorMasonry).height());
      //console.log('Altura contenedor23: ' + $(contenedorMasonry23).height());

      var alturaContenedor = $(contenedorMasonry).height();
      var alturaContenedor23 = $(contenedorMasonry23).height();
      //console.log('alturaContenedor: ' + alturaContenedor);
      //console.log('alturaContenedor23: ' + alturaContenedor23);
      //console.log('Altura total: ' + alturaTotal);
      //console.log('Altura total23: ' + alturaTotal23);
      //console.log('primer si ' + $(contenedorMasonry).height() + ' mayor que ' + alturaTotal + ' recargar')
      if ($(contenedorMasonry).height()) {
        if (($(contenedorMasonry).height()) > alturaTotal) {
          $(contenedorMasonry).masonry( 'reloadItems' );
          $(contenedorMasonry).masonry( 'reload' );
          //console.log('RECARGADO primero');
          //console.log('segundo si ' + $(contenedorMasonry).height() + ' mayor que ' + alturaTotal + ' recargar')
          if (($(contenedorMasonry).height()) > alturaTotal) {
            $(contenedorMasonry).masonry( 'reloadItems' );
            $(contenedorMasonry).masonry( 'reload' );
            //location.reload(true);
            //console.log('RECARGADO segundo');
            if (($(contenedorMasonry).height()) > alturaTotal) {
              $(contenedorMasonry).masonry( 'reloadItems' );
              $(contenedorMasonry).masonry( 'reload' );
              //location.reload(true);
              //console.log('RECARGADO tercero');
            }
          }
        }
      }

      //console.log('primer 23 si ' + $(contenedorMasonry23).height() + ' mayor que ' + alturaTotal23 + ' recargar')
      if ($(contenedorMasonry23).height()) {
        if (($(contenedorMasonry23).height()) > alturaTotal23) {
          $(contenedorMasonry23).masonry( 'reloadItems' );
          $(contenedorMasonry23).masonry( 'reload' );
          //console.log('RECARGADO 23 primero');
          //console.log('Nombre del navegador: ' + Drupal.behaviors.masonryOverlay.detectBrowserAndSO());
          //console.log('segundo 23 si ' + $(contenedorMasonry23).height() + ' mayor que ' + alturaTotal23 + ' recargar')
          if (($(contenedorMasonry23).height()) > alturaTotal23) {
            $(contenedorMasonry23).masonry( 'reloadItems' );
            $(contenedorMasonry23).masonry( 'reload' );
            //location.reload(true);
            console.log('RECARGADO 23 segundo');
            if (($(contenedorMasonry23).height()) > alturaTotal23) {
              $(contenedorMasonry23).masonry( 'reloadItems' );
              $(contenedorMasonry23).masonry( 'reload' );
              //location.reload(true);
              //console.log('RECARGADO 23 tercero');
            }
          }
        }
      }
    },
    detectBrowserAndSO: function() {
      var nVer = navigator.appVersion;
      var nAgt = navigator.userAgent;
      var browserName  = navigator.appName;
      var fullVersion  = ''+parseFloat(navigator.appVersion);
      var majorVersion = parseInt(navigator.appVersion,10);
      var nameOffset,verOffset,ix;

      // In Opera, the true version is after "Opera" or after "Version"
      if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
       browserName = "Opera";
       fullVersion = nAgt.substring(verOffset+6);
       if ((verOffset=nAgt.indexOf("Version"))!=-1)
         fullVersion = nAgt.substring(verOffset+8);
      }
      // In MSIE, the true version is after "MSIE" in userAgent
      else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
       browserName = "Microsoft Internet Explorer";
       fullVersion = nAgt.substring(verOffset+5);
      }
      // In Chrome, the true version is after "Chrome"
      else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
       browserName = "Chrome";
       fullVersion = nAgt.substring(verOffset+7);
      }
      // In Safari, the true version is after "Safari" or after "Version"
      else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
       browserName = "Safari";
       fullVersion = nAgt.substring(verOffset+7);
       if ((verOffset=nAgt.indexOf("Version"))!=-1)
         fullVersion = nAgt.substring(verOffset+8);
      }
      // In Firefox, the true version is after "Firefox"
      else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
       browserName = "Firefox";
       fullVersion = nAgt.substring(verOffset+8);
      }
      // In most other browsers, "name/version" is at the end of userAgent
      else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) <
                (verOffset=nAgt.lastIndexOf('/')) )
      {
       browserName = nAgt.substring(nameOffset,verOffset);
       fullVersion = nAgt.substring(verOffset+1);
       if (browserName.toLowerCase()==browserName.toUpperCase()) {
        browserName = navigator.appName;
       }
      }
      // trim the fullVersion string at semicolon/space if present
      if ((ix=fullVersion.indexOf(";"))!=-1)
         fullVersion=fullVersion.substring(0,ix);
      if ((ix=fullVersion.indexOf(" "))!=-1)
         fullVersion=fullVersion.substring(0,ix);

      majorVersion = parseInt(''+fullVersion,10);
      if (isNaN(majorVersion)) {
       fullVersion  = ''+parseFloat(navigator.appVersion);
       majorVersion = parseInt(navigator.appVersion,10);
      }

      //console.log(''
      // +'Browser name  = '+browserName+'<br>'
      // +'Full version  = '+fullVersion+'<br>'
      // +'Major version = '+majorVersion+'<br>'
      // +'navigator.appName = '+navigator.appName+'<br>'
      // +'navigator.userAgent = '+navigator.userAgent+'<br>'
      //)
      var OSName="Unknown OS";
      if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
      if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
      if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
      if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";

      //console.log('Your OS: '+OSName);

      return OSName + browserName;
    }
  };
})(jQuery);
