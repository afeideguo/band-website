//用于添加页面载入事件的函数
function addLoadEvent(func) {
    var oldLoad = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldLoad();
            func();
        }
    }
}

//向元素后插入元素的函数
function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement)
    }
    else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

//为元素添加类名的函数
function addClass(element, value) {
    if (!element.className) {
        element.className = value;
    } else {
        newClassName = element.className;
        newClassName += ' ';
        newClassName += value;
        element.className = newClassName;
    }
}

//移动元素到某点的函数
function moveElement(elemId,toX,toY,interval){
    var elem = document.getElementById(elemId)
    if(elem.movement){
        clearTimeout(elem.movement)
    }
    if(!elem.style.left){
        elem.style.left = '0px'
    }
    if(!elem.style.bottom){
        elem.style.bottom = '0px'
    }
    var x = parseInt(elem.style.left)
    var y = parseInt(elem.style.bottom)
    if (x == toX && y == toY){
        return false
    }
     if ( x < toX){
        dist = Math.ceil((toX - x)/10)
        x = x+dist
    }
    if (x > toX){
        dist = Math.ceil((x - toX)/10)
        x = x - dist
    }
    if (y > toY){
        dist = Math.ceil((y - toY)/10)
        y = y - dist
    }
    if (y < toY){
        dist = Math.ceil((toY - y)/10)
        y = y + dist
    }
    elem.style.left = x + 'px'
    elem.style.bottom = y + 'px'
    var repeat ="moveElement('" + elemId +"',"+toX+","+toY+","+interval+")";
    elem.movement = setTimeout(repeat,interval)
}

//高亮对应本页面的导航栏标签的函数
function hlightpage(){
    var header = document.getElementsByTagName('header')
    if (!header) return false
    var nav = header[0].getElementsByTagName('nav')
    if (!nav) return false
    var links = nav[0].getElementsByTagName('a')
    for (var i = links.length - 1; i >= 0; i--) {
        linkurl = links[i].href
        if (window.location.href.indexOf(linkurl) != -1){
            links[i].className = 'here'
            var linktext = links[i].lastChild.nodeValue.toLowerCase()
            document.body.setAttribute('id',linktext)
            document.title = linktext
        }
    }
}

//首页的滑动图片
function slideshow(){
    var div = document.createElement('div')
    div.setAttribute('id','slidediv')
    var frame = document.createElement('img')
    frame.src = 'Image/frame.gif'
    frame.setAttribute('id','frame')
    div.appendChild(frame)
    var img = document.createElement('img')
    img.src = 'Image/slideshow.gif'
    img.setAttribute('id','slideimg')
    div.appendChild(img)
    var intro  = document.getElementById('intro')
    if(!intro) return false;
    insertAfter(div,intro)
    var links = document.getElementsByTagName('a')
    for (var i = links.length - 1; i >= 0; i--) {
        links[i].onmouseover = function(){
        var guide  = this.href
        if (guide.indexOf('index.html') != -1){
            moveElement('slideimg',0,0,1)
        }
        if (guide.indexOf('about.html') != -1){
            moveElement('slideimg',-150,0,1)
        }
        if (guide.indexOf('photos.html') != -1){
            moveElement('slideimg',-300,0,1)
        }
        if (guide.indexOf('live.html') != -1){
            moveElement('slideimg',-450,0,1)
        }
        if (guide.indexOf('contact.html') != -1){
            moveElement('slideimg',-600,0,1)
        }
    }
}
}

//用于显示和隐藏正文的函数
function showSection(id){
    var sections = document.getElementsByTagName('section')
    for (var i = sections.length - 1; i >= 0; i--) {
        var secId = sections[i].getAttribute('id')
        if(secId != id){
            sections[i].style.display = 'none'
        }else{
            sections[i].style.display = 'block'
        }
    }
}

//显示或隐藏 关于页面 中的正文
function toShowsec(){
    var arti = document.getElementsByTagName('article')
    var navs = arti[0].getElementsByTagName('nav')
    if(!navs[0]) return false;
    var navlinks = navs[0].getElementsByTagName('a')
    for (var i = navlinks.length - 1; i >= 0; i--) {
             var lhref = navlinks[i].getAttribute('href').split('#')[1]
            if(!document.getElementById(lhref)) continue;
            document.getElementById(lhref).style.display = 'none'
            navlinks[i].scope = lhref
            navlinks[i].onclick = function(){
            showSection(this.scope);
            return false;
        }
    }
}

//创建photos页面的大图和简介元素
function placeholde(){
    var desc = document.createElement('p')
    desc.setAttribute('id','desc')
    desc.innerHTML = '与乐队灵魂共舞'
    var img = document.createElement('img')
    img.src = 'Image/place.jpeg'
    img.setAttribute('id','placeholde')
    var ul = document.getElementById('glph')
    if(!ul) return false;
    insertAfter(img,ul)
    insertAfter(desc,ul)
}


//显示被点击缩略图链接对应的大图
function showpic(pic){
    var href = pic.href
    var place = document.getElementById('placeholde')
    place.src = href
    if(pic.getAttribute('title')){
        var title = pic.getAttribute('title')
        var desc = document.getElementById('desc')
        desc.innerHTML = title
    }
    return false
}

//为缩略图链接添加点击事件
function addClick(){
    var ul = document.getElementById('glph')
    if(!ul) return false;
    var links = ul.getElementsByTagName('a')
    for (var i = links.length - 1; i >= 0; i--) {
        links[i].onclick = function(){
            return showpic(this)
        }
    }
}

//为偶数行添加另外背景
function oddlight(onetr){
    var tables = document.getElementsByTagName('table')
    for (var i = tables.length - 1; i >= 0; i--) {
        var odd = false
        var rows = tables[i].getElementsByTagName('tr')
        for (var i = rows.length - 1; i >= 0; i--) {
            if(odd == true){
                addClass(rows[i],'odd')
                odd = false
            }else{
                odd = true
            }
        }
    }
}

//为鼠标移动到行添加另外背景
function overhlight(){
    var allrows = document.getElementsByTagName('tr')
    for (var i = allrows.length - 1; i >= 0; i--) {
        allrows[i].oldClassName = allrows[i].className
        allrows[i].onmouseover = function(){
            addClass(this,'hlight')
        }
        allrows[i].onmouseout = function(){
            this.className = this.oldClassName
        }
    }
}

//用于不支持label跳转焦点的浏览器实现label跳转
function labelfocus(){
    var labels = document.getElementsByTagName('label')
    for (var i = labels.length - 1; i >= 0; i--) {
        if(!labels[i].getAttribute('for')) return false
        labels[i].onclick = function(){
            var forid = this.getAttribute('for')
            var forin = document.getElementById(forid)
            forin.focus()
        }
    }
}

//用placehold值初始化表单
function resetform(oneform){
    for(var i=0;i<oneform.elements.length;i++){
        var elem = oneform.elements[i]
        if(elem.type == 'submit') continue;
        if(!elem.placeholder) continue;
        elem.onfocus = function(){
            if(this.value == this.placeholder){
                this.className = ''
                this.value = ''
            }
        }
        elem.onblur = function(){
            if(this.value == ''){
                this.className = 'place'
                this.value = this.placeholder
            }
        }
        elem.onblur()
    }
}



//检测表单项是否填写
function isfilled(field){
    if(field.value.replace(' ','').length == 0) return false;
    return(field.value != field.placeholder)
}

//检测是否符合邮件地址规则
function isemail(field){
    return (field.value.indexOf('@') != -1 && field.value.indexOf('.') != -1)
}

//验证表单函数
function validateform(aform){
    for(var i = 0;i<aform.elements.length;i++){
        var aelem = aform.elements[i]
        if(aelem.getAttribute('required')){
        if(!isfilled(aelem)) {
            alert('fill it!!!!')
            return false
        }
        if(aelem.type == 'email'){
            if(!isemail(aelem)){
               alert('not eaill!!')
               return false
        }}
    }
}
return true;
}

//遍历页面表单执行初始化并绑定提交验证
function findform(){
    var forms = document.forms
    for (var i = forms.length - 1; i >= 0; i--) {
        resetform(forms[i])
        forms[i].onsubmit = function(){
            if(!validateform(this)) return false;
            var article = document.getElementsByTagName('article')[0]
            if(sajax(this,article)) return false;
            return true;
            }
        }
    }


//添加表单表单提交动画函数
function submitload(formparent){
    if(formparent.hasChildNodes()){
        formparent.removeChild(formparent.lastChild)
    }
    var loadimg = document.createElement('img')
    loadimg.src = 'Image/loading.gif'
    formparent.appendChild(loadimg)
}

//表单提交执行函数
function sajax(form,formparent){
    submitload(formparent)

    //生成ajax的post方法所需的请求字符串
    var prama = [];
    for (var i = form.elements.length - 1; i >= 0; i--) {
        var elem = form.elements[i]
        prama[i]=elem.name + '=' + encodeURIComponent(elem.value)
    }
    var data = prama.join('&')

    //ajax请求
    var xhr = new XMLHttpRequest();
    xhr.open('POST','submit.html')
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded')
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            var articles = xhr.responseText.match(/<article>([\s\S]+)<\/article>/)
            if(articles.length > 0){
                formparent.innerHTML = articles[0]
            }else{
                formparent.innerHTML  = '<p>提交错误,请重试</p>'
            }
        }
    }
    xhr.send(data);
    return true;
}

addLoadEvent(hlightpage);
addLoadEvent(slideshow);
addLoadEvent(toShowsec)
addLoadEvent(placeholde)
addLoadEvent(addClick)
addLoadEvent(oddlight)
addLoadEvent(overhlight)
addLoadEvent(labelfocus)
addLoadEvent(findform)