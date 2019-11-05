! function () {
    var view = View('nav.menu')
    var controller = {
        view: null,
        aTags: null,
        initAnimation: function () {
            function animate(time) {
                requestAnimationFrame(animate);
                TWEEN.update(time);
            }
            requestAnimationFrame(animate);
        },
        scrollToElement: function (element) {
            let top = element.offsetTop
            let currentTop = window.scrollY
            let targetTop = top - 80
            let time = Math.abs((targetTop - currentTop) / 100 * 500)
            if (time > 500) {
                time = 500
            }
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
        bindEvents: function () {
            let aTags = this.view.querySelectorAll('nav.menu>ul>li>a')
            this.initAnimation
            for (let i = 0; i < aTags.length; i++) {
                aTags[i].onclick = (xxx) => {
                    xxx.preventDefault()
                    let a = xxx.currentTarget
                    let href = a.getAttribute('href')
                    let element = document.querySelector(href)
                    this.scrollToElement(element)
                }
            }
        },
        init: function (view) {
            this.view = view
            this.initAnimation()
            this.bindEvents()
        }
    }
    controller.init(view)
}.call()