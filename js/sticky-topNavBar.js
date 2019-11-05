! function () {
    var view = View('#topNavBar')
    var controller = {
        view: null,
        init: function (view) {
            this.view = view // bindEvents()不能访问传进来的view，但是可以访问this.view
            this.bindEvents()
            // this.bindEvents.call(this) 
        },
        bindEvents: function () {
            var view = this.view // this.view相当于一个中转站
            window.addEventListener('scroll', () => {
                if (window.scrollY > 0) {
                    this.active()
                } else {
                    this.deactive()
                }
            }) // 箭头函数没有this，它只能往上面代码就近的this当作自己的this。正好符合我们的需求。
        },
        active: function () {
            this.view.classList.add('sticky')
        },
        deactive: function () {
            this.view.classList.remove('sticky')
        }
    }
    controller.init(view)
    // controller.init.call(controller, view) 

    /*
    this的变化：
    1.执行controller.init.call(controller, view)，把controller传进来作为this。
    2.执行this.bindEvents.call(this)，相当于controller.bindEvents.call(controller)，于是把controller传进来作为this。
    3.执行this.active()，因为它是在一个监听事件里，所以本来的this就是用户scroll。
        但是我们要把这个this改为bindEvents()传进来的this，也就是controller。
        所以添加.bind(this)把this改为bindEvents()传进来的this，也就是controller。
    */

    /*
    view的变化：
    controller.view一开始是null
    执行controller.init(view)，controller.view由null变为传进来的topNavBar
    执行this.bindEvents.call(this)，用一个新的view变量存储controller.view，也就是topNavBar
    执行this.active()，view就是这个新的view变量，也就是topNavBar
    */
}.call()