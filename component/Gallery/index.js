require.config({
    packages:    ['Gallery'],
    paths:       {
        Swiper:    'https://cdn.bootcss.com/Swiper/3.4.2/js/swiper.jquery.min',
    }
});


require([
    'jquery', 'EasyWebApp', 'Swiper', 'Gallery/Board_3D'
],  function ($, EWA, Swiper) {

    EWA.component(function () {

        var $_Slide = this.$_View.find('.swiper-container');

        this.on('ready',  function () {

            var swiper = new Swiper($_Slide[0], {
                    simulateTouch:                   false,
                    autoplay:                        3000,
                    autoplayDisableOnInteraction:    false,
                    loop:                            true,
                    pagination:                      '.swiper-pagination',
                    paginationClickable:             true
                });

            $_Slide.hover(
                swiper.stopAutoplay.bind( swiper ),
                swiper.startAutoplay.bind( swiper )
            );
        });
    });
});
