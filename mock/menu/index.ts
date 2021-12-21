import { Request, Response } from 'express';

const menuList = [
  {
    path: '/account',
    name: '个人页面',
    icon: 'smile',
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
    const menu = JSON.parse(JSON.stringify(menuList));
    res.send({
      status: 'ok',
      data: menu,
    });
  },
};
