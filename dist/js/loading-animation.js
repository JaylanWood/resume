"use strict";

// 页面加载动画
!function () {
  var view = View('.webWelcome');
  var controller = {
    view: null,
    init: function init(view) {
      this.view = view;
      this.loadingAnimation(100);
    },
    loadingAnimation: function loadingAnimation(time) {
      var _this = this;

      window.setTimeout(function () {
        _this.view.classList.remove('active');
      }, time);
    }
  };
  controller.init(view);
}.call();