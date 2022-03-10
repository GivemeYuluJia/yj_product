import { defineConfig } from 'umi';
import routes from './routes';
import proxy from './proxy';
import defaultSettings from './defaultSettings';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  dva: {
    immer: true,
    hmr: false,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  //   layout: {
  //     locale: true,
  //     siderWidth: 208,
  //     ...defaultSettings,
  //   },
  routes,
  proxy: {
    '/api2': {
      target: 'http://localhost:7001',
      ChangeOrigin: true,
    },
  },
  fastRefresh: {},
});
