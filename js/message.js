! function () {
    var view = View('section.message')

    var model = Model({
        resourceName: 'message'
    })

    var controller = Controller({
        // 1.调用Controller()，返回 window.Controller = function(options){return object} 的 object，
        //   把返回的 object 赋值给变量 controller，
        //   所以 controller === object。
        messageList: null,
        form: null,
        init: function (view, controller) {
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
    // 2.开始调用，根据1的结论，因为 controller === object，
    //   所以 controller.init.call(controller, view, model)，
    //   就是 object.init.call(object, view, model)。
    //   所以 object.init 里的 this 就是 object。
}.call()