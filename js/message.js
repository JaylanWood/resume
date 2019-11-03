// leancloud初始化
AV.init({
    appId: "mJuVhxO68GtStDWtrhFJUX8t-gzGzoHsz",
    appKey: "heQIds6bW7KitjLNGrrYGYv8",
});
// 读取leancloud
var query = new AV.Query('message');
query.find()
    .then(
        function (message) {
            let array = message.map((item) => item.attributes)
            let messageList = document.querySelector('#messageList')
            array.forEach((item) => {
                let li = document.createElement('li')
                li.innerText = `${item.name}:${item.content}`
                messageList.append(li)
            })
        }
    )
// 写入leancloud
let myForm = document.querySelector('#postMessageForm')
postMessageForm.addEventListener('submit', function (e) {
    e.preventDefault()
    let name = myForm.querySelector('input[name=name]').value
    let content = myForm.querySelector('input[name=content]').value
    var Message = AV.Object.extend('message');
    var message = new Message();
    message.set('name', name);
    message.set('content', content);
    message.save()
        .then(function (object) {
            let li = document.createElement('li')
            li.innerText = `${object.attributes.name}:${object.attributes.content}`
            messageList.append(li)
            myForm.querySelector('input[name=content]').value = ''
            console.log('保存成功。')
            console.log(object)
        })
})