import React, { useEffect, useState } from 'react';
import { message, Modal, Form, Input, Button } from 'antd';
import ProForm, { ProFormRadio } from '@ant-design/pro-form';
import { connect } from 'umi';
import styles from './index.less';

interface payType {
  schoolId: number;
  addCampusCardOrder: (params: { schoolId: number; payMoney: number }) => any;
  payCampusCard: (params: any) => any;
}

const CampusCardPay: React.FC<payType> = (props) => {
  const { schoolId, addCampusCardOrder, payCampusCard } = props;
  const [visiable, setVisiable] = useState(false);
  const [warnVisiable, setWarnVisiable] = useState(false);
  const [submitLoading, setSubmitLoding] = useState(false);
  const [money, setMoney] = useState(0);
  const [form] = Form.useForm();
  const handleFinish = (val: any) => {
    if ('money' in val) {
      setMoney(val.money);
      setVisiable(true);
    } else {
      message.warning('请选择金额!');
    }
  };
  const handleSubmit = async (val: any) => {
    if (val.password) {
      // money password schoolId
      setSubmitLoding(true);
      const payres = await payCampusCard({
        password: val.password,
        schoolId,
        payMoney: money,
      });
      if (payres.status === 500) {
        message.warning(payres.errMsg);
        setSubmitLoding(false);
        return;
      }
      message.success('充值成功');
      form.setFieldsValue({
        password: undefined,
      });
      setVisiable(false);
      setSubmitLoding(false);
    } else {
      message.warning('请输入密码');
    }
  };
  const handleCancel = () => {
    setWarnVisiable(true);
  };
  const handleCancelOrder = async () => {
    const res = await addCampusCardOrder({
      schoolId,
      payMoney: money,
    });
    form.setFieldsValue({
      password: undefined,
    });
    if (res.status === 500) {
      message.warning(res.errMsg);
    } else {
      message.success('支付已取消');
    }
    setSubmitLoding(false);
    setWarnVisiable(false);
    setVisiable(false);
  };

  return (
    <div className={styles.payForm}>
      <h2 className={styles.title}>充值金额</h2>
      <ProForm onFinish={(e) => handleFinish(e)}>
        <ProFormRadio.Group
          name="money"
          radioType="button"
          options={[
            {
              label: 10,
              value: 10,
            },
            {
              label: 20,
              value: 20,
            },
            {
              label: 30,
              value: 30,
            },
            {
              label: 50,
              value: 50,
            },
            {
              label: 100,
              value: 100,
            },
          ]}
        />
      </ProForm>
      <Modal
        className="order-modal"
        visible={visiable}
        onCancel={() => handleCancel()}
        footer={null}
        title="充值订单"
      >
        <Form
          className="sumbmit-order-form"
          onFinish={handleSubmit}
          form={form}
          layout="inline"
        >
          <Form.Item name="password">
            <Input.Password placeholder="输入密码" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" loading={submitLoading}>
              确认
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        closable={false}
        visible={warnVisiable}
        onOk={() => handleCancelOrder()}
        onCancel={() => {
          setWarnVisiable(false);
        }}
        title="提示"
      >
        <p>请确定要取消订单么</p>
      </Modal>
    </div>
  );
};

export default connect(
  () => ({}),
  (dispatch) => ({
    addCampusCardOrder: (params: any) =>
      dispatch({ type: `campusCardOrder/addCampusCardOrder`, payload: params }),
    payCampusCard: (params: any) =>
      dispatch({ type: `campusCardOrder/payCampusCard`, payload: params }),
  }),
)(CampusCardPay);
