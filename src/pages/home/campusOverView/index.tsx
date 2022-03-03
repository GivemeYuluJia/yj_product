import react, { useState, useLayoutEffect, useRef } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Menu } from 'antd';
import { Info } from './const';
import About from './components/About';
import Achievement from './components/Achievement';
import Badge from './components/Badge';
import styles from './index.less';

type OverViewsStateKeys = 'about' | 'badge' | 'achievement';
type OverViewsState = {
  mode: 'inline' | 'horizontal';
  selectKey: OverViewsStateKeys;
};

const CampusOverView = () => {
  const menuMap: Record<string, React.ReactNode> = {
    overViews: '校园总览',
    about: '校园简介',
    badge: '校徽校训',
    achievement: '校园荣誉',
  };
  const [initConfig, setInitConfig] = useState<OverViewsState>({
    mode: 'inline',
    selectKey: 'about',
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
      setInitConfig({ ...initConfig, mode: mode as OverViewsState['mode'] });
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

  const getMenuItem = () => {
    return Object.keys(menuMap).map((item) => (
      <Menu.Item disabled={item === 'overViews'} key={item}>
        {menuMap[item]}
      </Menu.Item>
    ));
  };
  const renderChildren = () => {
    const { selectKey } = initConfig;
    const overViewsInfo = Info[selectKey];
    const props = {
      info: overViewsInfo,
    };
    switch (selectKey) {
      case 'about':
        return <About {...props} />;
      case 'badge':
        return <Badge {...props} />;
      case 'achievement':
        return <Achievement {...props} />;
      default:
        return null;
    }
  };

  return (
    <GridContent>
      <div
        className={styles.overViews}
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
                selectKey: key as OverViewsStateKeys,
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
export default CampusOverView;
