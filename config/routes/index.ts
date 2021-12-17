import person from './person';
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
          { path: '/', redirect: '/person' },
          ...person,

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
