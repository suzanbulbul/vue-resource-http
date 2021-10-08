import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);

Vue.http.options.root = ("https://vuejs-vue-resource-7e4de-default-rtdb.firebaseio.com");

Vue.http.interceptors.push((resquest, next) => {
  next(responce => {
    responce.json = () => {
      return {
        userList: responce.body
      }
    }
  });
});

new Vue({
  el: '#app',
  render: h => h(App)
})
