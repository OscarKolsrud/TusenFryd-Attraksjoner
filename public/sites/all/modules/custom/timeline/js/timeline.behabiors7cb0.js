/**
 * @file
 * Initiate Owl Carousel.
 */

(function($) {
  Drupal.behaviors.timeline = {
    attach:function (context, settings) {
	    $(document).ready(function() {
	    	if( settings.timeline ){
		 			if( Drupal.settings.timeline.debug == '1'){ console.info(settings); }

		 	    // Settings Nav
		    	var nav_mobile_items = (Drupal.settings.timeline.nav_mobile_items) ? Drupal.settings.timeline.nav_mobile_items : 2;
		    	var nav_tab_items = (Drupal.settings.timeline.nav_tab_items) ? Drupal.settings.timeline.nav_tab_items : 5;
		    	var nav_desk_items = (Drupal.settings.timeline.nav_desk_items) ? Drupal.settings.timeline.nav_desk_items : 5;

					// Settings Slider Items
		 	    var slider_mobile_items = (Drupal.settings.timeline.slider_mobile_items) ? Drupal.settings.timeline.slider_mobile_items : 1;
		    	var slider_tab_items = (Drupal.settings.timeline.slider_tab_items) ? Drupal.settings.timeline.slider_tab_items : 2;
		    	var slider_desk_items = (Drupal.settings.timeline.slider_desk_items) ? Drupal.settings.timeline.slider_desk_items : 3;
		 
		 			//breakpoints
		    	var tab_breakpoint = (Drupal.settings.timeline.tab_breakpoint) ? Drupal.settings.timeline.tab_breakpoint : 750;
		    	var desk_breakpoint = (Drupal.settings.timeline.desk_breakpoint) ? Drupal.settings.timeline.desk_breakpoint : 1000;



				  var timeline = $("#timeline");
				  var timeline_nav = $("#timeline_nav");
				 
				  // Inicio sliders - Navegación e Items
				  timeline.owlCarousel({
				  	margin: 80,
				  	//autoHeight : true,
				  	navigation : true,
				  	navigationText : ["",""],
				    pagination : false,
						itemsCustom : [
				      [0, parseInt(slider_mobile_items)],
				      [parseInt(tab_breakpoint), parseInt(slider_tab_items)],
				      [parseInt(desk_breakpoint), parseInt(slider_desk_items)]
				     ],
			      theme : 'timeline_theme',
			      slideSpeed : parseInt(Drupal.settings.timeline.speed),
				    paginationSpeed : parseInt(Drupal.settings.timeline.speed),
				    rewindSpeed : parseInt(Drupal.settings.timeline.speed),
				    addClassActive : true,
				    afterMove: Drupal.behaviors.timeline.checkActives,
				  });
				  timeline_nav.owlCarousel({
				  	center : true,
				  	navigation : true,
				  	navigationText : ["",""],
			      pagination : false,
						itemsCustom : [
				      [0, parseInt(nav_mobile_items)],
				      [parseInt(tab_breakpoint), parseInt(nav_tab_items)],
				      [parseInt(desk_breakpoint), parseInt(nav_desk_items)]
				    ],
			      theme : 'timeline_nav_theme',
			      slideSpeed : parseInt(Drupal.settings.timeline.speed),
				    paginationSpeed : parseInt(Drupal.settings.timeline.speed),
				    rewindSpeed : parseInt(Drupal.settings.timeline.speed),
				    addClassActive : true,
				    afterInit : function(el){
				      el.find(".owl-item div.item").eq(0).addClass("active");
				    }
				  });

				  timeline_nav.on("click", ".owl-item div.item",function(e){
				  	e.preventDefault();
				  	$("#timeline_nav .owl-item div.item").each(function(index){ $(this).removeClass('active')} );
				  	$(this).addClass('activo active');
				  	//console.log('Decada solicitada = '+$(this).data("decade"));
				  	var pos = Drupal.behaviors.timeline.get_index_inicio_decada( $(this).data("decade") );
				  	//console.log('Posición = '+pos);
				  	timeline.trigger("owl.goTo", pos );
				  });
				  timeline.on("click", ".owl-next, .owl-prev",function(e){
						var pos_nav = [];
						$("#timeline .owl-item.active div.item").each(function(index){
							pos_nav.push( Drupal.behaviors.timeline.get_index_inicio_decada_navegation( $(this).attr('data-decade') ) );
						});
						timeline_nav.trigger("owl.goTo", pos_nav[0] );
				  });
			  }
			});
    },
    get_index_inicio_decada_navegation:function(id_decada){
    	var pos = [];
			$("#timeline_nav .owl-item div.item").each(function(index){
			 	if( $(this).data("decade") == id_decada ){ pos.push(index); }
			});
			return pos[0];
    },
    get_index_inicio_decada:function(id_decada){
    	var pos = [];
			$("#timeline .owl-item div.item").each(function(index){
			 	if( $(this).data("decade") == id_decada ){ pos.push(index); }
			});
			return pos[0];
    },
    checkActives:function(){
      var actives = [];
    	$("#timeline .owl-item.active div.item").each(function(index){
			 	actives.push( $(this).attr('data-decade') )
			});
    	$("#timeline_nav .owl-item div.item").each(function(index){
    		$(this).removeClass('active');
    		for (i in actives){
    			if( $(this).data("decade") == actives[i] ){ $(this).addClass("active") }
    		}
			});
    }
  }
})(jQuery);