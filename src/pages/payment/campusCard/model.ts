import { Reducer, Effect } from 'umi';
import {
  addCampusCardOrder,
  payCampusCard,
  getCampusCardOrdersList,
  delCampusCardOrder,
} from './service';
import { OrderListType } from './data';

interface campusCardOrderState {
  orderList: OrderListType[];
  listLoading: boolean;
  pageNum: number;
  pageSize: number;
  total: number;
}
interface campusCardOrderModel {
  namespace: string;
  state: campusCardOrderState;
  effects: {
    addCampusCardOrder: Effect;
    payCampusCard: Effect;
    getCampusCardOrdersList: Effect;
    delCampusCardOrder: Effect;
  };
  reducers: {
    setOrderList: Reducer;
  };
}
export const NAMESPACE = 'campusCardOrder';
const Model: campusCardOrderModel = {
  namespace: NAMESPACE,
  state: {
    orderList: [],
    listLoading: true,
    pageNum: 1,
    pageSize: 6,
    total: 0,
  },
  effects: {
    *addCampusCardOrder({ payload: params }, { call, put }) {
      const res = yield call(addCampusCardOrder, params);
      return res;
    },
    *payCampusCard({ payload: params }, { call, put }) {
      const res = yield call(payCampusCard, params);
      return res;
    },
    *getCampusCardOrdersList({ payload: params }, { call, put }) {
      const res = yield call(getCampusCardOrdersList, params);
      const { data, total, pageSize, pageNum } = res.data;
      yield put({
        type: 'setOrderList',
        payload: {
          orderList: data,
          total,
          pageSize,
          pageNum,
          listLoading: false,
        },
      });
      return res;
    },
    *delCampusCardOrder({ payload: params }, { call, put }) {
      const res = yield call(delCampusCardOrder, params);
      return res;
    },
  },
  reducers: {
    setOrderList(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
export default Model;
