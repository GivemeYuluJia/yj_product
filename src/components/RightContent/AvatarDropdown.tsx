import React, { useCallback } from 'react';
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import { history, connect, Link, Dispatch } from 'umi';
import { userInfoType } from '@/pages/Login/data';
import HeaderDropdown from '../HeaderDropdown';
import { defaultAvatar } from '@/layouts/SecurityLayout';
import type { MenuInfo } from 'rc-menu/lib/interface';

import styles from './index.less';

export type GlobalHeaderRightProps = {
  menu?: boolean;
  userInfo?: userInfoType;
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({
  menu,
  userInfo,
}) => {
  const onMenuClick = useCallback((event: MenuInfo) => {
    const { key } = event;
    if (key === 'logout') {
      // setInitialState((s) => ({ ...s, currentUser: undefined }));
      // loginOut();
      return;
    }
    history.push(`/account/${key}`);
  }, []);
  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {!menu && (
        <Menu.Item key="center">
          <UserOutlined />
          个人中心
        </Menu.Item>
      )}
      {!menu && (
        <Menu.Item key="setting">
          <SettingOutlined />
          个人设置
        </Menu.Item>
      )}
      {!menu && <Menu.Divider />}

      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );
  const getAvatarURL = () => {
    if (userInfo) {
      if (userInfo.avatar) return userInfo.avatar;
      const url = defaultAvatar;
      return url;
    }
    return '';
  };

  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar
          size="small"
          className={styles.avatar}
          src={getAvatarURL()}
          alt="avatar"
        />
        <span className={`${styles.name} anticon`}>{userInfo?.username}</span>
      </span>
    </HeaderDropdown>
  );
};

export default connect(({ login }: any) => ({
  userInfo: login.userInfo,
  menu: login.loading,
}))(AvatarDropdown);
