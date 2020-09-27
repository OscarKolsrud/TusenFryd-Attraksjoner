(function ($) {
  /*
  * Resource: 
  *   http://dev.vast.com/jquery-popup-overlay/
  *   http://orga.cat/posts/jquerycookie-drupal-7
  *
  */
  Drupal.behaviors.popUpHome = {
    attach: function (context, settings) {
      if ( typeof Drupal.settings.popup_home.enabled !== 'undefined' && Drupal.settings.popup_home.enabled ){
        $('#popup_home').popup({
          blur : false,
          onopen: function() {
            if ( typeof Drupal.settings.popup_home.active_with_cookie != 'undefined' && Drupal.settings.popup_home.active_with_cookie ){
              $.cookie('popUp_home', 1);
            }
          }
        });
        if ( typeof Drupal.settings.popup_home.active_with_cookie != 'undefined' && Drupal.settings.popup_home.active_with_cookie ){
          if( ! $.cookie("popUp_home") ){
            $('#popup_home').popup('show');
          }
        } else {
          $('#popup_home').popup('show');
        }
      }
    }
  };
})(jQuery);
