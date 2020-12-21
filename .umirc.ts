import { defineConfig } from 'umi';

export default defineConfig({
    analytics: {
        ga: '',
        baidu: '',
    },
    hash: true,
    nodeModulesTransform: {
        type: 'none',
    },
    routes: [
        {
            path: '/',
            component: '@/pages/index',
            exact: true,
        },
    ],
});
