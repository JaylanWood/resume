
portfolio1.onclick = function () {
    portfolioBar.className = 'bar state-1';
}
portfolio2.onclick = function () {
    portfolioBar.className = 'bar state-2';
}
portfolio3.onclick = function () {
    portfolioBar.className = 'bar state-3';
}
//会变的topNavBar
window.onscroll = function (xxx) {
    console.log(window.scrollY)
    window.scrollY > 0 ? topNavBar.classList.add('sticky') : topNavBar.classList.remove('sticky')
}
//滚动到指定元素