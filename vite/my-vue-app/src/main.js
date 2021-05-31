import { createApp } from 'vue'
import App from './App.vue'
import { Button, Table, Input, Popconfirm } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import '../src/mock/mock'
createApp(App)
  .use(Button)
  .use(Table)
  .use(Input)
  .use(Popconfirm)
  .mount('#app')
