import App from './components/App.js';

Vue.use(VueCodemirror);
const Main = {
  async init() {
    new Vue({
      el: '#app',
      render: (h) => h(App)
    });
  }
};

export default Main.init();
