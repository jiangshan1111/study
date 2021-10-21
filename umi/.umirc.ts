import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/404', component: '@/pages/index' },
    { path: '/login', component: '@/pages/login',title:'主页' },
  ],
  "sass": { }, ///配这里
  fastRefresh: {},
});
