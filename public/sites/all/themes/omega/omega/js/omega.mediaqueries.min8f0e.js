!function(a,b,c){"use strict";c.behaviors.omegaMediaQueryClasses={handler:function(b,c){c.matches?a("body").removeClass(b+"-inactive").addClass(b+"-active"):a("body").removeClass(b+"-active").addClass(b+"-inactive")},attach:function(c,d){var e=this,f=d.omega||{},g=f.mediaQueries||{};a("body",c).once("omega-mediaqueries",function(){a.each(g,function(a,c){var d=b.matchMedia(c);e.handler(a,d),d.addListener(function(b){e.handler(a,b)})})})}}}(jQuery,window,Drupal);