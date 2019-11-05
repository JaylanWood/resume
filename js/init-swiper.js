! function () {
    var view = View('.swiper')
    var controller = {
        view: null,
        swiper: null,
        swiperOptions: {
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
        },
        init: function (view) {
            this.view = view
            this.initSwiper()
        },
        initSwiper: function () {
            this.swiper = new Swiper(
                this.view.querySelector('.swiper-container'),
                this.swiperOptions
            )
        }
    }
    controller.init(view)
}.call()

// MVC前
// var mySwiper = new Swiper('.swiper-container', {
//     loop: true,
//     pagination: {
//         el: '.swiper-pagination',
//         clickable: true,
//     },
//     navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//     },
//     autoplay: {
//         delay: 2000,
//         disableOnInteraction: false,
//     },
// })