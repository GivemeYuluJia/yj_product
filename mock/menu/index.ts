import { Request, Response } from 'express';

const menuList = [
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
