import account from './account';
import home from './home';
import activity from './activity';

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
          { path: '/', redirect: '/home' },
          ...home,
          ...activity,
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
