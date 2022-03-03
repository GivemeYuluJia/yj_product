import { Reducer, Effect } from 'umi';
import { outgoingQeuestFormListType } from './data';
import { initiateOutGoingForm, getOutGoingFormList } from './service';

interface outgoingRegistrationFormState {
  outgoingQeuestFormList: outgoingQeuestFormListType[];
  loading: boolean;
}
interface outgoingRegistrationFormModel {
  namespace: string;
  state: outgoingRegistrationFormState;
  effects: {
    initiateOutGoingForm: Effect;
    getOutGoingFormList: Effect;
  };
  reducers: {
    setOutgoingQeuestFormList: Reducer;
  };
}
export const NAMESPACE = 'outgoing-registration-form';
const Model: outgoingRegistrationFormModel = {
  namespace: NAMESPACE,
  state: {
    outgoingQeuestFormList: [],
    loading: false,
  },
  effects: {
    *initiateOutGoingForm({ payload: params }, { call, put }) {
      const res = yield call(initiateOutGoingForm, params);

      return res;
    },
    *getOutGoingFormList({}, { call, put }) {
      const res = yield call(getOutGoingFormList);
      const { data } = res;
      yield put({
        type: 'setOutgoingQeuestFormList',
        payload: {
          outgoingQeuestFormList: data.FormList,
          loading: true,
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
  },
};
export default Model;
