// 滚动页面改变topNavBar样式
!function (){
    var topNavBar = document.querySelector('.topNavBar')
    window.onload = changeTopNavBarStyle
    window.addEventListener('scroll', changeTopNavBarStyle)
    
    function changeTopNavBarStyle() {
        window.scrollY > 0 ? topNavBar.classList.add('sticky') : topNavBar.classList.remove('sticky')
    }
}.call()
