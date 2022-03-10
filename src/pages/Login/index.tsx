import React, { useEffect, useState } from 'react';
import { Radio, Form, Button, message, Spin, Carousel } from 'antd';
import { NAMESPACE } from '@/models/Login';
import Item from './item';
import { connect, history } from 'umi';
import { imgListType, userInfoType } from './data';

import './index.less';

interface LoginProps {
  imgList: Array<imgListType>;
  userInfo: userInfoType;
  login: (parmas: any) => any;
  getCurrentUser: (parmas?: any) => any;
}

const Login: React.FC<LoginProps> = (props) => {
  const [form] = Form.useForm();
  const { imgList, userInfo, login, getCurrentUser } = props;
  const [pageLoading, setPageLoading] = useState(true);
  const [loginType, setLoginType] = useState('account');

  useEffect(() => {
    setPageLoading(false);
    console.log(props, 'effect');
    if (localStorage.getItem('yjtoken')) {
      if (!history) return;
      const { query } = history.location;
      const { redirect } = query as { redirect: string };
      history.push(redirect || '/');
      return;
    }
  }, []);
  console.log(props, 'login props');
  const handleChange = (el) => {
    setLoginType(el.target.value);
    form.setFieldsValue({
      accountId: undefined,
      password: undefined,
      phone: undefined,
      code: undefined,
    });
  };
  const handleSubmit = (e: React.ChangeEvent<HTMLButtonElement>) => {
    form.validateFields().then(async (val) => {
      setPageLoading(true);
      if (loginType === 'account') {
        const { accountId, password } = val;
        let res = await login({ accountId, password });
        console.log(res, 'rr');
        if (res.status === 200) {
          if ('data' in res) {
            const { data } = res;
            localStorage.setItem('token', data.token);
            localStorage.setItem('yjtoken', 'majundasha');
          }
          //gai update
          //   const token = localStorage.getItem('token');
          const user = await getCurrentUser();
          if (user.status === 200) {
            if (!history) return;
            const { query } = history.location;
            const { redirect } = query as { redirect: string };
            history.push(redirect || '/');
            return;
          } else {
            message.error(res.status + 'yjtoken');
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
  getCurrentUser: (params: any) =>
    dispatch({ type: `${NAME_SPACE}/getCurrentUser`, payload: params }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
