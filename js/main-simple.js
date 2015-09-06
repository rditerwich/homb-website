(function($) {
    "use strict";
    /* =================================
       LOADER                     
    =================================== */
    //makes sure the whole site is loaded
    $(window).load(function() {
            // will first fade out the loading animation
            $(".status")
                .fadeOut();
            // will fade out the whole DIV that covers the website.
            $(".preloader")
                .delay(1000)
                .fadeOut("slow");
        });

    $(document).ready(function() {

            /* =================================
                    WOW ANIMATION             
              =================================== */
            var wow = new WOW({
                mobile: false
            });
            wow.init();
            /* =================================
                   Navigation OnePage             
             =================================== */
            $("#navigation-bar").sticky({
                    topSpacing: 0
                });
            $(".top-navigation-inner").onePageNav({
                    currentClass: 'current',
                    scrollOffset: 60
                });
            $('.btn-scroll').localScroll();
            /* =================================
                   Hero/ Main Header             
             =================================== */
             expandHeight();
            $(window).bind('resize', expandHeight);

            function expandHeight() {
                var windowHeight = $(window).height();
                $('.hero').height(windowHeight);
            }
        });

    /* =================================
           Message Rotator             
     =================================== */
    var current = 1; //keeps track of the current div
    var height = $('.roles')
        .height(); //the height of the roles div
    var numberDivs = $('.roles').children()
        .length; //the number of children of the roles div
    var first = $('.roles div:nth-child(1)'); //the first div nested in roles div
    setInterval(function() {
        var number = current * -height;
        first.css('margin-top', number + 'px');
        if (current === numberDivs) {
            first.css('margin-top', '0px');
            current = 1;
        }
        else current++;
    }, 3000);

    /* COLLAPSE NAVIGATION ON MOBILE AFTER CLICKING ON LINK - ADDED ON V1.5*/
    if (matchMedia('(max-width: 767px)').matches) {
        $('.main-nav a').on('click', function() {
                $(".navbar-toggle").click();
            });
    }

    /* =================================
          Animated Counters             
    =================================== */
    $(".counter").appear(function() {
            $(".tmr").countTo({
                    speed: 2500
                });
        });

    /* =================================
         EasyPieCharts             
    =================================== */
    $("#ourskill").appear(function() {
            $('.chart').easyPieChart({
                    size: '200',
                    scaleColor: false,
                    lineWidth: 5,
                    animate: 2000,
                    trackColor: "#F5F5F5",
                    barColor: $('.chart').data('barcolor'),
                    easing: 'easeInOutSine',
                    onStep: function(from, to, percent) {
                        $(this.el)
                            .find('.percent')
                            .text(Math.round(percent) + '%');
                    }
                });
        });

    /* =================================
              OWL CROUSEL   
    =================================== */
    $("#feedbacks").owlCarousel({
            navigation: false, // Show next and prev buttons
            slideSpeed: 800,
            paginationSpeed: 400,
            autoPlay: 5000,
            singleItem: true
        });

    /* =================================
              Portfolio   
    =================================== */
    $(".Owl-Slider-Portfolio").map(function() {
            $(this).owlCarousel({
                    navigation: false, // Show next and prev buttons
                    slideSpeed: 600,
                    paginationSpeed: 600,
                    singleItem: true,
                    pagination: false,
                    autoHeight: true,
                    autoPlay: 4000,
                    stopOnHover: true,
                    afterInit: function(slide) {}
                });
            $('.window-portfolio').delegate(".fa-angle-right", "click", function() {
                    owl.next();
                });
            $('.window-portfolio').delegate(".fa-angle-left", "click", function() {
                    owl.prev();
                });
            var owl = $(this).data('owlCarousel');
        });
    $('.isotope-navigation .pagination a').click(function() {
            var selector = $(this).attr('data-filter');
            $(".isotope-container").isotope({
                    filter: selector
                });
            $('.isotope-navigation .pagination a').removeClass("active");
            $(this).addClass("active");
            return false;
        });
    var container_isotope = $(".isotope-container")
        .isotope({
            itemSelector: '.thumbnail-portfolio',
            getSortData: {
                number: function($elem) {
                    var number = $elem.hasClass('element') ? $elem.find(
                            '.number')
                        .text() : $elem.attr('data-number');
                    return parseInt(number, 10);
                },
                alphabetical: function($elem) {
                    var name = $elem.find('.name'),
                        itemText = name.length ? name : $elem;
                    return itemText.text();
                }
            }
        });

    function splitColumns() {
        var winWidth = $(window).width() + 15,
            columnNumb = 1;
        if (winWidth > 1200) {
            columnNumb = 4;
        }
        else if (winWidth > 992) {
            columnNumb = 3;
        }
        else if (winWidth > 767) {
            columnNumb = 2;
        }
        else if (winWidth < 767) {
            columnNumb = 1;
        }
        return columnNumb;
    }

    function setColumns() {
        var winWidth = $(window).width(),
            columnNumb = splitColumns(),
            postWidth = Math.floor(winWidth / columnNumb);
        container_isotope.find('.thumbnail-portfolio').each(function() {
                $(this).css({
                        width: postWidth + 'px'
                    });
            });
    }

    function setportfolio() {
        setColumns();
        container_isotope.isotope('reLayout');
    }
    setportfolio();
    $(".window-portfolio").hide();
    $(".thumbnail-portfolio").delegate('.opento', 'click', function() {
            $(".window-portfolio")
                .stop()
                .hide(1000)
                .show(1000, function() {
                    $("html,body").animate({
                            scrollTop: $(".window-portfolio").offset().top - 80
                        }, 1000);
                });
            return false;
        });
    $(".window-portfolio .detail-portfolio").delegate('i.close', 'click', function() {
            $(".window-portfolio").hide(1000);
        });

    /* =================================
                  Window Resize   
        =================================== */
    $(window).bind('resize', function() {
            setportfolio();
            $(".box-contact").css({
                    'min-height': $(".img-background img").height()
                });
        });

    /* =================================
              CONTACT FORM   
    =================================== */
    $("#form-contact").submit(function(e) {
            e.preventDefault();
            var name = $("#name").val();
            var email = $("#email").val();
            var phone = $("#phone").val();
            var website = $("#website").val();
            var message = $("#message").val();
            var dataString = 'name=' + name + '&email=' + email +
                '&phone=' + phone + '&website=' + website + '&message=' + message;

            function isValidEmail(emailAddress) {
                var pattern = new RegExp(
                    /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i
                );
                return pattern.test(emailAddress);
            };
            if (isValidEmail(email) && (message.length > 1) && (name.length >
                    1)) {
                $.ajax({
                    type: "POST",
                    url: "sendmail.php",
                    data: dataString,
                    success: function() {
                        $('.success').fadeIn(1000);
                        $('.error').fadeOut(500);
                    }
                });
            }
            else {
                $('.error').fadeIn(1000);
                $('.success').fadeOut(500);
            }
            return false;
        });
    /* =================================
              Switch Options for Demo   
    =================================== */
    $(".switch-section .form-control option[value='index-simple.html']").attr('selected', 'selected');
    $(document)
        .delegate('.show-setting', 'click', function() {
            if (!$('#switch').hasClass('open-switch')) {
                $('#switch').addClass('open-switch');
                $('#switch').animate({
                        'left': 0
                    });
            }
            else {
                $('#switch').removeClass('open-switch');
                $('#switch').animate({
                        'left': -146
                    });
            }
        });
    $(".switch-section .form-control").on("change", function() {
            if ($(this).val() != "") {
                location.replace($(this).val());
            }
        });
    $('.colorchange').click(function() {
            var colorcode = $(this).data('codecolor');
            $("#ourskill").appear(function() {
                    $('.chart').each(function(key, data) {
                            $(this).data('barColor', colorcode);
                            $(this).data('easyPieChart').options.barColor = colorcode;
                            $(this).data('easyPieChart').update($(this).data('percent'));
                        });
                });
            $('link[class="stylesheet-color"]').attr('href', 'css/skin/' + $(this).data('color') + '.css');
            $('.logo').children('img').attr('src', 'images/logo_' + $(this).data('color') + '.png');
        });
})(jQuery);