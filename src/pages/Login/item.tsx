import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

import './index.less';

const Item = (props) => {
  const { type, form } = props;
  const [timeContral, setTimeContral] = useState(-1);
  const [btnloading, setBtnloading] = useState(false);

  const validatePhone = (rule, value, callback) => {
    if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(value) || !value) {
      callback('请输入正确的手机号!');
    }
    callback();
  };
  const pushCode = () => {
    console.log('222');
    form.validateFields(['phone']).then((value) => {
      setBtnloading(true);
      message.success('验证码发送成功');

      setTimeContral(
        (state) =>
          // state = 60;
          17,
      );

      new Promise((resolve) => resolve(1))
        .then((res) => {
          const timer = setInterval(() => {
            // const num = timeContral - 1
            console.log(res, '123', timeContral);
            setTimeContral((state) => {
              // state -= 1;
              if (state === 0) {
                clearInterval(timer);
              }
              console.log(state, 'async');
              return state - 1;
            });
            console.log(timeContral, '111');
          }, 1000);
        })
        .finally(() => {
          setBtnloading(false);
        });
    });
  };
  const itemType = {
    account: () => (
      <>
        <Form.Item
          className="login-input"
          name="studentId"
          rules={[{ required: true, message: '请输入用户校园学号!' }]}
        >
          <Input
            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="请输入校园学号"
          />
        </Form.Item>
        <Form.Item
          className="login-input"
          name="password"
          rules={[{ required: true, message: '请输入用户密码!' }]}
        >
          <Input
            prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="请输入密码"
            type="password"
          />
        </Form.Item>
      </>
    ),
    verification: () => (
      <>
        <Form.Item
          className="login-input"
          name="phone"
          rules={[{ validator: validatePhone }]}
        >
          <Input
            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="请输入手机号"
          />
        </Form.Item>
        <Row className="login-row">
          <Form.Item
            className="login-input input-verify"
            name="code"
            rules={[{ required: true, message: '请输入验证码!' }]}
          >
            <Input
              prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              autoComplete="off"
              placeholder="请输入验证码"
            />
          </Form.Item>
          <Button
            className="btn-verify"
            name="verify"
            loading={btnloading}
            disabled={timeContral > 0}
            onClick={() => pushCode()}
          >
            {timeContral >= 0 ? (
              <span className="sp-verify">({timeContral})s后重新发送</span>
            ) : (
              '发送验证码'
            )}
          </Button>
        </Row>
      </>
    ),
  };

  return <>{itemType[type]()}</>;
};
export default Item;
