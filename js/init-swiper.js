! function () {
    var view = document.querySelector('.swiper')
    var controller = function (view) {
        var mySwiper = new Swiper(view.querySelector('.swiper-container'), {
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
        })
    }
    controller.call(null, view)
}.call()