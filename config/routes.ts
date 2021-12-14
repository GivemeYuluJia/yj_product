export default [
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/login',
        component: './Login',
      },
      {
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [
          {
            component: './404',
          },
        ],
      },
    ],
  },
];
