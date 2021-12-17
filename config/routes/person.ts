export default [
  {
    path: '/person',
    name: '个人页面',
    icon: 'smile',
    routes: [
      {
        path: '/person',
        redirect: '/person/setting',
      },
      {
        path: '/person/setting',
        name: '个人设置',
        component: '@/pages/person/person-setting',
      },
    ],
  },
];
