(function ($) {

  Drupal.behaviors.paginaDeProducto = {

    attach: function (context, settings) {
      Drupal.behaviors.paginaDeProducto.responsFieldCollectionQuicktabs(context, settings);
      Drupal.behaviors.paginaDeProducto.changeLinkToSpan(context, settings);
      var domain = document.domain;
      if(domain.indexOf('parquewarner') > -1 ||
         domain.indexOf('bobbejaanland') > -1 ||
         domain.indexOf('movieparkgermany') > -1 ||
         domain.indexOf('mirabilandia') > -1 ||
         domain.indexOf('tusenfryd') > -1 ||
         domain.indexOf('bonbonland') > -1 ||
         domain.indexOf('esferize') > -1 ||
         domain.indexOf('marineland') > -1) {
        Drupal.behaviors.paginaDeProducto.groupTextAndLink(context, settings);
      }
    },
    responsFieldCollectionQuicktabs: function (context, settings) {
      $('#quicktabs-field_collection_quicktabs').easyResponsiveTabs({
        type: 'vertical',
        width: 'auto',
        fit: true,
        tabidentify: 'ver_1', // The tab groups identifier
        activetab_bg: '#0591CE', // background color for active tabs in this group
        inactive_bg: '#E4E4E4', // background color for inactive tabs in this group
        active_border_color: '#fff', // border color for active tabs heads in this group
        active_content_border_color: '#fff' // border color for active tabs contect in this group so that it matches the tab head border
      });
    },
    changeLinkToSpan: function (context, settings) {
      $('#quicktabs-field_collection_quicktabs > ul > li > a').each(function( index ) {
        var texto = $( this ).text();
        $( this ).replaceWith( '<span>' + texto + '</span>' )
      });
      $('#quicktabs-field_collection_quicktabs #quicktabs-container-field_collection_quicktabs h2.resp-accordion a').each(function( index ) {
        var texto = $( this ).text();
        $( this ).replaceWith( '<span>' + texto + '</span>' )
      });
    },
    groupTextAndLink: function (context, settings) {
      $('.product-region--product .panel-pane:not(.pane-node-field-imagen-footer-producto):not(.pass_saisonnier_content)',context).once().wrapAll('<div class="group-text-and-link" />');
    },
  };
})(jQuery);
