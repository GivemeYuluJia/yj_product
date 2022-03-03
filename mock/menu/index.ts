import { Request, Response } from 'express';
import { userToken } from '../login';
const menuList = [
  {
    path: '/home',
    name: '首页',
    icon: 'home',
    children: [
      {
        path: '/home/school',
        name: '校园导航',
      },
      {
        path: '/home/campusOverView',
        name: '校园总览',
      },
      {
        path: '/home/campusNews',
        name: '校园新闻',
      },
      {
        path: '/home/campusBuilds',
        name: '校园建筑',
      },
    ],
  },
  {
    path: '/activity',
    name: '活动页',
    icon: 'fire',
    children: [
      {
        path: '/activity/campusActivity',
        name: '校园活动',
      },
    ],
  },
  {
    path: '/workplace',
    name: '工作台',
    icon: 'smile',
    children: [
      {
        path: '/workplace/outgoing-registration-form',
        name: '外出登记表',
      },
      // {
      //   path: '/account/setting',
      //   name: '个人设置',
      // },
    ],
  },
  {
    path: '/account',
    name: '个人页面',
    icon: 'user',
    children: [
      {
        path: '/account/center',
        name: '个人中心',
      },
      {
        path: '/account/setting',
        name: '个人设置',
      },
    ],
  },
];

export default {
  'POST /api/getMenuList': async (req: Request, res: Response) => {
    const { token } = req.headers;
    //校验token是否过期
    // if(...){
    //   res.send({
    //     status: 'token过期',
    //     success: false,
    //   })
    // }
    const menu = JSON.parse(JSON.stringify(menuList));
    res.send({
      status: 'ok',
      data: menu,
    });
  },
};
