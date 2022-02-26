import { Effect, Reducer } from 'umi';
import { SchoolInfoType } from '@/pages/home/school/data';
import {
  getSchoolInfo,
  getSchoolActivityList,
  getSchoolActivityItem,
  getSchoolNewsList,
} from '@/services/School';

type SchoolState = {
  schoolInfo: SchoolInfoType;
  schoolActivityList: any[];
  schoolActivityItem: any[];
  schoolNewsList: any[];
  loading: boolean;
};
interface SchoolModel {
  namespace: string;
  state: SchoolState;
  effects: {
    getSchoolInfo: Effect;
    getSchoolActivityList: Effect;
    getSchoolActivityItem: Effect;
    getSchoolNewsList: Effect;
  };
  reducers: {
    setSchoolInfo: Reducer;
    setSchoolActivityList: Reducer;
    setSchoolActivityItem: Reducer;
    setSchoolNewsList: Reducer;
    setLoading: Reducer;
  };
}
export const NAMESPACE = 'school';

const Model: SchoolModel = {
  namespace: NAMESPACE,
  state: {
    schoolInfo: {},
    schoolActivityList: [],
    schoolActivityItem: [],
    schoolNewsList: [],
    loading: true,
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
      res.success
        ? yield put({
            type: 'setLoading',
            payload: {
              loading: false,
            },
          })
        : null;
      return res;
    },
    *getSchoolActivityList({}, { call, put }) {
      const res = yield call(getSchoolActivityList);
      const { data } = res;
      yield put({
        type: 'setSchoolActivityList',
        payload: {
          schoolActivityList: data,
        },
      });
      return res;
    },
    *getSchoolActivityItem({ payload: params }, { call, put }) {
      const res = yield call(getSchoolActivityItem, params);
      const { data } = res;
      yield put({
        type: 'setSchoolActivityItem',
        payload: {
          schoolActivityItem: data,
        },
      });
      return res;
    },
    *getSchoolNewsList({}, { call, put }) {
      const res = yield call(getSchoolNewsList);
      const { data } = res;
      yield put({
        type: 'setSchoolNewsList',
        payload: {
          schoolNewsList: data,
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
    setSchoolActivityList(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    setSchoolActivityItem(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    setSchoolNewsList(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    setLoading(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
export default Model;
