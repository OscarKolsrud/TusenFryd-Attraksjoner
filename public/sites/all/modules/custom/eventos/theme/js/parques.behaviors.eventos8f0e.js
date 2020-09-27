(function ($) {

  Drupal.behaviors.eventos = {

    attach: function (context, settings) {
      $('.field--name-field-tipo-de-ficha').hide();
      Drupal.behaviors.eventos.changeLinkPDFtoImage(context, settings);
    },
    changeLinkPDFtoImage: function (context, settings) {
      $('.field--name-field-invitacion img').click(function() {
        window.location = $('.field--name-field-invitacion-pdf').find("a").attr("href");
        return false;
      });
      $('.field--name-field-invitacion img').css({'cursor': 'pointer'});
      $('.field--name-field-invitacion-pdf').hide();
    },
  };
})(jQuery);
