import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import routes from './routes'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(VueRouter);
const router =new VueRouter({
  routes: routes,
  mode: 'history'
});
const store = new Vuex.Store({
  state: {
    isLoggedIn: false
  },
  mutations: {
    setIsLoggedIn(state){
      localStorage.setItem('isLoggedIn', true);
      state.isLoggedIn = true;
    },
    setIsLoggedOut(state){
      localStorage.setItem('isLoggedIn', false);
      state.isLoggedIn = false;
    },
    initialiseStore(state) {
      if (localStorage.getItem('isLoggedIn')) {
        state.isLoggedIn = true;
      }
    },
  }
})
new Vue({
  router,
  store: store,
  beforeCreate() { this.$store.commit('initialiseStore');},
  render : h=> h(App),
}).$mount("#app");
