import { Reducer, Effect } from 'umi';

import { getSchoolScore } from './service';

interface scoreSearchState {
  scoreList: [];
}
interface scoreSearchModel {
  namespace: string;
  state: scoreSearchState;
  effects: {
    getSchoolScore: Effect;
  };
  reducers: {
    setScoreList: Reducer;
  };
}
export const NAMESPACE = 'score';
const Model: scoreSearchModel = {
  namespace: NAMESPACE,
  state: {
    scoreList: [],
  },
  effects: {
    *getSchoolScore({ payload: params }, { call, put }) {
      const res = yield call(getSchoolScore, params);
      yield put({
        type: 'setScoreList',
        payload: {
          scoreList: res.data,
        },
      });
      return res;
    },
  },
  reducers: {
    setScoreList(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
export default Model;
