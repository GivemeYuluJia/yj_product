export default [
  {
    path: '/account',
    name: '个人页面',
    icon: 'user',
    routes: [
      {
        path: '/account',
        redirect: '/account/center',
      },
      {
        path: '/account/center',
        name: '个人中心',
        component: '@/pages/account/center',
      },
      {
        path: '/account/setting',
        name: '个人设置',
        component: '@/pages/account/setting',
      },
    ],
  },
];
