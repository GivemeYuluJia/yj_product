import ProLayout, {
  PageLoading,
  PageContainer,
  MenuDataItem,
} from '@ant-design/pro-layout';
import React, { useState, useEffect, useRef } from 'react';
import { history, connect, Link } from 'umi';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import logo from '@/assets/Layout/logo.png';
import { SmileOutlined, HeartOutlined } from '@ant-design/icons';

const IconMap = {
  smile: <SmileOutlined />,
  heart: <HeartOutlined />,
};

const BasicLayout: React.FC = (props) => {
  const { userInfo, settings, menuList, dispatch, children } = props;

  const menDateRef = useRef<MenuDataItem[]>([]);

  useEffect(() => {
    if (!userInfo.id) {
      dispatch({ type: 'login/getCurrentUser' });
    }
    dispatch({ type: 'menu/getMenuList' });
  }, []);
  const loopMenuItem = (menus) =>
    menus.map(({ icon, children, ...item }) => ({
      ...item,
      icon: icon && IconMap[icon as string],
      routes: children && loopMenuItem(children),
    }));
  console.log(props, 'mmmm');
  return (
    <ConfigProvider locale={zhCN}>
      <ProLayout
        {...props}
        {...settings}
        headerTheme="light"
        // menu={{
        //   request: () =>
        //     loopMenuItem([
        //       {
        //         path: '/person',
        //         name: '个人页面',
        //         icon: 'smile',
        //         children: [
        //           {
        //             path: '/person/setting',
        //             name: '个人设置',
        //           },
        //           {
        //             path: '/person/inter',
        //             name: '个人信息',
        //           }
        //         ],
        //       },
        //     ]),
        // }}
        disableContentMargin={false}
        disableMobile={false}
        onMenuHeaderClick={() => history.push(`/`)}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl || !menuItemProps.path) {
            return defaultDom;
          }
          return <Link to={menuItemProps.path}>- {defaultDom}</Link>;
        }}
        postMenuData={(menuData) => {
          menDateRef.current = menuData || [];
          return loopMenuItem(menuList || []) || [];
        }}
      >
        <PageContainer
          ghost
          header={{
            title: null,
            onBack: () => null,
          }}
        >
          {children}
        </PageContainer>
      </ProLayout>
    </ConfigProvider>
  );
};
export default connect(({ login, menu }) => ({
  userInfo: login.userInfo,
  settings: menu.settings,
  menuList: menu.menuList,
}))(BasicLayout);
