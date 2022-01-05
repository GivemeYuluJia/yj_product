import { Effect, Reducer } from 'umi';
import { SchoolInfoType } from '@/pages/home/school/data';
import { getSchoolInfo } from '@/services/School';

type SchoolState = {
  schoolInfo: SchoolInfoType;
};
interface SchoolModel {
  namespace: string;
  state: SchoolState;
  effects: {
    getSchoolInfo: Effect;
  };
  reducers: {
    setSchoolInfo: Reducer;
  };
}
export const NAMESPACE = 'school';

const Model: SchoolModel = {
  namespace: NAMESPACE,
  state: {
    schoolInfo: {},
  },
  effects: {
    *getSchoolInfo({}, { call, put }) {
      const res = yield call(getSchoolInfo);
      const { data } = res;
      yield put({
        type: 'setSchoolInfo',
        payload: {
          schoolInfo: data,
        },
      });
      return res;
    },
  },
  reducers: {
    setSchoolInfo(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
export default Model;
