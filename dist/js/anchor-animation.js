"use strict";

// tween.js做a跳转锚点功能
!function () {
  var view = document.querySelector('nav.menu');
  var controller = {
    view: null,
    aTags: null,
    init: function init(view) {
      this.view = view;
      this.aTags = this.view.querySelectorAll('nav.menu>ul>li>a');
      this.initAnimation();
      this.bindEvents();
    },
    initAnimation: function initAnimation() {
      function animate(time) {
        requestAnimationFrame(animate);
        TWEEN.update(time);
      }

      requestAnimationFrame(animate);
    },
    bindEvents: function bindEvents() {
      var _this = this;

      for (var i = 0; i < this.aTags.length; i++) {
        this.aTags[i].onclick = function (xxx) {
          // 取消锚默认的跳转动作
          xxx.preventDefault(); // 找到a要跳转的目标

          var a = xxx.currentTarget;
          var href = a.getAttribute('href');
          var element = document.querySelector(href);

          _this.scrollToElement(element);
        };
      }
    },
    scrollToElement: function scrollToElement(element) {
      var top = element.offsetTop; // 跳转目标的页面顶端高度

      var currentTop = window.scrollY; // 当前位置的页面顶端高度

      var targetTop = top - 80; // 留80像素给topNavBar，以免目标被topNavBar覆盖

      var time = Math.abs((targetTop - currentTop) / 100 * 500);

      if (time > 500) {
        time = 500;
      } // 用tween.js缓动


      var coords = {
        y: currentTop
      };
      var tween = new TWEEN.Tween(coords).to({
        y: targetTop
      }, time).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(function () {
        window.scrollTo(0, coords.y);
      }).start();
    }
  };
  controller.init(view);
}.call();