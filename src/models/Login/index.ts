import { Reducer, Effect } from 'umi';
import { login, getCurrentUser } from '@/services/login';
import { updateTag } from '@/pages/account/center/service';
import { imgListType, userInfoType } from '@/pages/Login/data';
import { updateCurrentUserInfo } from '@/pages/account/setting/service';

export interface LoginState {
  imgList: Array<imgListType>;
  userInfo: userInfoType;
  loading: boolean;
}

interface LoginModel {
  namespace: string;
  state: LoginState;
  effects: {
    login: Effect;
    getCurrentUser: Effect;
    updateTag: Effect;
    updateCurrentUserInfo: Effect;
  };
  reducers: {
    setUserInfo: Reducer;
  };
}

export const NAMESPACE = 'login';
const Model: LoginModel = {
  namespace: NAMESPACE,
  state: {
    imgList: [
      {
        id: '111',
        url: 'login.jpeg',
      },
      {
        id: '222',
        url: 'login6.jpeg',
      },
      {
        id: '333',
        url: 'login3.png',
      },
      {
        id: '444',
        url: 'login4.png',
      },
      {
        id: '555',
        url: 'login5.jpeg',
      },
    ],
    userInfo: {},
    loading: true,
  },
  effects: {
    *login({ payload: params }, { call, put }) {
      const res = yield call(login, { ...params });
      return res;
    },
    *getCurrentUser({ payload: params }, { call, put }) {
      const res = yield call(getCurrentUser, { ...params });
      const { data } = res;
      yield put({
        type: 'setUserInfo',
        payload: {
          userInfo: data,
          loading: false,
        },
      });
      return res;
    },
    *updateTag({ payload: params }, { call, put }) {
      const res = yield call(updateTag, { ...params });
      return res;
    },
    *updateCurrentUserInfo({ payload: params }, { call, put }) {
      const res = yield call(updateCurrentUserInfo, { ...params });
      const { data } = res;
      // yield put({
      //   type: 'setUserInfo',
      //   payload: {
      //     userInfo: data,
      //     loading: false,
      //   },
      // });
      return res;
    },
  },
  reducers: {
    setUserInfo(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
export default Model;
