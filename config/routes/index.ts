import account from './account';
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
          { path: '/', redirect: '/account' },
          ...account,

          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
];
