import React, { useState, useEffect } from 'react';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect } from 'umi';

//默认头像
export const defaultAvatar =
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F1110%252Fe3c10b37j00r2bj2l000nc000ci00cig.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643185170&t=a42f2f6a07d86d7a20321509bc9c6a8a';
interface SecurityLayoutState {
  isReady: boolean;
}
class SecurityLayout extends React.Component {
  state: SecurityLayoutState = {
    isReady: false,
  };
  componentDidMount() {
    this.setState({
      isReady: true,
    });
  }
  render() {
    const { isReady } = this.state;
    const { children } = this.props;
    const isLogin = localStorage.getItem('token');

    if (!isReady) return <PageLoading />;
    if (!isLogin && window.location.pathname !== '/login')
      return <Redirect to={`/login`} />;
    return children;
  }
}

export default SecurityLayout;
