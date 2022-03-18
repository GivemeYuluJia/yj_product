import React, { useEffect, useState } from 'react';
import {
  Card,
  Radio,
  List,
  Progress,
  Dropdown,
  Modal,
  Menu,
  Input,
  Form,
  message,
} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { connect } from 'umi';
import moment from 'moment';
import { OrderListType } from '../../data';
import './index.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const modalContext = (form: any) => (
  <Form className="sumbmit-order-form" form={form} layout="inline">
    <Form.Item name="password">
      <Input.Password placeholder="输入密码" />
    </Form.Item>
  </Form>
);
const CampusPaymentList = (props: any) => {
  const {
    orderList,
    loading,
    total,
    pageSize,
    pageNum,
    username,
    userId,
    getCampusCardOrdersList,
    delCampusCardOrder,
    payCampusCard,
  } = props;
  const [orderType, setOrderType] = useState(10);
  const [form] = Form.useForm();

  useEffect(() => {
    getCampusCardOrdersList({
      pageNum: 1,
      pageSize,
      isPayed: orderType,
    });
  }, [orderType]);

  const editOrder = (type: string, item: any) => {
    if (type === 'pay') {
      Modal.confirm({
        title: '支付订单',
        content: modalContext(form),
        okText: '确认',
        cancelText: '取消',
        onOk: async () => {
          const val = form.getFieldsValue();
          if (val.password) {
            return new Promise(async (resolve, reject) => {
              const res = await payCampusCard({
                password: val.password,
                id: item.id,
              });

              setTimeout(() => {
                if (res.status === 200) {
                  message.success('支付成功');
                } else {
                  message.warning(res.errMsg);
                }
                form.setFieldsValue({
                  password: undefined,
                });
                window.location.reload();
                resolve(1);
              }, 1000);
            });
            // return new Promise((resolve, reject) => {
            //     setTimeout(() => {
            //         console.log(val.password, item.id)
            //     }, 1000)
            // }).then(res => {});
          } else {
            message.warning('密码为空');
          }
        },
      });
    } else if (type === 'delete') {
      Modal.confirm({
        title: '取消订单',
        content: '确定取消该订单吗吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: async () => {
          const result = await delCampusCardOrder({
            id: item.id,
          });
          if (result.status === 200) {
            message.success('取消成功');
          }
          window.location.reload();
        },
      });
    }
  };

  const MoreBtn: React.FC<{
    item: OrderListType;
  }> = ({ item }) => (
    <Dropdown
      overlay={
        <Menu onClick={({ key }) => editOrder(key, item)}>
          <Menu.Item key="pay">支付订单</Menu.Item>
          <Menu.Item key="delete">取消订单</Menu.Item>
        </Menu>
      }
    >
      <a>
        操作 <DownOutlined />
      </a>
    </Dropdown>
  );
  const ListContent = ({
    data: { createTime, userId, isPayed, id },
  }: {
    data: OrderListType;
  }) => (
    <div className="list-content">
      <div className="list-content-item">
        <span>Owner</span>
        <p>{userId === props.userId ? username : null}</p>
      </div>
      <div className="list-content-item">
        <span>开始时间</span>
        <p>{moment(createTime).format('YYYY-MM-DD HH:mm')}</p>
      </div>
      <div className="list-content-item">
        {isPayed ? (
          <Progress type="circle" percent={100} width={41} />
        ) : (
          <MoreBtn item={{ id }} />
        )}
      </div>
    </div>
  );

  const extraContent = (
    <div>
      <RadioGroup
        value={orderType}
        onChange={(e) => {
          setOrderType(e.target.value);
        }}
      >
        <RadioButton value={10}>全部</RadioButton>
        <RadioButton value={0}>未支付</RadioButton>
        <RadioButton value={1}>已支付</RadioButton>
      </RadioGroup>
    </div>
  );
  console.log(orderList, 'ooo');
  return (
    <div className="standard-list">
      <Card
        className="list-card"
        bordered={false}
        title="充值列表"
        style={{ marginTop: 24 }}
        bodyStyle={{ padding: '0 32px 40px 32px' }}
        extra={extraContent}
      >
        <List
          size="large"
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: pageSize,
            current: pageNum,
            total: total,
            onChange: (currentNum?: number, sizeNum?: number) => {
              getCampusCardOrdersList({
                pageNum: currentNum,
                pageSize: sizeNum,
                isPayed: orderType,
              });
            },
          }}
          dataSource={orderList}
          renderItem={(item: OrderListType) => (
            <List.Item>
              <List.Item.Meta
                // avatar={}
                title={`充值${item.payMoney}元`}
                description={
                  item.isPayed === 1
                    ? `订单编号${item.orderNumber}`
                    : `还未支付未产生订单编号`
                }
              />
              <ListContent data={item} />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default connect(
  ({ campusCardOrder }: any) => ({
    orderList: campusCardOrder.orderList,
    loading: campusCardOrder.listLoading,
    pageNum: campusCardOrder.pageNum,
    pageSize: campusCardOrder.pageSize,
    total: campusCardOrder.total,
  }),
  (dispatch) => ({
    getCampusCardOrdersList: (params: any) =>
      dispatch({
        type: 'campusCardOrder/getCampusCardOrdersList',
        payload: params,
      }),
    delCampusCardOrder: (params: any) =>
      dispatch({ type: 'campusCardOrder/delCampusCardOrder', payload: params }),
    payCampusCard: (params: any) =>
      dispatch({ type: `campusCardOrder/payCampusCard`, payload: params }),
  }),
)(CampusPaymentList);
