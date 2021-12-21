import { login, getCurrentUser } from '@/services/login';
import { updateTag } from '@/pages/account/center/service';

export const NAMESPACE = 'login';
const Model = {
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
        },
      });
      return res;
    },
    *updateTag({ payload: params }, { call, put }) {
      const res = yield call(updateTag, { ...params });
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
