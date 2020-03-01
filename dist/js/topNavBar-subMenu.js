"use strict";

// topNavBar次级菜单
!function () {
  var view = View('nav.menu');
  var controller = {
    view: null,
    liTags: null,
    init: function init(view) {
      this.view = view;
      this.liTags = this.view.querySelectorAll('nav.menu>ul>li');
      this.bindEvents();
    },
    bindEvents: function bindEvents() {
      for (var i = 0; i < this.liTags.length; i++) {
        this.liTags[i].onmouseenter = function (xxx) {
          xxx.currentTarget.classList.add('active');
        };

        this.liTags[i].onmouseleave = function (xxx) {
          xxx.currentTarget.classList.remove('active');
        };
      }
    }
  };
  controller.init(view);
}.call();