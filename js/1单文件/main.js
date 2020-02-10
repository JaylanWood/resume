/******** 初始化轮播swiper.js ********/
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

/******** 页面加载动画 ********/
var webWelcome = document.querySelector('.webWelcome')
loadingAnimation(100)

function loadingAnimation(time) {
    window.setTimeout(function () {
        webWelcome.classList.remove('active')
    }, time)
}

/******** 留言板 ********/
let messageList = document.querySelector('.messageList')
let postMessageForm = document.querySelector('.postMessageForm')
AV.init({
    appId: "mJuVhxO68GtStDWtrhFJUX8t-gzGzoHsz",
    appKey: "heQIds6bW7KitjLNGrrYGYv8",
});
loadMessage()
bindEvents()

function loadMessage() {
    var query = new AV.Query('message');
    query.find()
        .then(function (message) {
            let array = message.map((item) => item.attributes)
            array.forEach((item) => {
                let li = document.createElement('li')
                li.innerText = `${item.name}:${item.content}`
                messageList.append(li)
            })
        })
}

function bindEvents() {
    postMessageForm.addEventListener('submit', function (eee) {
        eee.preventDefault() // 阻止表单提交默认刷新页面事件
        saveMessage()
    })
}

function saveMessage() {
    let name = postMessageForm.querySelector('input[name=name]').value
    let content = postMessageForm.querySelector('input[name=content]').value
    // leancloud 提供的保存对象的代码
    var Message = AV.Object.extend('message');
    var message = new Message();
    message.set('name', name);
    message.set('content', content);
    message.save()
        .then(function (object) {
            let li = document.createElement('li')
            li.innerText = `${object.attributes.name}:${object.attributes.content}`
            messageList.append(li)
            postMessageForm.querySelector('input[name=content]').value = ''
        })
}

/******** 上滚动画和高亮 ********/
let specialTags = document.querySelectorAll('[data-x]')
addOffset()
headRemoveOffset()
listenToScroll()

function addOffset() {
    for (let i = 0; i < specialTags.length; i++) {
        specialTags[i].classList.add('offset')
    }
}

function headRemoveOffset() {
    if (!window.scrollY > 0) {
        window.setTimeout(function () {
            findClosestAndRemoveOffset()
        }, 500)
    }
}

function listenToScroll() {
    window.addEventListener('scroll', function (x) {
        findClosestAndRemoveOffset()
    })
}

function findClosestAndRemoveOffset() {
    //1.根据窗口与目标div距离，找出需要高亮的[data-x]标签
    let currentTop = window.scrollY
    let minIndex = 0;
    for (let i = 1; i < specialTags.length; i++) {
        if (Math.abs(specialTags[i].offsetTop - currentTop) < Math.abs(specialTags[minIndex].offsetTop - currentTop)) {
            minIndex = i
        }
    }

    //2.根据[data-x]的id找出a，a找出li
    let id = specialTags[minIndex].id
    let a = document.querySelector('a[href="#' + id + '"]')
    let li = a.parentNode
    let liBros = li.parentNode.children
    for (let i = 0; i < liBros.length; i++) {
        liBros[i].classList.remove('heighLight')
    }
    li.classList.add('heighLight')

    //动画add offset
    specialTags[minIndex].classList.remove('offset')
}



/******** tween.js做a跳转锚点功能 ********/
let aTags = document.querySelectorAll('nav.menu>ul>li>a')
requestAnimationFrame(animate)
anchorAnimation()

function animate(time) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
}

function anchorAnimation() {
    for (let i = 0; i < aTags.length; i++) {
        aTags[i].onclick = function (xxx) {
            // 取消锚默认的跳转动作
            xxx.preventDefault()

            // 找到a要跳转的目标
            let a = xxx.currentTarget
            let href = a.getAttribute('href')
            let element = document.querySelector(href)

            // 做a跳转动画
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
        }
    }
}


/******** 滚动页面改变topNavBar样式 ********/
var topNavBar = document.querySelector('.topNavBar')
window.onload = changeTopNavBarStyle
window.addEventListener('scroll', changeTopNavBarStyle)

function changeTopNavBarStyle() {
    window.scrollY > 0 ? topNavBar.classList.add('sticky') : topNavBar.classList.remove('sticky')
}

/******** topNavBar次级菜单 ********/
let liTags = document.querySelectorAll('nav.menu>ul>li')
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