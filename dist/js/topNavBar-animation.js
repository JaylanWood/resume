"use strict";

// 滚动页面改变topNavBar样式
!function () {
  var view = View('.topNavBar');
  var controller = {
    view: null,
    init: function init(view) {
      this.view = view;
      this.bindevents();
      this.onloadBindevents();
    },
    bindevents: function bindevents() {
      var _this = this;

      window.addEventListener('scroll', function () {
        window.scrollY > 0 ? _this.active() : _this.deactive();
      });
    },
    onloadBindevents: function onloadBindevents() {
      var _this2 = this;

      window.addEventListener('load', function () {
        window.scrollY > 0 ? _this2.active() : _this2.deactive();
      });
    },
    active: function active() {
      this.view.classList.add('sticky');
    },
    deactive: function deactive() {
      this.view.classList.remove('sticky');
    }
  };
  controller.init.call(controller, view);
}.call();