! function () {
    var view = document.querySelector('#topNavBar')
    var controller = function (view) {
        // controller 控制 view
        window.addEventListener('scroll', function (x) {
            window.scrollY > 0 ? view.classList.add('sticky') : view.classList.remove('sticky')
        })
    }
    controller(view)
}.call()