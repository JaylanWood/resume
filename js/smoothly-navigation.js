// tween.js做a跳转锚点功能
let aTags = document.querySelectorAll('nav.menu>ul>li>a')

function animate(time) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
}
requestAnimationFrame(animate);


for (let i = 0; i < aTags.length; i++) {
    aTags[i].onclick = function (xxx) {
        xxx.preventDefault()
        let a = xxx.currentTarget
        let href = a.getAttribute('href')
        let element = document.querySelector(href)
        let top = element.offsetTop

        //用tween.js缓动做a跳转动画
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
    }
}