// topNavBar次级菜单
! function () {
    var view = document.querySelector('nav.menu')
    var controller = function (view) {
        let liTags = view.querySelectorAll('nav.menu>ul>li')
        topNavBarSubMenu()

        function topNavBarSubMenu() {
            for (let i = 0; i < liTags.length; i++) {
                liTags[i].onmouseenter = function (xxx) {
                    xxx.currentTarget.classList.add('active')
                }
                liTags[i].onmouseleave = function (xxx) {
                    xxx.currentTarget.classList.remove('active')
                }
            }
        }
    }
    controller(view)
}.call()