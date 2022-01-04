import { Reducer, Effect } from 'umi';
import { getSecurityInfo, updateNotification } from '../service';
import { SecurityInfoType } from '../data';

interface AccountSettingState {
  userSecurityInfo: SecurityInfoType;
}
interface AccountSettingModel {
  namespace: string;
  state: AccountSettingState;
  effects: {
    getSecurityInfo: Effect;
    updateNotification: Effect;
  };
  reducers: {
    setUserSecurityInfo: Reducer;
  };
}
export const NAMESPACE = 'accountSetting';
const Model: AccountSettingModel = {
  namespace: NAMESPACE,
  state: {
    userSecurityInfo: {},
  },
  effects: {
    *getSecurityInfo({ payload: params }, { call, put }) {
      const res = yield call(getSecurityInfo);
      const { data } = res;
      yield put({
        type: 'setUserSecurityInfo',
        payload: {
          userSecurityInfo: data,
        },
      });
      return res;
    },
    *updateNotification({ payload: params }, { call }) {
      const res = yield call(updateNotification, { ...params });
      return res;
    },
  },
  reducers: {
    setUserSecurityInfo(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
export default Model;
