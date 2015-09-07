/**
 * Created by apple on 15/9/4.
 */
define(["app/home", "lib/pgwslider"],
    function(home, v) {
        return {
            init: function() {
                $('.jumpto_job').click(function() {
                    $('body,html').animate({
                            scrollTop: $("#jobborder").offset().top - 160
                        },
                        1000);
                });
                $('.jumpto_start').click(function() {
                    $('body,html').animate({
                            'scrollTop': $(".startups").offset().top - 160
                        },
                        1000);
                });
                $('.jumpto_people').click(function() {
                    $('body,html').animate({
                            'scrollTop': $(".people_mao").offset().top - 160
                        },
                        1000);
                });
                if ($('.cloud').get(0)) {
                    var moveCloud = function() {
                        $('.cloud').animate({
                                'top': '+=20px'
                            },
                            3000, 'linear',
                            function() {
                                $('.cloud').animate({
                                        'top': '-=20px'
                                    },
                                    3000, 'linear',
                                    function() {
                                        moveCloud();
                                    });
                            });
                    };
                    moveCloud();
                }
                $('.pgwSlider').pgwSlider({
                    selectionMode: "mouseOver"
                });
            }
        };
    });