// swiper.js
var mySwiper = new Swiper('.swiper-container', {
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
})


// 页面加载动画
setTimeout(function () {
    webWelcome.classList.remove('active')
}, 0)

// 导航栏li次级菜单
let liTags = document.querySelectorAll('nav.menu>ul>li')
for (let i = 0; i < liTags.length; i++) {
    liTags[i].onmouseenter = function (x) {
        x.currentTarget.classList.add('active')
    }
    liTags[i].onmouseleave = function (x) {
        x.currentTarget.classList.remove('active')
    }
}
// 自制topNavBar的a跳转锚点功能
let aTags = document.querySelectorAll('nav.menu>ul>li>a')

for (let i = 0; i < aTags.length; i++) {
    aTags[i].onclick = function (xxx) {
        xxx.preventDefault()
        let a = xxx.currentTarget
        let href = a.getAttribute('href')
        let element = document.querySelector(href)
        let top = element.offsetTop
        //用tween.js缓动做跳转动画
        function animate(time) {
            requestAnimationFrame(animate);
            TWEEN.update(time);
        }
        requestAnimationFrame(animate);

        var currentTop = window.scrollY
        var targetTop = top - 80
        var time = Math.abs((targetTop - currentTop) / 100 * 500)
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
    }
}

// 页面加载，导航栏sticky
window.onload = function () {
    window.scrollY > 0 ? topNavBar.classList.add('sticky') : topNavBar.classList.remove('sticky')
}

// 动画remove offset
var heighLightTags = document.querySelectorAll('[data-x]')
for (var i = 0; i < heighLightTags.length; i++) {
    heighLightTags[i].classList.add('offset')
}

// 页面加载 执行data-x上升动画
window.setTimeout(function () {
    addAnimation()
}, 200)

// 滚动页面，执行data-x上升动画、导航栏下划线高亮
window.onscroll = function () {
    //改topNavBar的calss，实现高度、背景、字体颜色变化
    window.scrollY > 0 ? topNavBar.classList.add('sticky') : topNavBar.classList.remove('sticky')
    addAnimation()
}

// data-x上升动画、导航栏下划线高亮
function addAnimation() {
    //1.根据窗口与目标div距离，找出需要高亮的[data-x]标签
    var heighLightTags = document.querySelectorAll('[data-x]')
    var currentTop = window.scrollY
    var minIndex = 0;
    for (var i = 1; i < heighLightTags.length; i++) {
        if (Math.abs(heighLightTags[i].offsetTop - currentTop) < Math.abs(heighLightTags[minIndex].offsetTop -
                currentTop)) {
            minIndex = i
        }
    }

    //2.根据[data-x]的id找出a，a找出li
    var id = heighLightTags[minIndex].id
    var a = document.querySelector('a[href="#' + id + '"]')
    var li = a.parentNode
    var liBros = li.parentNode.children
    for (var i = 0; i < liBros.length; i++) {
        liBros[i].classList.remove('heighLight')
    }
    li.classList.add('heighLight')

    //动画add offset
    heighLightTags[minIndex].classList.remove('offset')
}