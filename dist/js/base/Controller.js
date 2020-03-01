"use strict";

window.Controller = function (options) {
  // 拿到私有的init
  var _init = options.init;
  var object = {
    view: null,
    model: null,
    init: function init(view, model) {
      this.view = view;
      this.model = model;
      this.model.init(); // 调用私有的init

      _init.call(this, view, model); // 相当于 options.init.call(object, view, model)


      this.bindEvents();
    }
  }; // 拿到init以外的私有属性

  for (var key in options) {
    if (key !== 'init') {
      object[key] = options[key];
    }
  }

  return object;
};