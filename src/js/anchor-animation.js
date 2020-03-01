// tween.js做a跳转锚点功能
! function () {
    var view = document.querySelector('nav.menu')
    var controller = {
        view: null,
        aTags: null,
        init: function (view) {
            this.view = view
            this.aTags = this.view.querySelectorAll('nav.menu>ul>li>a')
            this.initAnimation()
            this.bindEvents()
        },
        initAnimation: function () {
            function animate(time) {
                requestAnimationFrame(animate);
                TWEEN.update(time);
            }
            requestAnimationFrame(animate)
        },
        bindEvents: function () {
            for (let i = 0; i < this.aTags.length; i++) {
                this.aTags[i].onclick = (xxx) => {
                    // 取消锚默认的跳转动作
                    xxx.preventDefault()

                    // 找到a要跳转的目标
                    let a = xxx.currentTarget
                    let href = a.getAttribute('href')
                    let element = document.querySelector(href)

                    this.scrollToElement(element)
                }
            }
        },
        scrollToElement: function (element) {
            let top = element.offsetTop // 跳转目标的页面顶端高度
            let currentTop = window.scrollY // 当前位置的页面顶端高度
            let targetTop = top - 80 // 留80像素给topNavBar，以免目标被topNavBar覆盖

            let time = Math.abs((targetTop - currentTop) / 100 * 500)
            if (time > 500) {
                time = 500
            }

            // 用tween.js缓动
            const coords = {
                y: currentTop
            };
            const tween = new TWEEN.Tween(coords)
                .to({
                    y: targetTop
                }, time)
                .easing(TWEEN.Easing.Quadratic.InOut)
                .onUpdate(() => {
                    window.scrollTo(0, coords.y)
                })
                .start();
        },
    }

    controller.init(view)
}.call()