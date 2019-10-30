// 页面加载 导航栏sticky
window.onload = function () {
    window.scrollY > 0 ? topNavBar.classList.add('sticky') : topNavBar.classList.remove('sticky')
}

// sticky topNavbar
window.addEventListener('scroll',function(x){
    window.scrollY > 0 ? topNavBar.classList.add('sticky') : topNavBar.classList.remove('sticky')
})
