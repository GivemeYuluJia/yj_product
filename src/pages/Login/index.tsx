import React, { useEffect, useState } from 'react';
import { Radio, Form, Button, message, Spin, Carousel } from 'antd';
import { NAMESPACE } from '@/models/Login';
import Item from './item';
import { connect } from 'umi';

import './index.less';
const contentStyle = {
  height: '100%',
};
const Login = (props) => {
  const [form] = Form.useForm();
  const { imgList } = props;
  const [pageLoading, setPageLoading] = useState(false);
  const [loginType, setLoginType] = useState('studentId');

  const handleChange = (el) => {
    setLoginType(el.target.value);
  };
  const handleSubmit = (e) => {
    console.log(e, 'e');
  };
  console.log(props, 'props');
  return (
    <>
      {pageLoading && <Spin />}
      <div className="login-container">
        <Carousel className="login-swiper" autoplay>
          {imgList.length > 0 &&
            imgList.map((item: any, index: number) => (
              <div key={index + item.id}>
                <div
                  style={{
                    height: '100%',
                    backgroundImage: `url(${require('@/assets/' + item.url)})`,
                    backgroundSize: 'cover',
                  }}
                />
              </div>
            ))}
        </Carousel>
        <div className="login-content">
          <div className="login-title">
            <div className="login-logo">校园xx</div>
          </div>
          <div className="form-group">
            <Radio.Group
              className="login-radio"
              onChange={(el) => handleChange(el)}
              value={loginType}
            >
              <Radio.Button value="studentId">帐号密码登陆</Radio.Button>
              <Radio.Button value="phone">验证码登陆</Radio.Button>
            </Radio.Group>
            <Form form={form} onFinish={(e) => handleSubmit(e)}>
              <Item type={loginType} form={form} />
              <Form.Item className="login-btn">
                <Button htmlType="submit" type="primary">
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className="login-footer">©</div>
      </div>
    </>
  );
};
const NAME_SPACE = NAMESPACE;
const mapStateToProps = (state: any) => {
  const { imgList, userInfo } = state[NAME_SPACE];
  return {
    imgList,
    userInfo,
  };
};

export default connect(mapStateToProps)(Login);
