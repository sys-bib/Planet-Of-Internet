// Select all links with hashes
$(document).ready(function(){
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
        &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000, function() {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) { // Checking if the target was focused
              return false;
            } else {
              $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            };
          });
        }
      }
    });


    $(window).scroll(function() {
      var height = $(window).scrollTop();
      if (height > 40) {
        $(".menu").css({"background-color":"rgba(0,0,0,0.5)", "position":"fixed"});
      } else {
        $(".menu").css({"background-color":"transparent", "position":"static"});
      }
      if(height < 460) {
        $("#news_li").attr("class", "");
        $("#contact_us_li").attr("class", "");
        $("#about_us_li").attr("class", "");
        $("#home_li").attr("class", "active");
      }
      else if(height >= 460 && height < 1390) {
        $("#home_li").attr("class", "");
        $("#contact_us_li").attr("class", "");
        $("#about_us_li").attr("class", "");
        $("#news_li").attr("class", "active");
      }
      else if(height >= 1390 && height < 2060) {
        $("#home_li").attr("class", "");
        $("#contact_us_li").attr("class", "active");
        $("#about_us_li").attr("class", "");
        $("#news_li").attr("class", "");
      }
      else if(height >= 2060) {
        $("#home_li").attr("class", "");
        $("#contact_us_li").attr("class", "");
        $("#about_us_li").attr("class", "active");
        $("#news_li").attr("class", "");
      }
    });
});
