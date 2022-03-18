export default [
  {
    path: '/payment',
    name: '充值页',
    icon: 'pay',
    routes: [
      {
        path: '/payment',
        redirect: '/payment/campusCard',
      },
      {
        path: '/payment/campusCard',
        name: '校园卡充值',
        component: './payment/campusCard',
      },
    ],
  },
];
