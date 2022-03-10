export default [
  {
    path: '/workplace',
    name: '工作台',
    icon: 'smile',
    routes: [
      {
        path: '/workplace',
        redirect: '/workplace/outgoing-registration-form',
      },
      {
        path: '/workplace/outgoing-registration-form',
        name: '外出登记表',
        component: './workplace/outgoing-registration-form',
      },
      {
        path: '/workplace/outgoing-registration-form/:outgoingformid?',
        name: '外出登记表详情',
        component:
          './workplace/outgoing-registration-form/components/request-form-detail',
      },
      {
        path: '/workplace/scoreSearch',
        name: '成绩查询',
        component: './workplace/scoreSearch',
      },
    ],
  },
];
