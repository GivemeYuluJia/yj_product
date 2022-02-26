export default [
  {
    path: '/activity',
    name: '活动页',
    icon: 'fire',
    routes: [
      {
        path: '/activity',
        redirect: '/activity/campusActivity',
      },
      {
        path: '/activity/campusActivity',
        name: '校园活动',
        component: './activity/campusActivity',
      },
      {
        name: '活动详情',
        path: '/activity/campusActivity/detail/:detailid?',
        component: './activity/campusActivity/detail/index.tsx',
      },
    ],
  },
];
