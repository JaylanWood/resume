// 留言板
! function () {
    let messageList = document.querySelector('.messageList')
    let postMessageForm = document.querySelector('.postMessageForm')
    AV.init({
        appId: "mJuVhxO68GtStDWtrhFJUX8t-gzGzoHsz",
        appKey: "heQIds6bW7KitjLNGrrYGYv8",
    });
    loadMessage()
    bindEvents()

    function loadMessage() {
        var query = new AV.Query('message');
        query.find()
            .then(function (message) {
                let array = message.map((item) => item.attributes)
                array.forEach((item) => {
                    let li = document.createElement('li')
                    li.innerText = `${item.name}:${item.content}`
                    messageList.append(li)
                })
            })
    }

    function bindEvents() {
        postMessageForm.addEventListener('submit', function (eee) {
            eee.preventDefault() // 阻止表单提交默认刷新页面事件
            saveMessage()
        })
    }

    function saveMessage() {
        let name = postMessageForm.querySelector('input[name=name]').value
        let content = postMessageForm.querySelector('input[name=content]').value
        // leancloud 提供的保存对象的代码
        var Message = AV.Object.extend('message');
        var message = new Message();
        message.set('name', name);
        message.set('content', content);
        message.save()
            .then(function (object) {
                let li = document.createElement('li')
                li.innerText = `${object.attributes.name}:${object.attributes.content}`
                messageList.append(li)
                postMessageForm.querySelector('input[name=content]').value = ''
            })
    }
}.call()