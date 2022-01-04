import React, { useLayoutEffect, useEffect, useState, useRef } from 'react';
import { connect } from 'umi';
import { Menu } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import BaseView from './components/BaseView';
import Security from './components/Security';
import Binding from './components/Binding';
import NotificationView from './components/NotificationView';

import styles from './index.less';

type SettingsStateKeys = 'base' | 'security' | 'binding' | 'notification';
type SettingsState = {
  mode: 'inline' | 'horizontal';
  selectKey: SettingsStateKeys;
};

const AccountSetting = (props: { getSecurityInfo: () => any }) => {
  const { getSecurityInfo } = props;
  const menuMap: Record<string, React.ReactNode> = {
    base: '基本设置',
    security: '安全设置',
    binding: '账号绑定',
    notification: '新消息通知',
  };

  const [initConfig, setInitConfig] = useState<SettingsState>({
    mode: 'inline',
    selectKey: 'base',
  });

  const dom = useRef<HTMLDivElement>();

  const resize = () => {
    requestAnimationFrame(() => {
      if (!dom.current) return;
      let mode: 'inline' | 'horizontal' = 'inline';
      const { offsetWidth } = dom.current;
      if (dom.current.offsetWidth < 641 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      if (offsetWidth <= 328) {
        mode = 'horizontal';
      }
      // console.log(window.innerWidth, 'w', offsetWidth)
      setInitConfig({ ...initConfig, mode: mode as SettingsState['mode'] });
    });
  };

  useLayoutEffect(() => {
    if (dom.current) {
      window.addEventListener('resize', resize);
      // resize()
    }
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [dom.current]);
  useEffect(() => {
    getSecurityInfo();
  }, []);
  const getMenuItem = () => {
    return Object.keys(menuMap).map((item) => (
      <Menu.Item key={item}>{menuMap[item]}</Menu.Item>
    ));
  };

  const renderChildren = () => {
    const { selectKey } = initConfig;
    switch (selectKey) {
      case 'base':
        return <BaseView />;
      case 'security':
        return <Security />;
      case 'binding':
        return <Binding />;
      case 'notification':
        return <NotificationView />;
      default:
        return null;
    }
  };

  return (
    <GridContent>
      <div
        className={styles.setting}
        ref={(ref) => {
          if (ref) {
            dom.current = ref;
          }
        }}
      >
        <div className={styles.leftMenu}>
          <Menu
            mode={initConfig.mode}
            selectedKeys={[initConfig.selectKey]}
            onClick={({ key }) => {
              setInitConfig({
                ...initConfig,
                selectKey: key as SettingsStateKeys,
              });
            }}
          >
            {getMenuItem()}
          </Menu>
        </div>
        <div className={styles.rightContent}>
          <div className={styles.title}>{menuMap[initConfig.selectKey]}</div>
          {renderChildren()}
        </div>
      </div>
    </GridContent>
  );
};
export default connect(
  () => ({}),
  (dispatch: any) => ({
    getSecurityInfo: () => dispatch({ type: 'accountSetting/getSecurityInfo' }),
  }),
)(AccountSetting);
