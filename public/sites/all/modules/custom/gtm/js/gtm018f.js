/**
 * Etiquetado según dasboard
 *
 */

Drupal.behaviors.dashboard = {
    attach: function(context, settings) {
        var development = true;
        // show more social links
        var go4tagging = function(name, url) {
            var goChannel = "IrCanal";
            dataLayer.push({
                "networksocial": name,
                "actionsocial": goChannel,
                "targetsocial": url,
                "event": "socialbutton"
            });
            if (development) console.log("go4tagging → " + name + ", " + goChannel + ", → " + url);
        };

        //events
        var go4event = function(category, action, label) {
            dataLayer.push({
                'category': category,
                'action': action,
                'label': label,
                'event': 'eventga'
            });
            if (development) console.info("go4event → " + category + ", " + action + ", " + label);
        }

        // Parse URLs
        var parseURL = function(url) {
            parsed_url = {}

            if ( url == null || url.length == 0 )
                return parsed_url;

            protocol_i = url.indexOf('://');
            parsed_url.protocol = url.substr(0,protocol_i);

            remaining_url = url.substr(protocol_i + 3, url.length);
            domain_i = remaining_url.indexOf('/');
            domain_i = domain_i == -1 ? remaining_url.length - 1 : domain_i;
            parsed_url.domain = remaining_url.substr(0, domain_i);
            parsed_url.path = domain_i == -1 || domain_i + 1 == remaining_url.length ? null : remaining_url.substr(domain_i + 1, remaining_url.length);

            domain_parts = parsed_url.domain.split('.');
            switch ( domain_parts.length ){
                case 2:
                  parsed_url.subdomain = null;
                  parsed_url.host = domain_parts[0];
                  parsed_url.tld = domain_parts[1];
                  break;
                case 3:
                  parsed_url.subdomain = domain_parts[0];
                  parsed_url.host = domain_parts[1];
                  parsed_url.tld = domain_parts[2];
                  break;
                case 4:
                  parsed_url.subdomain = domain_parts[0];
                  parsed_url.host = domain_parts[1];
                  parsed_url.tld = domain_parts[2] + '.' + domain_parts[3];
                  break;
            }

            parsed_url.parent_domain = parsed_url.host + '.' + parsed_url.tld;

            return parsed_url;
        }

        //4.1 Etiqutado Social Media

        // ----iconos sociales
        jQuery('.social-media-icons a > .icon, p.social-media a > .icon').click(function() {
                var url = jQuery(this).parent().attr('href');
                var host = parseURL(url).host;
                var socialMedia = host.charAt(0).toUpperCase() + host.slice(1);
            go4tagging(socialMedia, url);
        });

        // ----iconos sociales en el menú lateral izquierdo (responsive)
        jQuery('body').on('click','.sidr-class-social-media-icons a > .icon',function () {
            var url = jQuery(this).parent().attr('href');
                var host = parseURL(url).host;
                var socialMedia = host.charAt(0).toUpperCase() + host.slice(1);
            go4tagging(socialMedia, url);
        });

        //5.1. Etiqutado de Acciones
        //5.3. home
        //5.3.1. compra de entradas
        //menú principal, dashboard puntos: 1,4
        // jQuery('.l-main-menu li[id|=menu]>a').click(function() {
        //     go4event("Conversion", "Comprar", "Menu");
        // });
        jQuery('.l-main-menu li#menu-buy-tickets>a').click(function() {
            go4event("Conversion", "Comprar", "Menu");
        });

        jQuery('.l-main-menu li#menu-ticket-hotel>a').click(function() {
            go4event("Interaccion", "Entradas+Hotel", "MenuSuperior");
        });

        // ----- Misma opción en el menú lateral izquierdo (responsive)
        jQuery('body').on('click','#sidr-id-menu-buy-tickets > a',function () {
            go4event("Conversion", "Comprar", "Menu");
        });

        jQuery('body').on('click','#sidr-id-menu-ticket-hotel > a',function () {
            go4event("Interaccion", "Entradas+Hotel", "MenuSuperior");
        });


        //widget de compra, dasboard puntos: 2,5
        jQuery('.home-region .enlace_compra_entradas').click(function() {
            go4event("Conversion", "Comprar", "ModuloComprar");
        });

        //slider, dashboard punto: 3 ( en el doc. de implementación, en 5.3. home III)
        //jQuery('.home-region #home-flexslider .views-field-field-link a').click(function() {
        //    go4event("Conversion", "Comprar", "SliderPrincipal");
        //});

        //5.3.2 compra de entradas + HOTEL
        //menú toolbars en TUS no hay toolbar
        // jQuery('.l-region--toolbar > .pane-menu-menu-toolbar > .pane-content > ul.menu > li.last a').click(function() {
        //     go4event("Interaccion", "Entradas+Hotel", "MenuSuperior");
        // });

        //----Lo mismo, para el menu responsive izquierdo:
        // jQuery('body').on('click','#sidr-0 > div > div.sidr-class-l-region.sidr-class-l-region--mobile-menu > div.sidr-class-panel-pane.sidr-class-pane-block.sidr-class-pane-menu-menu-toolbar > div > ul > li.sidr-class-last.sidr-class-leaf > a',function () {
        //     go4event("Interaccion", "Entradas+Hotel", "MenuSuperior");
        // });

        //widget de compra, dasboard puntos: 1,2,3
        jQuery('.home-region > .panel-pane > .pane-content > #park_tickets_module > #widget > ul#menu > li.btn1 a').click(function() {
            go4event("Interaccion", "Entradas+Hotel", "ModuloComprar");
        });

        jQuery('.home-region .top.pane-bundle-widget-banner').click(function() {
            go4event("Conversion", "ComprarPase", "BannerComprar");
        });
        //Faltaría punto 4 que no hay manera de distinguir si es compra o ENTRADA + HOTEL

        //5.3.3 Otro TIPO DE ENTRADAS
        //widget de compra, dasboard puntos: 1,2
        jQuery('.home-region .activa_grupos_extra').click(function() {
            go4event("Interaccion", "MostrarOtrasEntradas", "ModuloComprar");
        });

        //5.3.3 COMPRAR EXTRA
        //widget de compra, dasboard puntos: 1,2
        jQuery('.home-region .bottom.pane-bundle-widget-banner').click(function() {
            go4event("Conversion", "ComprarExtra", "BannerComprar");
        });

        //5.4 Sidebar
        //widget de compra lateral
        //ENTRADAS + HOTEL dashboard punto 3
        jQuery('.leftbar-region--third > .pane-park-tickets-park-tickets-render-block > .pane-content > #park_tickets_module > #widget > ul#menu > li.btn1 > a, .rightbar-region > .pane-park-tickets-park-tickets-render-block > .pane-content > #park_tickets_module > #widget > ul#menu > li.btn1 > a, .simple-region--third > .pane-park-tickets-park-tickets-render-block > .pane-content > #park_tickets_module > #widget > ul#menu > li.btn1 > a').click(function() {
            go4event("Interaccion", "Entradas+Hotel", "CTASidebar");
        });
        //OTROS TIPOS DE ENTRADAS dashboard punto 2
        jQuery('.leftbar-region--third > .pane-park-tickets-park-tickets-render-block > .pane-content > #park_tickets_module > #widget #entradas .grupos .activa_grupos_extra, .rightbar-region > .pane-park-tickets-park-tickets-render-block > .pane-content > #park_tickets_module > #widget #entradas .grupos .activa_grupos_extra, .simple-region--third > .pane-park-tickets-park-tickets-render-block > .pane-content > #park_tickets_module > #widget #entradas .grupos .activa_grupos_extra').click(function() {
            go4event("Interaccion", "MostrarOtrasEntradas", "CTASidebar");
        });
        //COMPRA dashboard punto 1
        jQuery('.leftbar-region--third > .pane-park-tickets-park-tickets-render-block .enlace_compra_entradas, .rightbar-region > .pane-park-tickets-park-tickets-render-block .enlace_compra_entradas, .simple-region--third > .pane-park-tickets-park-tickets-render-block .enlace_compra_entradas').click(function() {
            go4event("Conversion", "Comprar", "CTASidebar");
        });

        //5.6. Planea tu visita
        //horarios dashboard punto 1
        jQuery('.data-day-of-month').click(function() {
            var date_old = jQuery('#select-month').val()  + "-" + jQuery(this).text();
            var label = date_old.split("-");
            label[0] = label[0].substr(2,3);
            var label = label.reverse().join("/");
            go4event("Interaccion", "Horario", label) ;
        });

        //5.7. Planea tu visita
        //Precios dashboard punto 1
        jQuery('#quicktabs-prices ul li a, #quicktabs-prices #quicktabs-container-prices .views-field-title-field h3').click(function() {
            var label = jQuery(this).html();
            go4event("Interaccion", "Tabs_Precios", label);
        });

        //5.7. Planea tu visita
        //mapa
        //Atracciones dashboard punto 1
        jQuery('#map-filters #item-attraction').click(function() {
            var label = jQuery(this).find("span").text();
            go4event("FiltrosEnElParque", "PorTipo", label);
        });
        //Restaurantes dashboard punto 2
        jQuery('#map-filters #item-restaurant').click(function() {
            var label = jQuery(this).find("span").text();
            go4event("FiltrosEnElParque", "PorTipo", label);
        });
        //Servicios dashboard punto 3
        jQuery('#map-filters #item-service').click(function() {
            var label = jQuery(this).find("span").text();
            go4event("FiltrosEnElParque", "PorTipo", label);
        });
        //Tiendas dashboard punto 4
        jQuery('#map-filters #item-shop').click(function() {
            var label = jQuery(this).find("span").text();
            go4event("FiltrosEnElParque", "PorTipo", label);
        });
        //Espectaculos dashboard punto 5
        jQuery('#map-filters #item-entertainment').click(function() {
            var label = jQuery(this).find("span").text();
            go4event("FiltrosEnElParque", "PorTipo", label);
        });
    }
};
