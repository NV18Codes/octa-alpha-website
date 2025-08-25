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
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });
    
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
                items:2,
                margin: 20
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
    $(document).ready(function() {
        // Close mobile menu when clicking on a link
        $('.navbar-nav .nav-link').on('click', function() {
            if ($(window).width() < 992) {
                $('.navbar-collapse').collapse('hide');
            }
        });
        
        // Handle window resize events
        $(window).on('resize', function() {
            // Reset any mobile-specific styles
            if ($(window).width() >= 992) {
                $('.navbar-collapse').removeClass('show');
            }
        });
        
        // Improve touch targets on mobile
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            $('.btn, .nav-link').addClass('touch-device');
        }
        
        // Smooth scrolling for anchor links
        $('a[href^="#"]').on('click', function(event) {
            var target = $(this.getAttribute('href'));
            if (target.length) {
                event.preventDefault();
                $('html, body').stop().animate({
                    scrollTop: target.offset().top - 80
                }, 1000);
            }
        });
        
        // Optimize video backgrounds for mobile
        function optimizeVideos() {
            if ($(window).width() <= 768) {
                $('video').each(function() {
                    $(this).attr('playsinline', '');
                    $(this).attr('muted', '');
                    $(this).attr('loop', '');
                });
            }
        }
        
        optimizeVideos();
        $(window).on('resize', optimizeVideos);
        
        // Lazy loading for images
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
        
        // Performance optimization for mobile
        if ($(window).width() <= 768) {
            // Reduce animation complexity on mobile
            $('.wow').removeClass('wow');
            $('[data-wow-delay]').removeAttr('data-wow-delay');
            
            // Optimize carousel performance
            $('.owl-carousel').each(function() {
                if ($(this).hasClass('vendor-carousel')) {
                    $(this).trigger('refresh.owl.carousel');
                }
            });
        }
        
        // Handle orientation change
        $(window).on('orientationchange', function() {
            setTimeout(function() {
                // Refresh carousels after orientation change
                $('.owl-carousel').trigger('refresh.owl.carousel');
                
                // Adjust video heights
                $('.carousel-item video, .carousel-item img').css('height', '100vh');
            }, 100);
        });
        
        // Accessibility improvements
        $('.navbar-toggler').on('click', function() {
            var isExpanded = $(this).attr('aria-expanded') === 'true';
            $(this).attr('aria-expanded', !isExpanded);
        });
        
        // Keyboard navigation support
        $(document).on('keydown', function(e) {
            if (e.key === 'Escape') {
                $('.navbar-collapse').collapse('hide');
            }
        });
        
        // Touch gesture support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        $(document).on('touchstart', function(e) {
            touchStartX = e.originalEvent.touches[0].clientX;
        });
        
        $(document).on('touchend', function(e) {
            touchEndX = e.originalEvent.changedTouches[0].clientX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next carousel item
                    $('.carousel').carousel('next');
                } else {
                    // Swipe right - previous carousel item
                    $('.carousel').carousel('prev');
                }
            }
        }
    });
    
})(jQuery);

