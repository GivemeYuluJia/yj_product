export default [
  {
    path: '/home',
    name: '首页',
    icon: 'user',
    routes: [
      {
        path: '/home',
        redirect: '/home/school',
      },
      {
        path: '/home/school',
        name: '校园总览',
        component: './home/school',
      },
      // {
      //   path: '/home/school/FIT',
      //   component: './home/school/fit',
      // },
    ],
  },
];
