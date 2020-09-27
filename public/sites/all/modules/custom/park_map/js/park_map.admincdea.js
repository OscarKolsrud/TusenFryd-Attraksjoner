(function ($) {
  Drupal.behaviors.ParkMapPageAdmin = {

    attach:function (context, settings) {
      $(".page-admin-config-system-park-configuration").checkboxmax({
         "max": 10,
         "group": ".form-checkboxes",
         "exclude": "form-item-park-map-bundle"
      });


      $('#edit-park-map-image-height, #edit-park-map-image-weight, #edit-park-map-tamlienzow,  #edit-park-map-tamlienzoh').click(function(){
        var medida = $('#edit-park-map-image-height').val()*$('#edit-park-map-tamlienzow').val()/$('#edit-park-map-image-weight').val();
        $('#edit-park-map-tamlienzoh').val( Math.round(medida * 100) / 100 );
      });


      $('#edit-park-map-image-height, #edit-park-map-image-weight, #edit-park-map-tamlienzow,  #edit-park-map-tamlienzoh').change(function(){
        var medida = $('#edit-park-map-image-height').val()*$('#edit-park-map-tamlienzow').val()/$('#edit-park-map-image-weight').val();
        $('#edit-park-map-tamlienzoh').val( Math.round(medida * 100) / 100 );
      });

    }
  }
})(jQuery);