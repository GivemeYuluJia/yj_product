import { Reducer, Effect } from 'umi';
import Settings from '../../../config/defaultSettings';
import { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { getMenuList } from '@/services/Menu';

export type MenuListType = {
  path?: string;
  name?: string;
  icon?: string;
  children?: Array<MenuListType>;
};
interface MenuState {
  settings: LayoutSettings & {
    pwa?: boolean;
    logo?: string;
  };
  menuList: Array<MenuListType>;
}
interface MenuModel {
  namespace: string;
  state: MenuState;
  effects: {
    getMenuList: Effect;
  };
  reducers: {
    setMenuList: Reducer;
  };
}
export const NAMESPACE = 'menu';
const Model: MenuModel = {
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
