import ProLayout, { PageLoading, PageContainer } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (!userInfo.id) {
      dispatch({ type: 'login/getCurrentUser' });
    }
    dispatch({ type: 'menu/getMenuList' });
  }, []);
  const loopMenuItem = (menus) =>
    menus.map(({ icon, routes, ...item }) => ({
      ...item,
      icon: icon && IconMap[icon as string],
      routes: routes && loopMenuItem(routes),
    }));
  console.log(props, 'mmmm');
  return (
    <ConfigProvider locale={zhCN}>
      <ProLayout
        {...settings}
        headerTheme="light"
        menu={{
          request: () =>
            loopMenuItem([
              {
                path: '/person',
                name: '个人页面',
                icon: 'smile',
                routes: [
                  {
                    path: '/person/setting',
                    name: '个人设置',
                    component: './Person/Setting',
                  },
                ],
              },
            ]),
        }}
        disableContentMargin={false}
        disableMobile={false}
        onMenuHeaderClick={() => history.push(`/`)}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl || !menuItemProps.path) {
            return defaultDom;
          }
          return <Link to={menuItemProps.path}>- {defaultDom}</Link>;
        }}

        // postMenuData={(menuData) => {
        //     console.log(menuData,'ddd')
        //     return loopMenuItem(menuList || []) || []
        // }}
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
