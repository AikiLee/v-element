import { createApp } from 'vue'
import App from './App.vue'
import VElement  from '@leeburn/v-element'
import '@leeburn/v-element/dist/umd/index.css'
import '../.storybook/fontawesome'


createApp(App).use(VElement).mount('#app')