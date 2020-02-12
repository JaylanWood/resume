// 页面加载动画
! function () {
    var view = document.querySelector('.webWelcome')
    var controller = {
        view: null,
        init: function (view) {
            this.view = view
            this.loadingAnimation(100)
        },
        loadingAnimation: function (time) {
            window.setTimeout(() => {
                this.view.classList.remove('active')
            }, time)
        }
    }

    controller.init(view)
}.call()