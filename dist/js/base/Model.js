"use strict";

window.Model = function (options) {
  var resourceName = options.resourceName;
  return {
    init: function init() {
      AV.init({
        appId: "mJuVhxO68GtStDWtrhFJUX8t-gzGzoHsz",
        appKey: "heQIds6bW7KitjLNGrrYGYv8"
      });
    },
    fetch: function fetch() {
      var query = new AV.Query(resourceName);
      return query.find();
    },
    save: function save(object) {
      var Message = AV.Object.extend(resourceName);
      var message = new Message();
      message.set('name', object.name);
      message.set('content', object.content);
      return message.save();
    }
  };
};