import { Reducer, Effect } from 'umi';
import { MomentType } from '../data';
import { getMomentList } from '../service';
export const NAMESPACE = 'account';
interface AccountState {
  momentList: Array<MomentType>;
}
interface AccountModel {
  namespace: string;
  state: AccountState;
  effects: {
    getMomentList: Effect;
  };
  reducers: {
    setMomentList: Reducer;
  };
}
const Model: AccountModel = {
  namespace: NAMESPACE,
  state: {
    momentList: [],
  },
  effects: {
    *getMomentList({ payload: params }, { call, put }) {
      const res = yield call(getMomentList);
      const { data } = res;
      yield put({
        type: 'setMomentList',
        payload: {
          momentList: data,
        },
      });
      return data;
    },
  },
  reducers: {
    setMomentList(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
export default Model;
