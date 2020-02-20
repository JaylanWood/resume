// 滚动页面改变topNavBar样式

! function () {
    var view = View('.topNavBar')

    var controller = {
        view: null,
        init: function (view) {
            this.view = view
            this.bindevents()
            this.onloadBindevents()
        },
        bindevents: function () {
            window.addEventListener('scroll', () => {
                window.scrollY > 0 ? this.active() : this.deactive()
            })
        },
        onloadBindevents: function () {
            window.addEventListener('load', () => {
                window.scrollY > 0 ? this.active() : this.deactive()
            })
        },
        active: function () {
            this.view.classList.add('sticky')
        },
        deactive: function () {
            this.view.classList.remove('sticky')
        },
    }

    controller.init.call(controller, view)
}.call()