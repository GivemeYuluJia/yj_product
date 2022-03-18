import ProLayout, {
  PageLoading,
  PageContainer,
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
} from '@ant-design/pro-layout';
import React, { useState, useEffect, useRef } from 'react';
import { history, connect, Link, Dispatch } from 'umi';
import { ConfigProvider, message } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import logo from '@/assets/Layout/logo.png';
import RightContent from '@/components/RightContent';
import { userInfoType } from '@/pages/Login/data';
import { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { SchoolInfoType } from '@/pages/home/school/data';
import { MenuListType } from '../models/Menu';
import { IconMap } from '@/components/IconMap';

interface BasicLayoutProps extends ProLayoutProps {
  userInfo: userInfoType;
  settings: LayoutSettings & {
    pwa?: boolean;
    logo?: string;
  };
  menuList: Array<MenuListType>;
  schoolInfo: SchoolInfoType;
  dispatch: Dispatch;
}
const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const { userInfo, settings, menuList, schoolInfo, dispatch, children } =
    props;

  const menDateRef = useRef<MenuDataItem[]>([]);

  useEffect(() => {
    if (!userInfo.id) {
      dispatch({ type: 'login/getCurrentUser' });
    }
    if (!schoolInfo.schoolName) {
      dispatch({ type: 'school/getSchoolInfo' }).catch((err: any) => {
        message.error(err.status);
      });
    }
    dispatch({ type: 'menu/getMenuList' });
  }, []);
  const loopMenuItem = (menus: MenuListType[]): any =>
    menus.map(({ icon, children, ...item }) => ({
      ...item,
      icon: icon && IconMap[icon as string],
      routes: children && loopMenuItem(children),
    }));

  const hasPageContent = () => {
    return (
      props.location?.pathname !== '/home/school' &&
      props.location?.pathname !== '/workplace/outgoing-registration-form' &&
      props.location?.pathname !== '/payment/campusCard'
    );
  };
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
        rightContentRender={() => <RightContent />}
        disableContentMargin={false}
        disableMobile={false}
        onMenuHeaderClick={() => history.push(`/`)}
        menuItemRender={(menuItemProps, defaultDom) => {
          // console.log(menuItemProps, defaultDom,'render')
          if (menuItemProps.isUrl || !menuItemProps.path) {
            return defaultDom;
          }
          return <Link to={menuItemProps.path}>- {defaultDom}</Link>;
        }}
        postMenuData={(menuData) => {
          // console.log(menuData,'123')
          menDateRef.current = menuData || [];
          return loopMenuItem(menuList || []) || [];
        }}
      >
        {hasPageContent() ? (
          <PageContainer
            ghost
            header={{
              title: null,
              onBack: () => null,
            }}
          >
            {children}
          </PageContainer>
        ) : (
          children
        )}
      </ProLayout>
    </ConfigProvider>
  );
};
export default connect(({ login, menu, school }: any) => ({
  userInfo: login.userInfo,
  settings: menu.settings,
  menuList: menu.menuList,
  schoolInfo: school.schoolInfo,
}))(BasicLayout);
