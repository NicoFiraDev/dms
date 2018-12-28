$(document).ready(function(){
// Submit form
$('#contact-form').submit(function(e){
    e.preventDefault();
    $.ajax({
        url:'/home',
        type:'post',
        data:$('#contact-form').serialize(),
        success:function(){
          $('#contact-form input[type=text]').val('');
          $('#contact-form input[type=email]').val('');
          $('#contact-form textarea').val('');
          alert('Mensaje recibido, nos pondremos en contacto pronto!');
        }
    });
});

// Scroll on buttons
  $('.js--scroll-to-contact').click(function(){
    $('html, body').animate({scrollTop: $('.js--section-contact').offset().top}, 1000);
  });

// Smooth Scrolling
// Select all links with hashes
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
          scrollTop: target.offset().top - $('header').outerHeight(true)
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


});
