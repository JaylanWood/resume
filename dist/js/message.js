"use strict";

// 留言板
!function () {
  var view = View('.message');
  var model = Model({
    resourceName: 'message'
  });
  var controller = Controller({
    init: function init(view, model) {
      this.messageList = this.view.querySelector('.messageList');
      this.postMessageForm = this.view.querySelector('.postMessageForm');
      this.loadMessage();
    },
    loadMessage: function loadMessage() {
      var _this = this;

      this.model.fetch().then(function (message) {
        var array = message.map(function (item) {
          return item.attributes;
        });
        array.forEach(function (item) {
          var li = document.createElement('li');
          li.innerText = "".concat(item.name, ":").concat(item.content);

          _this.messageList.append(li);
        });
      });
    },
    bindEvents: function bindEvents() {
      var _this2 = this;

      this.postMessageForm.addEventListener('submit', function (eee) {
        eee.preventDefault(); // 阻止表单提交默认刷新页面事件

        _this2.saveMessage();
      });
    },
    saveMessage: function saveMessage() {
      var _this3 = this;

      var name = this.postMessageForm.querySelector('input[name=name]').value;
      var content = this.postMessageForm.querySelector('input[name=content]').value; // leancloud 提供的保存对象的代码

      this.model.save({
        'name': name,
        'content': content
      }).then(function (object) {
        var li = document.createElement('li');
        li.innerText = "".concat(object.attributes.name, ":").concat(object.attributes.content);

        _this3.messageList.append(li);

        _this3.postMessageForm.querySelector('input[name=content]').value = '';
      });
    }
  });
  controller.init(view, model);
}.call();