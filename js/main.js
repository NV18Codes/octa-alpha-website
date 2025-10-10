(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
   /*  $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    }); */
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });

    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel - single card display with navigation
    var testimonialCarousel = $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        center: true,
        margin: 30,
        items: 1,
        nav: false,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:1
            },
            992:{
                items:1
            }
        }
    });
    
    // Custom navigation buttons for testimonials
    $('.testimonial-prev').click(function() {
        testimonialCarousel.trigger('prev.owl.carousel');
    });
    
    $('.testimonial-next').click(function() {
        testimonialCarousel.trigger('next.owl.carousel');
    });

    // Vendor carousel
    $('.vendor-carousel').owlCarousel({
        loop: true,
        margin: 30,
        dots: false,
        nav: false,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        smartSpeed: 1000,
        responsive: {
            0:{
                items:1,
                margin: 10
            },
            576:{
                items:3,
                margin: 25
            },
            768:{
                items:4,
                margin: 30
            },
            992:{
                items:5,
                margin: 35
            },
            1200:{
                items:6,
                margin: 40
            }
        }
    });
    
    // Responsive navigation improvements
   $(document).ready(function () {

    // Handle mobile nav link behavior
    $('.navbar-nav .nav-link').on('click', function () {
        if ($(window).width() < 992) {
            $('.navbar-collapse').collapse('hide');
        }
    });

    // Fix dropdowns on mobile (first level)
    $('.navbar .dropdown-toggle').off('click').on('click', function (e) {
        if ($(window).width() < 992) {
            e.preventDefault();
            e.stopPropagation();

            const $dropdown = $(this).next('.dropdown-menu');
            const $parent = $(this).closest('.dropdown');

            // Close other open dropdowns
            $parent.siblings('.dropdown').find('.dropdown-menu.show').removeClass('show');

            // Toggle this dropdown
            $dropdown.toggleClass('show');
        }
    });

    // ✅ Handle nested dropdowns (like Cybersecurity)
    $('.dropdown-submenu > .dropdown-toggle').off('click').on('click', function (e) {
        if ($(window).width() < 992) {
            e.preventDefault();
            e.stopPropagation();

            const $submenu = $(this).next('.dropdown-menu');
            const $siblings = $(this).parent().siblings('.dropdown-submenu');

            // Close other submenus
            $siblings.find('.dropdown-menu.show').removeClass('show');

            // Toggle this submenu
            $submenu.toggleClass('show');
        }
    });

    // Cybersecurity open on double click//
        /*  document.addEventListener("DOMContentLoaded", function () {
    const link = document.getElementById("cybersecurityDropdown");
    if (!link) return;

    // Detect if device is mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      let lastTap = 0;

      link.addEventListener("touchend", function (e) {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;

        if (tapLength < 500 && tapLength > 0) {
          // Second tap (within 500ms) → navigate
          e.preventDefault();
          window.location.href = "cybersecurity.html";
        } else {
          // First tap → open dropdown (default Bootstrap behavior)
          lastTap = currentTime;
        }
      });
    } else {
      // Desktop: click once to navigate
      link.addEventListener("click", function (e) {
        window.location.href = "cybersecurity.html";
      });
    }
  });
 */


    // Close all dropdowns when clicking outside (mobile)
    $(document).on('click', function (e) {
        if ($(window).width() < 992 && !$(e.target).closest('.navbar').length) {
            $('.dropdown-menu.show').removeClass('show');
        }
    });

    // Handle window resize (reset on desktop)
    $(window).on('resize', function () {
        if ($(window).width() >= 992) {
            $('.dropdown-menu.show').removeClass('show');
            $('.navbar-collapse').removeClass('show');
        }
    });

    // Other existing code
    $('a[href^="#"]').on('click', function (event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 1000);
        }
    });

    function optimizeVideos() {
        if ($(window).width() <= 768) {
            $('video').each(function () {
                $(this).attr('playsinline', '');
                $(this).attr('muted', '');
                $(this).attr('loop', '');
            });
        }
    }

    optimizeVideos();
    $(window).on('resize', optimizeVideos);

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    if ($(window).width() <= 768) {
        $('.wow').removeClass('wow');
        $('[data-wow-delay]').removeAttr('data-wow-delay');
        $('.owl-carousel').each(function () {
            if ($(this).hasClass('vendor-carousel')) {
                $(this).trigger('refresh.owl.carousel');
            }
        });
    }

    $(window).on('orientationchange', function () {
        setTimeout(function () {
            $('.owl-carousel').trigger('refresh.owl.carousel');
            $('.carousel-item video, .carousel-item img').css('height', '100vh');
        }, 100);
    });

    $('.navbar-toggler').on('click', function () {
        var isExpanded = $(this).attr('aria-expanded') === 'true';
        $(this).attr('aria-expanded', !isExpanded);
    });

    $(document).on('keydown', function (e) {
        if (e.key === 'Escape') {
            $('.navbar-collapse').collapse('hide');
        }
    });

    // Swipe gestures for carousel
    let touchStartX = 0;
    let touchEndX = 0;

    $(document).on('touchstart', function (e) {
        touchStartX = e.originalEvent.touches[0].clientX;
    });

    $(document).on('touchend', function (e) {
        touchEndX = e.originalEvent.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) $('.carousel').carousel('next');
            else $('.carousel').carousel('prev');
        }
    }
});


    
})(jQuery);

