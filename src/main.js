import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI);


//引入样式
import 'highlight.js/styles/monokai-sublime.css'
//引入库
import his from 'highlight.js'
//创建指令
Vue.directive('highlight', function (el) {
  let blocks = el.querySelectorAll(' pre code');
  blocks.forEach((block) => {
    his.highlightAll(block)
  })
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
