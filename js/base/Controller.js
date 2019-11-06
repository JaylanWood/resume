window.Controller = function (options) {
    var init = options.init
    // 6.把options传进来, options === {init:fn,loadMessages:fn,bindEvents:fn,saveMessage:fn} 这个对象
    //   根据5的结论，options.init 里的 this 就是 object
    //   调用 options.init 然后赋值给 init
    let object = {
        view: null,
        model: null,
        init: function (view, model) {
            // 3.根据2的结论，object.init 的 this 就是 object，
            //   所以这里 function 内的 this 都是 object。
            this.view = view
            this.model = model
            this.model.init()
            init.call(this, view, model)
            // 4.这里 init.call(this, view, model) 的 init，
            //   是 var init = options.init 的 init 变量，
            //   而不是 object 里的 init 属性。
            // 5.根据3和4的结论，
            //   init 是 option.init，
            //   this 是 object。
            //   所以 init.call(this, view, model)，
            //   就是 option.init.call(object,view,model)。
            this.bindEvents.call(this)
        },
    }
    for (let key in options) {
        if (key !== 'init') {
            object[key] = options[key]
        }
    }
    // 7.因为 object 是 this，但是 object 上只有 init 属性，
    //   没有 messageList、form、loadMessage、bindEvents、saveMessage 这些属性，
    //   所以 遍历 options 的属性，把除了 init 以外的属性 赋值给 object。
  
    return object // 0.调用Controller()，返回 object
}