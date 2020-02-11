// 滚动页面改变topNavBar样式

! function () {
    var view = document.querySelector('.topNavBar')
    var controller = function (view) {
        window.onload = changeTopNavBarStyle
        window.addEventListener('scroll', changeTopNavBarStyle)

        function changeTopNavBarStyle() {
            window.scrollY > 0 ? view.classList.add('sticky') : view.classList.remove('sticky')
        }
    }
    controller(view)
}.call()