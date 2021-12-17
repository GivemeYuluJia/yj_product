import { defineConfig } from 'umi';
import routes from './routes';
import defaultSettings from './defaultSettings';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  dva: {
    immer: true,
    hmr: false,
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
  fastRefresh: {},
});
