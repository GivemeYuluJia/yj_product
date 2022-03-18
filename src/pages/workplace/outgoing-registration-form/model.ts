import { Reducer, Effect } from 'umi';
import { outgoingQeuestFormListType } from './data';
import {
  initiateOutGoingForm,
  getOutGoingFormList,
  getOutgoingFormDetail,
} from './service';

interface outgoingRegistrationFormState {
  outgoingQeuestFormList: outgoingQeuestFormListType[];
  outgoingQuestFormDetail: outgoingQeuestFormListType;
  initLoading: boolean;
  total: number;
  pageSize: number;
  pageNum: number;
}
interface outgoingRegistrationFormModel {
  namespace: string;
  state: outgoingRegistrationFormState;
  effects: {
    initiateOutGoingForm: Effect;
    getOutGoingFormList: Effect;
    getOutgoingFormDetail: Effect;
  };
  reducers: {
    setOutgoingQeuestFormList: Reducer;
    setOutgoingQuestFormDetail: Reducer;
  };
}
export const NAMESPACE = 'outgoing-registration-form';
const Model: outgoingRegistrationFormModel = {
  namespace: NAMESPACE,
  state: {
    outgoingQeuestFormList: [],
    outgoingQuestFormDetail: {},
    initLoading: true,
    total: 0,
    pageSize: 6,
    pageNum: 1,
  },
  effects: {
    *initiateOutGoingForm({ payload: params }, { call, put }) {
      const res = yield call(initiateOutGoingForm, params);

      return res;
    },
    *getOutGoingFormList({ payload: params }, { call, put }) {
      const res = yield call(getOutGoingFormList, params);
      const { data, total, pageSize, pageNum } = res.data;
      yield put({
        type: 'setOutgoingQeuestFormList',
        payload: {
          outgoingQeuestFormList: data,
          initLoading: false,
          total: total,
          pageSize: pageSize,
          pageNum: pageNum,
        },
      });
      return res;
    },
    *getOutgoingFormDetail({ payload: params }, { call, put }) {
      const res = yield call(getOutgoingFormDetail, params);
      const { data } = res;
      yield put({
        type: 'setOutgoingQuestFormDetail',
        payload: {
          outgoingQuestFormDetail: data,
        },
      });
      return res;
    },
  },
  reducers: {
    setOutgoingQeuestFormList(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    setOutgoingQuestFormDetail(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
export default Model;
