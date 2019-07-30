// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import vConsole from 'vconsole'
import Es6Promise from 'es6-promise'
Es6Promise.polyfill(); //使用polyfill()来执行es6代码
import fastclick from 'fastclick'
fastclick.attach(document.body) //消除点击延时提高程序的运行效率
axios.defaults.withCredentials = true //解决跨域问题
import store from './store'
import vuePicturePreview from 'vue-picture-preview' //图片预览插件
Vue.use(vuePicturePreview)
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/css/my-mint.scss'//核心，多了这一行用上边的样式覆盖默认的primary颜
Vue.use(MintUI);

Vue.config.productionTip = false
Vue.prototype.axios = axios

// 本地环境
global.API = "http://218.91.205.26:8066/znMobileWeb/front"//本地
global.Base = "http://218.91.205.26:8066/znMobileWeb"
// global.API = "http://218.91.205.26:8066/znMobileWeb/front"//15
// global.API = "http://218.91.205.42:8066/znMobileWeb/front"//24
// global.API = "http://localhost:8080/znMobileWeb/front"//测试

// 图片地址
global.BashImgUrl = "http://218.91.205.26:8066/znMobileWeb/"//15
// global.BashImgUrl = "http://218.91.205.42:8066/znMobileWeb/"//24


// global.API = "http://cdmptest.tunnel.echomod.cn/upesn/front"
// global.BashImgUrl = "http://cdmptest.tunnel.echomod.cn/upesn/"
//测试环境
// global.API = "http://172.22.176.5:8080/upesn/front"
//
// global.BashImgUrl = "http://172.22.176.5:8080/upesn/"

//global.BashImgUrl = "http://125.35.5.235/upesn/"


global.code = ''
global.fileurl = 'http://172.10.10.140:9400/'//文件服务器地址
global.imageurl = 'http://znmdm.zhongnangroup.cn:8081/'//文件服务器地址
global.bagPk='' //空:全部分类  有值：专项
global.userid=''
global.newsFlag = 0; //公共提示角标标志
//获取cookies的通用方法
global.getCookie=function(name) {
  var cookies = document.cookie.split(";");
  for(var i=0;i<cookies.length;i++) {
    var cookie = cookies[i];
    var cookieStr = cookie.split("=");
    if(cookieStr && cookieStr[0].trim()==name) {
      return decodeURI(cookieStr[1]);
    }
  }
};


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
