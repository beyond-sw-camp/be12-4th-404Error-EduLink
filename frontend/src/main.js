import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import router from './router'
import axios from 'axios';
import 'flowbite';
import 'vue-cal/dist/vuecal.css';

//백엔드 주소 설정
// axios.defaults.baseURL = "http://localhost:8080";
// axios.defaults.withCredentials = true;

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);
app.use(pinia);
app.use(router)

app.mount("#app")