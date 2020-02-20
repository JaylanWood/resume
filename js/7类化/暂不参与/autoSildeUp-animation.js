// 上滚动画和高亮
! function () {
    // specialTags 的 view 是一个数组，我们暂时跳过它吧。
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
        window.addEventListener('scroll', function () {
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

        // 下划线高亮
        for (let i = 0; i < liBros.length; i++) {
            liBros[i].classList.remove('heighLight')
        }
        li.classList.add('heighLight')

        // 上滚动画
        specialTags[minIndex].classList.remove('offset')
    }
}.call()