// 页面加载动画
! function () {
    var webWelcome = document.querySelector('.webWelcome')
    loadingAnimation(100)

    function loadingAnimation(time) {
        window.setTimeout(function () {
            webWelcome.classList.remove('active')
        }, time)
    }
}.call()