(function ($) {

  // Behavior to stop FlexSlider when a Youtube video is running
  Drupal.behaviors.mediaYoutubeFlexslider = {
    attach: function(context, settings){
      if( $('.flexslider').length && (settings.hasOwnProperty('flexslider')) ) {
        var slider, // Global slider value to force playing and pausing by direct access of the slider control
        change_item_slide = true; // Global switch to monitor video state
        //Modify src attribute iframe
        Drupal.behaviors.mediaYoutubeFlexslider.setIFrameSrc();
        //Load Youtube API
        Drupal.behaviors.mediaYoutubeFlexslider.loadYoutubeAPI();
        window.onYouTubeIframeAPIReady = function () {
          // Iterate through all videos
          $('.flexslider iframe').each(function(){
            // Create a new player pointer; "this" is a DOMElement of the player's iframe
            var player = new YT.Player(this, {
              playerVars: {
                autoplay: 0
              }
            });
            // Watch for changes on the player
            player.addEventListener("onStateChange", function(state){
              switch(state.data){
                // If the user is playing a video, stop the slider
                case YT.PlayerState.PLAYING:
                  slider.flexslider("stop");
                  change_item_slide = false;
                  break;
                // The video is no longer player, give the go-ahead to start the slider back up
                case YT.PlayerState.ENDED:
                case YT.PlayerState.PAUSED:
                  slider.flexslider("play");
                  change_item_slide = true;
                  break;
              }
            });
            $(this).data('player', player);
          });
        };
        // Setup the slider control
        slider = $(".flexslider").flexslider({
          // Before you go to change slides, make sure you can!
          before: function(){           
            if(!change_item_slide){
              slider.flexslider("stop");
            }  
          }
        });
        slider.on("click", ".flex-prev, .flex-next, .flex-control-nav", function(){
          change_item_slide = true;
          $('.flexslider iframe').each(function(){
            $(this).data('player').pauseVideo();
          });
        });
      }
    },
    loadYoutubeAPI:function(){
      var tag = document.createElement('script');
      tag.src = "//www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    },
    setIFrameSrc:function( slider ){
      var frameId = $('.flexslider iframe').attr('id');
      var src = $('#'+frameId).attr('src');
      $('#'+frameId).attr('src', src+'&enablejsapi=1');
    }
  };
  
})(jQuery);
