// View的作用：传入selector，返回dom对象
window.View = function (selector) {
    return document.querySelector(selector)
}
// Model的作用：传入一个带resourceName属性的对象，返回一个带init、fetch、save书香的对象
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

// Controller的作用：传入一个options对象，把options对象的init属性存入变量init，把options的属性“插”到object对象里，返回object对象。
window.Controller = function (options) {
    var init = options.init

    let object = {
        view: null,
        model: null,
        init: function (view, model) { 
            this.view = view
            this.model = model
            this.model.init()
            init.call(this, view, model)
            this.bindEvents.call(this)
        },
    }
    for (let key in options) {
        if (key !== 'init') {
            object[key] = options[key]
        }
    }
 
    return object
}


var view = View('section.message')

var model = Model({
    resourceName: 'message'
})

var controller = Controller({

    messageList: null,
    form: null,
    init: function (view) {
        this.messageList = view.querySelector('#messageList')
        this.form = view.querySelector('#postMessageForm')
        this.loadMessage()
    },
    loadMessage: function () {
        this.model.fetch().then(
            (message) => {
                let array = message.map((item) => item.attributes)
                array.forEach((item) => {
                    let li = document.createElement('li')
                    li.innerText = `${item.name}:${item.content}`
                    this.messageList.append(li)
                })
            }
        )
    },
    bindEvents: function () {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault()
            this.saveMessage()
        })
    },
    saveMessage: function () {
        let myForm = this.form
        let name = myForm.querySelector('input[name=name]').value
        let content = myForm.querySelector('input[name=content]').value
        this.model.save({
            'name': name,
            'content': content
        }).then(function (object) {
            let li = document.createElement('li')
            li.innerText = `${object.attributes.name}:${object.attributes.content}`
            let messageList = document.querySelector('#messageList')
            messageList.appendChild(li)
            myForm.querySelector('input[name=content]').value = ''
            console.log('保存成功。')
            console.log(object)
        })
    },
})

controller.init.call(controller, view, model)
// 执行此call等价于把options的除init以外的属性插入object里，再存到变量controller里，再call它的init属性。
// 这个controller有如下属性：
/*
var init = function (view, controller) {
    this.messageList = view.querySelector('#messageList')
    this.form = view.querySelector('#postMessageForm')
    this.loadMessage()
},

controller = {
    view: null,
    model: null,
    init: function (view, model) { 
        this.view = view
        this.model = model
        this.model.init()
        init.call(this, view, model)
        this.bindEvents.call(this)
    },
    messageList: null,
    form: null,
    loadMessage: function () {
        this.model.fetch().then(
            (message) => {
                let array = message.map((item) => item.attributes)
                array.forEach((item) => {
                    let li = document.createElement('li')
                    li.innerText = `${item.name}:${item.content}`
                    this.messageList.append(li)
                })
            }
        )
    },
    bindEvents: function () {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault()
            this.saveMessage()
        })
    },
    saveMessage: function () {
        let myForm = this.form
        let name = myForm.querySelector('input[name=name]').value
        let content = myForm.querySelector('input[name=content]').value
        this.model.save({
            'name': name,
            'content': content
        }).then(function (object) {
            let li = document.createElement('li')
            li.innerText = `${object.attributes.name}:${object.attributes.content}`
            let messageList = document.querySelector('#messageList')
            messageList.appendChild(li)
            myForm.querySelector('input[name=content]').value = ''
            console.log('保存成功。')
            console.log(object)
        })
    },
}
controller.init，controller得到view和model
controller.model.init，初始化model
options.init.call(controller,view,model) controller得到messageList和form
    init: function (view, controller) {
        this.messageList = view.querySelector('#messageList')
        this.form = view.querySelector('#postMessageForm')
        this.loadMessage()
    },
controller.loadMessage 把留言从服务器读取到浏览器
controller.bindEvents.call(controller) 绑定form表单提交事件
controller.saveMessage() 把留言从浏览器保存到服务器
*/