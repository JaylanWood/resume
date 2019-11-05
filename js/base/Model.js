window.Model = function (options) {
    let resourceName = options.resourceName
    return {
        init: function () {
            AV.init({
                appId: "mJuVhxO68GtStDWtrhFJUX8t-gzGzoHsz",
                appKey: "heQIds6bW7KitjLNGrrYGYv8",
            });
        },
        fetch: function () {
            var query = new AV.Query(resourceName);
            return query.find()
        },
        save: function (object) {
            var X = AV.Object.extend(resourceName);
            var x = new X();
            return x.save(object);
        }
    }
}