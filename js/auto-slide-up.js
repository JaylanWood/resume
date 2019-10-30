// 找出data-x，添加offset
let specialTags = document.querySelectorAll('[data-x]')
for (let i = 0; i < specialTags.length; i++) {
    specialTags[i].classList.add('offset')
}

// 页面加载 延迟执行一次data-x上升动画
if (!window.scrollY > 0) {
    window.setTimeout(function () {
        findClosestAndRemoveOffset()
    }, 500)
}

window.addEventListener('scroll', function (x) {
    findClosestAndRemoveOffset()
})


// 函数
function findClosestAndRemoveOffset() {
    //1.根据窗口与目标div距离，找出需要高亮的[data-x]标签
    let specialTags = document.querySelectorAll('[data-x]')
    let currentTop = window.scrollY
    let minIndex = 0;
    for (let i = 1; i < specialTags.length; i++) {
        if (Math.abs(specialTags[i].offsetTop - currentTop) < Math.abs(specialTags[minIndex].offsetTop -
                currentTop)) {
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