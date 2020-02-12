// 留言板
! function () {
    var view = document.querySelector('.message')

    var controller = {
        view: null,
        messageList: null,
        postMessageForm: null,
        init: function (view) {
            this.view = view
            this.messageList = this.view.querySelector('.messageList')
            this.postMessageForm = this.view.querySelector('.postMessageForm')
            this.initAV()
            this.loadMessage()
            this.bindEvents()
        },
        initAV: function () {
            AV.init({
                appId: "mJuVhxO68GtStDWtrhFJUX8t-gzGzoHsz",
                appKey: "heQIds6bW7KitjLNGrrYGYv8",
            });
        },
        loadMessage: function () {
            var query = new AV.Query('message');
            query.find()
                .then((message) => {
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
            let name = this.postMessageForm.querySelector('input[name=name]').value
            let content = this.postMessageForm.querySelector('input[name=content]').value
            // leancloud 提供的保存对象的代码
            var Message = AV.Object.extend('message');
            var message = new Message();
            message.set('name', name);
            message.set('content', content);
            message.save()
                .then((object) => {
                    let li = document.createElement('li')
                    li.innerText = `${object.attributes.name}:${object.attributes.content}`
                    this.messageList.append(li)
                    this.postMessageForm.querySelector('input[name=content]').value = ''
                })
        },
    }
    controller.init(view)
}.call()