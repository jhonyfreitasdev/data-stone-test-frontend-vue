import { createApp } from 'vue';
import App from './App.vue';
import router from './router/route';
import store from './store/store';
import './assets/styles/reset.sass';

const app = createApp(App);

app.use(router);
app.use(store);

app.mount('#app');
