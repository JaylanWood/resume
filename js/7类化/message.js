// 留言板
! function () {
    var view = View('.message')

    var model = Model({
        resourceName: 'message'
    })

    var controller = Controller({
        init: function (view, model) {
            this.messageList = this.view.querySelector('.messageList')
            this.postMessageForm = this.view.querySelector('.postMessageForm')
            this.loadMessage()
        },
        loadMessage: function () {
            this.model.fetch().then((message) => {
                let array = message.map((item) => item.attributes)
                array.forEach((item) => {
                    let li = document.createElement('li')
                    li.innerText = `${item.name}:${item.content}`
                    this.messageList.append(li)
                })
            })
        },
        bindEvents: function () {
            this.postMessageForm.addEventListener('submit', (eee) => {
                eee.preventDefault() // 阻止表单提交默认刷新页面事件
                this.saveMessage()
            })
        },
        saveMessage: function () {
            var name = this.postMessageForm.querySelector('input[name=name]').value
            var content = this.postMessageForm.querySelector('input[name=content]').value
            // leancloud 提供的保存对象的代码
            this.model.save({
                'name': name,
                'content': content
            }).then((object) => {
                let li = document.createElement('li')
                li.innerText = `${object.attributes.name}:${object.attributes.content}`
                this.messageList.append(li)
                this.postMessageForm.querySelector('input[name=content]').value = ''
            })
        },
    })
    controller.init(view, model)
}.call()