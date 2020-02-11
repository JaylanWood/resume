// 页面加载动画
! function () {
    var view = document.querySelector('.webWelcome')
    var controller = function (view) {
        loadingAnimation(100)

        function loadingAnimation(time) {
            window.setTimeout(function () {
                view.classList.remove('active')
            }, time)
        }
    }
    controller(view)
}.call()