import React, { useEffect, useState } from 'react';
import { Radio, Form, Button, message, Spin, Carousel } from 'antd';
import { NAMESPACE } from '@/models/Login';
import Item from './item';
import { connect, history } from 'umi';

import './index.less';

const Login = (props) => {
  const [form] = Form.useForm();
  const { imgList, userInfo, login, getCurrentUser } = props;
  const [pageLoading, setPageLoading] = useState(false);
  const [loginType, setLoginType] = useState('account');

  useEffect(() => {
    if (userInfo.id) {
      console.log('//////');
      if (!history) return;
      const { query } = history.location;
      const { redirect } = query as { redirect: string };
      history.push(redirect || '/');
      return;
    }
  }, []);

  const handleChange = (el) => {
    setLoginType(el.target.value);
    form.setFieldsValue({
      studentId: undefined,
      password: undefined,
      phone: undefined,
      code: undefined,
    });
  };
  const handleSubmit = (e) => {
    form.validateFields().then(async (val) => {
      setPageLoading(true);
      if (loginType === 'account') {
        const { studentId, password } = val;
        let res = await login({ studentId, password });
        console.log(res, 'rr');
        if (res.status === 'ok') {
          if ('data' in res) {
            const { data = '' } = res;
            localStorage.setItem('token', data);
          }
          //gai update
          const token = localStorage.getItem('token');
          const user = await getCurrentUser({ token });
          if (user.status === 'ok') {
            if (!history) return;
            const { query } = history.location;
            const { redirect } = query as { redirect: string };
            history.push(redirect || '/');
            return;
          } else {
            message.error(res.status + 'token');
          }
        } else {
          message.error(res.status);
        }
      } else if (loginType === 'verification') {
        message.success('功能还在完善中');
      }
      setPageLoading(false);
      console.log(userInfo, 'uuuuu');
    });
  };
  console.log(props, 'props');
  return (
    <>
      {pageLoading && <Spin className="login-spin" />}
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
              <Radio.Button value="account">帐号密码登陆</Radio.Button>
              <Radio.Button value="verification">验证码登陆</Radio.Button>
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
const mapDispatchToProps = (dispatch: any) => ({
  login: (params: object) =>
    dispatch({ type: `${NAME_SPACE}/login`, payload: params }),
  getCurrentUser: (params) =>
    dispatch({ type: `${NAME_SPACE}/getCurrentUser`, payload: params }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
