(function ($) {

  /**
   *  Close Sidr menu on desktop
   */
  function doDesktop(mq) {
    if (mq.matches) {
      $.sidr('close', 'sidr-0');
    }
  }

  /**
   *  Pull bottom sidebar up into the top sidebar region on tablet & desktop
   */
  function doTablet(mq) {
    if (mq.matches) {
      $(".rightbar-region--fourth > div").addClass("pane-pulled-up").appendTo(".rightbar-region--second-b");
      $(".leftbar-region--fourth > div").addClass("pane-pulled-up").appendTo(".leftbar-region--second");
    }
    else {
      // put the pulled up panes back where they belong
      $(".rightbar-region--second-b > .pane-pulled-up").appendTo(".rightbar-region--fourth").removeClass("pane-pulled-up");
      $(".leftbar-region--second > .pane-pulled-up").appendTo(".leftbar-region--fourth").removeClass("pane-pulled-up");
    }
  }

  /**
   *  Watch for screen size change
   */
  Drupal.behaviors.tusResponsiveBehavior = {
    attach: function (context, settings) {

      var desktop_width = Drupal.settings.omega.mediaQueries['desktop-media-query'];
      var tablet_width = Drupal.settings.omega.mediaQueries['tablet-media-query'];

      // Media Queries Matching
      if (typeof matchMedia != 'undefined') {
        var desktop = window.matchMedia(desktop_width);
        desktop.addListener(doDesktop);
        doDesktop(desktop);
        var tablet = window.matchMedia(tablet_width);
        tablet.addListener(doTablet);
        doTablet(tablet);
      }
    }
  };

  /**
   *  The Sidr menu in mobile & tablet
   */
  Drupal.behaviors.tusSidrBehavior = {
    attach: function (context, settings) {
      // Collapse submenu items - show/hide on click.
      // TO BE REPLACED BY MODULE SETTING WHEN RELEASED:
      // see https://www.drupal.org/node/2382691
      $('.sidr-class-menuparent:not(.sidr-class-active-trail)').siblings('ul').hide();
      $('.sidr-class-menuparent.sidr-class-active-trail').addClass('sidr-expanded');
      $('.sidr-class-menuparent', context).once().click(function() {
        $(this).siblings('ul').slideToggle();
        $(this).toggleClass('sidr-expanded');
        return false;
      });
      // Remove .sidr-class- prefix from i element classes to allow styling
      $('i.sidr-class-icon').each(function() {
        var sidrClass = $(this).attr('class');
        var iconClass = sidrClass.replace(/sidr-class-/g, '');
        $(this).addClass(iconClass).removeClass(sidrClass);
      });
      // Add the search icon beside the Sidr menu icon
      if( !$('#sidr-wrapper-0 .icon-search').length ){
        $('#sidr-wrapper-0').append('<i class="icon fontello icon-search"></i>');
      }
    }
  };

  /**
   *  Handle the 'See more social media' action
   */
  Drupal.behaviors.tusSocialBehavior = {
    attach: function (context, settings) {
       // show more social links
      $('.social-media-icons .icon-plus, .social-media-icons .icon-menu-small', context).once().click(
        function() {
          $(this).closest('p').next('p').toggle();
        }
      );
      $(document).on('click', function(event) {
        if (!$(event.target).closest('.social-media-icons .icon-plus, .social-media-icons .icon-menu-small').length) {
          // close more social media.
          $('.social-media-icons p:nth-child(2)').hide();
        }
      });
    }
  };

  /**
   *  Toggle the search form
   */
  Drupal.behaviors.tusSearchBehavior = {
    attach: function (context, settings) {
       // show search bar
      $('.icon-search', context).once().on('click',
        function() {
          $('.l-region--search-bar').toggle();
        }
      );
      $('.search-block-form .close-button', context).once().click(
        function() {
          $('.l-region--search-bar').hide();
        }
      );
      $('.sidr-class-search-button', context).once().click(
        function() {
          $('.l-region--search-bar').show();
          $.sidr('close', 'sidr-0');
        }
      );
      $('.page-page-not-found a[name=search]', context).once().click(
        function() {
          $('.l-region--search-bar').show();
        }
      );
      $('.l-region--search-bar .form-text').example($('.l-region--search-bar .form-submit').attr('value'));
    }
  };

  /**
   *  Assign the accordion behavior to the prices and faq pages
   */
  Drupal.behaviors.tusAccordionBehavior = {
    attach: function (context, settings) {
      if($.fn.accordion) {
        $('#quicktabs-prices .view-accordion').accordion({ header: ".views-field-title-field", animate: 200, heightStyle: 'content', collapsible: true });
      }
      if($.fn.collapse) {
        $('.collapsible-list').collapse();
        $('.collapsible-list :header').prepend('<i class="icon fontello icon-plus-squared"></i>');
        $('.collapsible-list :header i, .collapsible-list :header a', context).once().click(
          function() {
            if ($(this).is('i')) {
              $(this).toggleClass('icon-plus-squared, icon-minus-squared');
            }
            else if ($(this).is('a')) {
              $(this).prev('i').toggleClass('icon-plus-squared, icon-minus-squared');
            }
          }
        );
      }
    }
  };

  /**
   *  Manage the "Como Llegar" buttons
   */
  Drupal.behaviors.tusGetHereBehavior = {
    attach: function (context, settings) {
      $('.pane-how-to-get-here .pane-button', context).once().click(function(e) {
        $button = $(this).parent();
        $instructions = $button.next('.gethere-region').find('.pane-instructions');
        if (!$(this).is('.active-instructions')) {
          $('.active-instructions').parent().css('margin-bottom', '0px');
          $('.active-instructions').removeClass('active-instructions');
          $(this).addClass('active-instructions');
          $(".pane-instructions:visible").hide();
          $height = $instructions.outerHeight() + 20 + 'px';
          if ($('body').is('.tablet-media-query-active')) {
            $button.css('margin-bottom', $height);
          }
          $instructions.show();
        }
        else {
          $instructions.hide();
          $(this).removeClass('active-instructions');
          $button.css('margin-bottom', '0');
        }
      });
    }
  };

  /**
   *  Map
   */
  Drupal.behaviors.tusMapBidi = {
    attach: function (context, settings) {
      $(window).on('resize load', function (){
        //console.log($(window).width());
        if($(window).width() >= 753){
          $('.pane-node-body').appendTo($('#map-container-filters'));
        } else {
          $('#vista_poi_reference').after($('.pane-node-body'));
        }
      });
    }
  };

  /**
   *  Link to Google Maps
   */
  Drupal.behaviors.tusGMapaQuitarEspacios = {
    attach: function (context, settings) {
      $('a[href^="https://www.google.com/maps"]').attr('href', function(_,v){
        return v.replace(/\(0\)|\s+/g,'')
      });
    }
  };

  /*
  * Habilita owlCarousel
  */
  Drupal.behaviors.tusWidgets = {
    getCarousel:function(selector, elements_mobile, elements_tab, elements_desk){
      if( Drupal.settings.tus_settings.carousel == "1" ){
        var carousel = $(selector).owlCarousel({
          autoHeight : false,
          navigation : true,
          pagination : false,
          itemsCustom : [
            [Drupal.settings.tus_settings.breakpoint.smartportrait, elements_mobile],
            [Drupal.settings.tus_settings.breakpoint.tablet, elements_tab],
            [Drupal.settings.tus_settings.breakpoint.desktop, elements_desk]
          ],
          theme : 'tus_carrousel',
          slideSpeed : 500,
          paginationSpeed : 500,
          rewindSpeed : 500,
          addClassActive : false,
          rewindNav: false,
          itemsScaleUp:true,
          navigationText: ["<",">"],
          afterInit : function(){
            var numItems = $(selector+' .owl-item').length;
          },
          afterMove: function(){
          }
        });
        return carousel;
      }
    }
  }

  /*
  * Crea carrusel en precios
  */
  Drupal.behaviors.tusPrices = {
    attach: function (context, settings) {
      $( window ).on('resize',function() { Drupal.behaviors.tusPrices.getCarouselPrices(); });
      $( document ).ready(function() {
        Drupal.behaviors.tusPrices.getCarouselPrices();
        Drupal.behaviors.tusPrices.setFreePrices();
        Drupal.behaviors.tusPrices.setlinksOnlinePices(settings.pathPrefix);
        Drupal.behaviors.tusPrices.setExtraFunctionality();
      });

      $('#quicktabs-prices ul.quicktabs-tabs a').bind('click', function(){
        $(this).parent('li').addClass('active');
        $(this).parents('div.owl-item').siblings().children('li').removeClass('active');
      });
    },
    getCarouselPrices: function(){
      if( $(window).width() + Drupal.settings.tus_settings.breakpoint.cutting_edge < parseInt(Drupal.settings.tus_settings.breakpoint.tablet) ){
        Drupal.behaviors.tusPrices.carousel = Drupal.behaviors.tusWidgets.getCarousel( '#quicktabs-prices ul.quicktabs-tabs', 2, 2, 2 );
      }else{
        if ( $(Drupal.behaviors.tusPrices.carousel).length && typeof Drupal.behaviors.tusPrices.carousel.data('owlCarousel') !== typeof undefined) {
          Drupal.behaviors.tusPrices.carousel.data('owlCarousel').destroy();
        }
      }
    },
    setFreePrices:function(){
      $( ".view-price-category td .field__item" ).each(function() {
        if( $(this).text() == "kr 0,00" ) $(this).text( Drupal.t("Free") );
      });
    },
    setlinksOnlinePices: function(pathPrefix){
      tickets_go_to_url = "/"+pathPrefix+"tickets";
      passes_go_to_url = "/"+pathPrefix+"passes";
      // Funnel tickets
      $('.quicktabs-tabpage').not('#quicktabs-tabpage-prices-1').find('.field_price_online div.field__item').wrap('<a href="'+tickets_go_to_url+'" target="_blank"></a>');
      // Funnel passes
      $('#quicktabs-tabpage-prices-1').find('.field_price_online div.field__item').wrap('<a href="'+passes_go_to_url+'" target="_blank"></a>');
    },
    setExtraFunctionality: function(){
      // Establece asteriscos en Pases anuales
      $( "#quicktabs-tabpage-prices-1 .view-price-category tr" ).each(function( index ) {
        var elem_price = $(this).find('.field_price_online .field__item');
        if( !$(this).find('.field_price_online .field__item').text().indexOf("kr") && index != 1  ){
          elem_price.text( elem_price.text()+"*" )
        }
        var elem_price = $(this).find('.field_price .field__item');
        if( !$(this).find('.field_price .field__item').text().indexOf("kr") && index != 1  ){
          elem_price.text( elem_price.text()+"*" )
        }
      });

      var senior = $( "#quicktabs-tabpage-prices-0 .view-price-category tr:nth-child(4)" ).find('.field_price_online .field__item');
      senior.text( senior.text()+"*" );
      var senior = $( "#quicktabs-tabpage-prices-0 .view-price-category tr:nth-child(4)" ).find('.field_price .field__item');
      senior.text( senior.text()+"*" );
      var dag_price = $( "#quicktabs-tabpage-prices-0 .view-price-category tr:nth-child(5)" ).find('.field_price_online');
      dag_price.text( dag_price.text()+"**" );
    }
  }

  /*
   * Calendar
   */
  Drupal.behaviors.tusOpeningDays = {
    attach: function( context, settings ) {
      $(window).load(function(){
        Drupal.behaviors.tusOpeningDays.checkNavCalendar();
        var horario_apertura = $('.today').find('.horario_apertura').text();
        var date = $('.today').data('date');
        Drupal.behaviors.tusOpeningDays.checkIfDayIsOpen( date, horario_apertura );
      });

      $( document ).ajaxComplete(function() {
        Drupal.behaviors.tusOpeningDays.checkNavCalendar();
      });

      //Disparador mes solicitado
      $(".view-calendar-legend #select-month").on("change", function() {
        var selected = $(this).find('option:selected');
        Drupal.behaviors.tusOpeningDays.getCalendar( $(this).val(), selected.data('dateprev'), selected.data('datenext') );
      });
      $(".view-calendar-legend span.dateprev").on("click", function() {
        var prev = $('#form-select-month select option:selected').prev().data('dateprev');
        var next = $("#form-select-month select option:selected").prev().data('datenext');
        Drupal.behaviors.tusOpeningDays.getCalendar( $(this).data('date'), prev, next );
      });
      $(".view-calendar-legend span.datenext").on("click", function() {
        var prev = $('#form-select-month select option:selected').next().data('dateprev');
        var next = $("#form-select-month select option:selected").next().data('datenext');
        Drupal.behaviors.tusOpeningDays.getCalendar( $(this).data('date'), prev, next );
      });

      //Disparador dia solicitado
      $('.view-calendar-legend td', context).once().on('click',function(){
        if( $(this).hasClass('empty') ){
          // Si pedimos dia del distinto mes, cargamos el calendario y una vez cargado pedimos los shows del día
          var id = $(this).attr('id');
          Drupal.behaviors.tusOpeningDays.getOtherMonth( $(this), $(this).data('date'), id );
          $( document ).ajaxComplete(function( event, request, settings ) {
            if ( settings.data === "view_name=calendar_legend&view_display_id=block_1&from=otherday&id="+id ) {
              //console.log( settings );
              var horario_apertura =  $("#"+id).find('.horario_apertura').text();
              var date = $("#"+id).data('date');
              Drupal.behaviors.tusOpeningDays.getViewShows( '.calendar_shows_result_ajax', $("#"+id), $("#"+id).data('date') );
            }
          });
        } else {
          // Pedimos shows para un día del mes
          Drupal.behaviors.tusOpeningDays.getViewShows( '.calendar_shows_result_ajax', $(this), $(this).data('date') );
        }
      });

      //Estilos celdas calendario
      $('td').hover(function() {
        $(this).addClass('cursor_encima')
      }, function() {
        $(this).removeClass('cursor_encima')
      });
    },
    setDateOnShowView: function( selector_view, date, horario_apertura ){
      $(selector_view+' .fecha').html( Drupal.behaviors.tusOpeningDays.getDateFromISO( date ) );
      if ( horario_apertura == '' ){
        var output = Drupal.t('Closed');
        $(selector_view+' .hora_apertura .horas').html( output );
      } else {
        $(selector_view+' .hora_apertura .horas').html( horario_apertura );
      }
    },
    checkIfDayIsOpen: function( date, horario_apertura ){
      if ( (!horario_apertura) || ("" == horario_apertura) ){
        var output_1 = Drupal.t('Opening times: ');
        var output_2 = Drupal.t("What can you see?");
        var output_3 = Drupal.t('PARK IS CLOSED.');
        var output_4 = Drupal.t('DO YOU WANT MORE FUNCTIONALITY AND INFORMATION TUSENFRYD?');
        var output_5 = Drupal.t('DOWNLOAD THE APP')
        var output_6 = Drupal.t('Visit us! We look forward to seeing you');
        $('.view-calendar-shows').html('<div class="view-header"><div class="intro">'+output_2+'</div><div class="fecha_shows"><div class="fecha"></div><div class="hora_apertura"><span class="texto">'+output_1+'</span><span class="horas">'+horario_apertura+'</span></div><div class="horarios_info"></div></div><div class="view-empty"><div class="info_empty"><div class="info_empty1">'+output_3+'</div><div class="info_empty2">'+output_4+'</div><div class="info_empty3">'+output_5+'</div><div class="info_empty4">'+output_6+'</div></div>');
        Drupal.behaviors.tusOpeningDays.setDateOnShowView( '.view-calendar-shows', date, horario_apertura );
        $('.view-calendar-shows').css('display','block');
        return 0;
      } else {
        Drupal.behaviors.tusOpeningDays.setDateOnShowView( '.view-calendar-shows', date, horario_apertura );
        $('.view-calendar-shows').css('display','block');
        return 1;
      }
    },
    getOtherMonth: function ( parent, date, id ){
      var year_togo = date.split("-")[0];
      var month_togo = date.split("-")[0]+'-'+date.split("-")[1];
      var month_togo_number = date.split("-")[1];
      if (typeof $("#form-select-month select option[value='"+month_togo+"']").val() != 'undefined') {
        var prev = $("#form-select-month select option[value='"+year_togo+"-"+month_togo_number+"']").data('dateprev');
        var prev = $("#form-select-month select option[value='"+year_togo+"-"+month_togo_number+"']").data('dateprev');
        var next = $("#form-select-month select option[value='"+year_togo+"-"+month_togo_number+"']").data('datenext');
        Drupal.behaviors.tusOpeningDays.getCalendar( month_togo, prev, next, 'otherday', id );
      }
    },
    setClosedEmptyDay: function(){
      $('td.single-day:not(:has(.color-swatch))').not('.empty').append(' <div class="color-swatch from-js" style="background-color:red; width: 100%; height: 5px;"></div>');
    },
    getViewShows: function( selector_view, parent, date ){
      // Añadido
      var horario_apertura = parent.find('.horario_apertura').text();
      $('.view-calendar-legend td.solicitado').removeClass('solicitado');
      $('.view-calendar-legend td.today').removeClass('today');
      parent.addClass('solicitado');
      // Checks if the current day is closed
      if( Drupal.behaviors.tusOpeningDays.checkIfDayIsOpen( date, horario_apertura ) ){
        var selector_view = '.calendar_shows_result_ajax';
        $(selector_view).html('<div class="loading"></div>');
        $(selector_view+' .loading').css('display','block');

        // Load View
        $('.view-calendar-legend .bloqueo').css('display','block');
        var loc = window.location.origin;
        if (!window.location.origin) { loc = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: ''); }
        var url = loc + '/' + Drupal.settings.pathPrefix + 'views/ajax/?date='+date;
        var data = {
          view_name: 'calendar_shows',
          view_display_id: 'block',
        }
        $.ajax({
          url: url,
          type: 'post',
          data: data,
          dataType: 'json',
          success: function (response) {
            if (response[1] !== undefined) {
              //console.info(response[1].data)
              var viewHtml = response[1].data;
              $( selector_view ).html(viewHtml);
              $('.view-calendar-legend .bloqueo').css('display','none');
              $(selector_view+' .loading').remove();
              Drupal.behaviors.tusOpeningDays.setDateOnShowView( selector_view, date, horario_apertura );
              $( selector_view ).find('.view-calendar-shows').css('display','block');
            }
          }
        });
      }
    },
    checkNavCalendar: function(){
      Drupal.behaviors.tusOpeningDays.setClosedEmptyDay();
      $('.view-calendar-legend').parent().addClass('calendar_leyend_result_ajax');
      $('.view-calendar-shows').parent().addClass('calendar_shows_result_ajax');

      var start = new Date( $('.view-calendar-legend span.dateprev').data('firstdate') );
      var prev = new Date( $('.view-calendar-legend span.dateprev').data('date') );
      if ( prev < start ) {
        $('.view-calendar-legend span.dateprev').css('display','none');
      }else{
        $('.view-calendar-legend span.dateprev').css('display','block');
      }

      if( $('.view-calendar-legend #select-month option:selected').val() == $('.view-calendar-legend #select-month option:last').val() ){
        $('.view-calendar-legend span.datenext').css('display','none');
      }else{
        $('.view-calendar-legend span.datenext').css('display','block');
      }
    },
    getDateFromISO: function( date ) {
      var lang = $('html').attr('lang');
      var monthNames_en = [ "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December" ];
      var date = new Date( date );
      var day = date.getDate();
      var year = date.getFullYear();
      var month = Drupal.t( monthNames_en[date.getMonth()] );
      var date_return = day+' '+month+' '+year;
      return date_return.toUpperCase();;
    },
    getCalendar: function( currently_month, prev_month, next_month, from, id ){
      $('.view-calendar-legend .loading').css('display','block');
      //console.log('I want this month = '+currently_month)
      //console.log('Flecha prev_month = '+prev_month)
      //console.log('Flecha next_month = '+next_month)
      var loc = window.location.origin;
      if (!window.location.origin) { loc = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: ''); }
      var url = loc + '/' + Drupal.settings.pathPrefix + 'views/ajax/?date='+currently_month;
      var data = {
        view_name: 'calendar_legend',
        view_display_id: 'block_1',
        from: from,
        id: id
      }
      $.ajax({
        url: url,
        type: 'post',
        data: data,
        dataType: 'json',
        success: function (response) {
          if (response[1] !== undefined) {
            var viewHtml = response[1].data;
            //console.log(viewHtml);
            //set name of parent
            $('.calendar_leyend_result_ajax').html('');
            $('.calendar_leyend_result_ajax').html(viewHtml);
            $('#form-select-month select').val(currently_month);
            $('.view-calendar-legend span.dateprev').attr('data-date',prev_month);
            $('.view-calendar-legend span.datenext').attr('data-date',next_month);
            Drupal.attachBehaviors();
          }
        }
      });
    },
  }

  /*
   * Resize home slider
   */
  Drupal.behaviors.tusHome = {
    attach: function(context, settings) {
      //console.log(settings);
      $( window ).on('resize load',function() {
        Drupal.behaviors.tusHome.resizeSliderHome();
        Drupal.behaviors.tusHome.resizeBoxesSpotlight();
      });
    },
    resizeSliderHome:function(){
      Drupal.behaviors.tusHome.autoHeight(
        elemento_muestra = {
          selector : ".home-region--slider img",
        },
        elementos_a_igualar = {
          ".home-region--widget .pane-park-tickets-park-tickets-render-block" : "50",
          ".home-region--widget .pane-bundle-widget-banner.top" : "25",
          ".home-region--widget .pane-bundle-widget-banner.bottom" : "25",
        },
        no_ejecutar_en_pantallas_inferiores_a = parseInt(Drupal.settings.tus_settings.breakpoint.tablet),
        margen_de_corte = 15
      );
      Drupal.behaviors.tusHome.autoHeight(
        elemento_muestra = {
          selector : ".home-region--widget .pane-park-tickets-park-tickets-render-block",
        },
        elementos_a_igualar = {
          ".home-region--widget .pane-park-tickets-park-tickets-render-block #menu" : "15",
          ".home-region--widget .pane-park-tickets-park-tickets-render-block #entradas" : "85",
          //".home-region--widget .pane-park-tickets-park-tickets-render-block #entradas .grupos" : "20",
        },
        no_ejecutar_en_pantallas_inferiores_a = parseInt(Drupal.settings.tus_settings.breakpoint.tablet),
        margen_de_corte = 15
      );
    },
    autoHeight:function( elemento_muestra, elementos_a_igualar, no_ejecutar_en_pantallas_inferiores_a, margen_de_corte ){
      elemento_muestra.height = $(elemento_muestra.selector).height();
      if( $(window).width() >= parseInt(no_ejecutar_en_pantallas_inferiores_a)-margen_de_corte ){
        for ( key in elementos_a_igualar) {
          var porcent = elementos_a_igualar[key];
          var height_element = (elemento_muestra.height*porcent)/100
          $(key).height(height_element);
          $(key).addClass('autoHeight');
        }
      }else{
        for ( key in elementos_a_igualar) {
          $(key).css('height','auto');
        }
      }
    },
    resizeBoxesSpotlight: function(){
      if( $(window).width() > parseInt(Drupal.settings.tus_settings.breakpoint.tablet) ){
        var h = $('.l-home-region-spotlight-wrapper .home-region--promo1').height();
        $('.l-home-region-spotlight-wrapper .home-region--spotlight').height( h );
        $('.l-home-region-spotlight-wrapper .home-region--promo2').css({
          'padding-bottom':'0px',
          'padding-top':'0px'
        }).height( h );
      } else {
        $('.l-home-region-spotlight-wrapper .home-region--spotlight').css('height','auto');
        $('.l-home-region-spotlight-wrapper .home-region--promo2').css('height','auto');
      }
    },
    autoHeightSingleElement:function( elemento_muestra, elemento_a_igualar, no_ejecutar_en_pantallas_inferiores_a, margen_de_corte){
      // Ajusta texto del slider de la home con el banner del widget
      if( $(window).width() >= parseInt(no_ejecutar_en_pantallas_inferiores_a)-margen_de_corte ){
        var h = $(elemento_muestra).height();
        var padding = $(elemento_a_igualar).css('padding')
        $(elemento_a_igualar).css('padding','0px').height( h ).css('padding', padding );
      } else {
        $(elemento_a_igualar).css({
          'padding':padding,
          'height':'inherit'
        });
      }
    }
  };

  /**
  * Popover footer
  */
  Drupal.behaviors.tusParquesPopoverBehavior = {
    attach: function () {
      /**
       * Attach the Parques Reunidos popover to a parent button
       */
      if($.fn.popover) {
        $('.popover-button').popover({
          placement: 'top-left',
          trigger: 'manual',
          html: true,
          template: '<div class="parques-popover popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>',
          content: function () {
            if ($(this).attr('id') == 'parks-button') {
              return $('#pane-parks-popover').html();
            }
          },
        }).on("click", function(e) {
          e.preventDefault();
        }).on("mouseenter", function() {
          var _this = this;
          $(this).popover("show");
          $(this).siblings(".popover").on("mouseleave", function() {
            $(_this).popover('hide');
          });
        }).on("mouseleave", function() {
          var _this = this;
          setTimeout(function() {
            if (!$(".popover:hover").length) {
              $(_this).popover("hide")
            }
          }, 100);
        });
      }
    }
  };


  Drupal.behaviors.differentEvents = {
    attach: function (context, settings) {
      $( "body.node-type-eventos-para-particulares .pane-node-field-folleto-pdf, body.node-type-eventos-para-particulares .pane-node-field-slider-text" ).wrapAll( "<div class='panel-pane group-slider-different-events' />");
    }
  };


  Drupal.behaviors.languageDropdownSmallDevice = {
    attach: function (context, settings) {
      if( $('ul.language-switcher-locale-url').length ){
        if( !$('.l-region--mobile-toolbar .language_btn').length ){
          var flag = $( '.l-region--mobile-toolbar ul.language-switcher-locale-url .active img' ).clone();
          var langCode = $('.l-region--mobile-toolbar ul.language-switcher-locale-url .active' ).contents().filter(function(){
            return this.nodeType == 3;
          })[0].nodeValue;
          $('.l-region--mobile-toolbar .pane-locale-language .pane-content').append( '<div class="language_btn"></div>');
          $('.l-region--mobile-toolbar .pane-locale-language .pane-content .language_btn').append(flag).append(langCode);
        }
        $( '.l-region--mobile-toolbar .language_btn' ).on('click',function(){
          if ( $( '.l-region--mobile-toolbar ul.language-switcher-locale-url' ).hasClass( 'open' ) ) {
            $( '.l-region--mobile-toolbar ul.language-switcher-locale-url' ).slideUp( "slow" , function() {
              $(this).removeClass('open').addClass('close');
            });
          } else{
            $( '.l-region--mobile-toolbar ul.language-switcher-locale-url' ).slideDown( "slow" , function() {
              $(this).removeClass('close').addClass('open');
            });
          }
        });
      }
    }
  };

  /**
  / * Change src in images blog
   */
  Drupal.behaviors.tusSrcImgBlog = {
    attach: function (context, settings) {
      var domain = document.domain;
      var domainName = domain.split('.').slice(0,1).toString();
      if(domainName == 'dev'){
        var domainName = domain.split('.').slice(1,2).toString();
        $('.node-type-blog .simple-region-main-wrapper img, .section-blog .simple-region-main-wrapper img').each(function(){
          var str = $(this).attr('src');
          if (typeof str != 'undefined') {
            var res = str.replace(/^sites\/parquewarner.com\/files\//,'http://' + domain + '/sites/parquewarner.com/files/');
            $(this).attr('src', res)
          }
        });
      }
      $('.node-type-blog .simple-region-main-wrapper img, .section-blog .simple-region-main-wrapper img').each(function(){
        var str = $(this).attr('src');
        //console.log('str : ' + str);
        if (typeof str != 'undefined') {
          var res = str.replace(/^sites\/parquewarner.com\/files\//,'http://' + domain + '/sites/parquewarner.com/files/');
          $(this).attr('src', res)
        }
      });
    },
  };

  /**
  / * Cambia el título de los encabezados de la sección menús en la tabla de precios
   */
  Drupal.behaviors.changeTileMenuTable = {
    attach: function (context, settings) {
      // Español
      $('.page-node-7.i18n-es #quicktabs-tabpage-prices-1 .views-field-field-prices thead .field_price_online').text('Precio online desde');
      $('.page-node-7.i18n-es #quicktabs-tabpage-prices-1 .views-field-field-prices thead .field_price').text('Precio en parque');
      //Inglés
      $('.page-node-7.i18n-en #quicktabs-tabpage-prices-1 .views-field-field-prices thead .field_price_online').text('Online price from');
      $('.page-node-7.i18n-en #quicktabs-tabpage-prices-1 .views-field-field-prices thead .field_price').text('Price in park');
      //Portugues
      $('.page-node-7.i18n-pt-pt #quicktabs-tabpage-prices-1 .views-field-field-prices thead .field_price_online').text('Preço on-line a partir de');
      $('.page-node-7.i18n-pt-pt #quicktabs-tabpage-prices-1 .views-field-field-prices thead .field_price').text('Preço no parque');
    },
  };

  /**
  / * Cambia el tamaño del texto si el texto del slide ocupa más de dos lineas
   */
  Drupal.behaviors.changeFontSizeTextSlide = {
    attach: function (context, settings) {
      $(window).load(function(){
        if ($('#home-flexslider ul li .views-field-title-field a')){
          $('#home-flexslider ul li .views-field-title-field a').each(function() {
            var height = $(this).height();
            if(height >= 100){
              var fontSize = parseInt($(this).css('font-size'));
              fontSize = fontSize - 20 + "px";
              $(this).css('font-size', fontSize);
            }
          });
        }
      });
    },
  };

  /**
  / * Altura de tabs en página de producto
   */
  Drupal.behaviors.heightTabsProducto = {
    attach: function (context, settings) {
      $(window).load(function(){
        if ($('.node-type-pagina-de-producto #quicktabs-container-field_collection_quicktabs') && $('.node-type-pagina-de-producto .product-region--tabs')  ){
          var heightLis = [];
          var totalheightLis = '';
          $('.node-type-pagina-de-producto #quicktabs-field_collection_quicktabs ul.quicktabs-tabs li').each(function() {
            var heightLi = $(this).outerHeight();
            heightLis.push(heightLi);
            //console.log('heightLi: ' + heightLi);
            //console.log('heightLis: ' + heightLis);
            totalheightLis = heightLis.reduce(function(a,b){
              return a + b;
            });
            //console.log('totalheightLis: ' + totalheightLis);
          });
          var heightTab = $('.node-type-pagina-de-producto #quicktabs-field_collection_quicktabs #quicktabs-container-field_collection_quicktabs').height() + 20;
          //console.log('heightTab: ' + heightTab);
          if (totalheightLis >= heightTab){
            $('.node-type-pagina-de-producto #quicktabs-field_collection_quicktabs ul.quicktabs-tabs').height(totalheightLis);
            $('.node-type-pagina-de-producto .product-region--tabs').height(totalheightLis);
          }else{
            $('.node-type-pagina-de-producto #quicktabs-field_collection_quicktabs ul.quicktabs-tabs').height(heightTab);
            $('.node-type-pagina-de-producto .product-region--tabs').height(heightTab);
            //var heightUl = $('.node-type-pagina-de-producto #quicktabs-field_collection_quicktabs ul.quicktabs-tabs').height();
          }

          //console.log('heightUl: ' + heightUl);
          $('.node-type-pagina-de-producto #quicktabs-field_collection_quicktabs ul.quicktabs-tabs li', context).once().on('click', function(event) {
            var heightTab = $('.node-type-pagina-de-producto #quicktabs-field_collection_quicktabs #quicktabs-container-field_collection_quicktabs').height() + 20;
            //console.log('heightTab: ' + heightTab);
            //console.log('totalheightLis: ' + totalheightLis);
            if (totalheightLis >= heightTab){
              $('.node-type-pagina-de-producto #quicktabs-field_collection_quicktabs ul.quicktabs-tabs').height(totalheightLis);
              $('.node-type-pagina-de-producto .product-region--tabs').height(totalheightLis);
            }else{
              $('.node-type-pagina-de-producto #quicktabs-field_collection_quicktabs ul.quicktabs-tabs').height(heightTab);
              $('.node-type-pagina-de-producto .product-region--tabs').height(heightTab);
              //var heightUl = $('.node-type-pagina-de-producto #quicktabs-field_collection_quicktabs ul.quicktabs-tabs').height();
            }
          });
        }
      });
    },
  };

  /**
   *  Assign the accordion behavior to Advanced Page
   */
  Drupal.behaviors.advancedPage = {
    attach: function (context, settings) {
      // Groups
      $(".caption-group-list.on").nextUntil(".caption-group-list").removeClass('off').addClass('on')
      $(".caption-group-list.off").nextUntil(".caption-group-list").removeClass('on').addClass('off')
      $(".caption-group-list").find(".group-list:not(.on,.off)").removeClass('on').addClass('off')
      $(".caption-group-list").click(function () {
        $group   = $(this);
        $content = $group.nextUntil(".caption-group-list");
        if($group.hasClass('on')){
          $group.removeClass('on').addClass('off');
          $content.slideUp(200, function(){
            $(this).removeClass('on').addClass('off');
          });
        } else {
          $group.removeClass('off').addClass('on');
          $content.slideDown(200, function(){
            $(this).removeClass('off').addClass('on');
          });
        }
      });
      $(".group-list .group.on").nextUntil(".group").removeClass('off').addClass('on')
      $(".group-list .group.off").nextUntil(".group").removeClass('on').addClass('off')
      $(".group-list .group.on, .group-list .group.off").click(function () {
        $group   = $(this);
        $content = $group.nextUntil(".group");
        if($group.hasClass('on')){
          $group.removeClass('on').addClass('off');
          $content.slideUp(200, function(){
            $(this).removeClass('on').addClass('off');
          });
        } else {
          $group.removeClass('off').addClass('on');
          $content.slideDown(200, function(){
            $(this).removeClass('off').addClass('on');
          });
        }
      });
      var autoindexgroup = "<ul>"
      $('.caption-group-list').each(function(){
        var grouplist = $(this)
        var glttext = grouplist.text().replace(/(\r\n|\n|\r)/gm, "");
        grouplist.children().last().wrap("<a name='" + glttext.replace(/[^0-9a-zA-Z ]/g, "").replace(/(\s)/gm,"-").toLowerCase() + "'></a>" );
        autoindexgroup += "<li><span><a class='grouplink' href='#" + glttext.replace(/[^0-9a-zA-Z ]/g, "").replace(/(\s)/gm,"-").toLowerCase() + "'>" + glttext + "</a></span>"
        //autoindexgroup += "<ul>"
        //grouplist.nextUntil(".caption-group-list").find('.group').each(function(){
        //  var group = $(this)
        //  var gttext = group.text().replace(/(\r\n|\n|\r)/gm, "");
        //  group.children().last().wrap("<a name='" + gttext + "'></a>" );
        //  autoindexgroup += "<li><span><a class='grouplink' href='#" + gttext + "'>" + gttext + "</a></span></li>"
        //});
        //autoindexgroup += "</ul>"
        autoindexgroup += "</li>"
      });
      autoindexgroup += "</ul>"
      $('.autoindexgroup').append(autoindexgroup)
      $('.grouplink').click(function(){
        var tthref = $(this).attr('href').substr(1);
        $("[name='" + tthref + "']").parent().removeClass('off').addClass('on')
        if ($("[name='" + tthref + "']").parent().hasClass('caption-group-list')) {
          $("[name='" + tthref + "']").parent().nextUntil(".caption-group-list").slideDown(200, function(){
            $(this).removeClass('off').addClass('on');
          });
        }
        $("[name='" + tthref + "']").parents('.group').nextUntil(".group").slideDown(200, function(){
          $(this).removeClass('off').addClass('on');
        });
        $("[name='" + tthref + "']").parents('.group-list').removeClass('off').addClass('on')
        $("[name='" + tthref + "']").parents('.group-list').prev().removeClass('off').addClass('on')
      })
    }
  };

})(jQuery);
