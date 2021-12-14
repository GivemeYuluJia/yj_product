import React, { useEffect, useState } from 'react';
import { Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './index.less';

const Item = (props) => {
  const { type, form } = props;
  const itemType = {
    studentId: () => (
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
          />
        </Form.Item>
      </>
    ),
    phone: () => {
      <></>;
    },
  };

  return <>{itemType[type]()}</>;
};
export default Item;
