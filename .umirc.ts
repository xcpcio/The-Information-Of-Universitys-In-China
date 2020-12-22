import { defineConfig } from 'umi';
import { CONFIG } from './config';

export default defineConfig({
    analytics: CONFIG.analytics,
    hash: true,
    nodeModulesTransform: {
        type: 'none',
    },
    title: CONFIG.title,
    routes: [
        {
            path: '/',
            component: '@/pages/index',
            exact: true,
        },
    ],
    proxy: {
        '/data': {
            target: 'http://127.0.0.1:8080/',
            changeOrigin: true,
        },
    },
    publicPath: CONFIG.publicPath,
});
