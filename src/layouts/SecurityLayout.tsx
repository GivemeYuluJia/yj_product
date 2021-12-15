import React, { useState, useEffect } from 'react';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect } from '_umi@3.5.20@umi';

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
