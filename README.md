乐队网站主要分为五个页面,分别是主页,关于,图库,日程和联系.
主要实现了以下几点:
    页面的结构和表现和行为的完全分离
    页面的平稳退化和渐进增强,保证了禁用JS情况下的页面基本表现效果和浏览器兼容
    使用JS进行动态标记添加,动画效果,表单验证,ajax请求
    使用JS实现了元素移动,页面加载事件添加,向后插入等模块方法

另外ajax请求设定为本地文件,因此在大部分浏览器中需要手动开启本地文件请求服务.在网站上线时即可解决,网站申请备案中.