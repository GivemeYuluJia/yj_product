import Settings from '../../../config/defaultSettings';
import { getMenuList } from '@/services/Menu';

export const NAMESPACE = 'menu';
const Model = {
  namespace: NAMESPACE,
  state: {
    settings: Settings,
    menuList: [],
  },
  effects: {
    *getMenuList({}, { call, put }) {
      const res = yield call(getMenuList);
      yield put({
        type: 'setMenuList',
        payload: {
          menuList: res.data,
        },
      });
      return res;
    },
  },
  reducers: {
    setMenuList(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
export default Model;
