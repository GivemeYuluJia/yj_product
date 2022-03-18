import account from './account';
import home from './home';
import activity from './activity';
import workplace from './workplace';
import payment from './payment';

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
          ...workplace,
          ...payment,
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
