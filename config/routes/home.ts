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
        name: '校园导航',
        component: './home/school',
      },
      {
        path: '/home/campusOverView',
        name: '校园总览',
        component: './home/campusOverView',
      },
      {
        path: '/home/campusNews',
        name: '校园新闻',
        component: './home/campusNews',
      },
      {
        path: '/home/campusNews/:newsdetailid?',
        name: '新闻详情',
        component: './home/campusNews/detail',
      },
      {
        path: '/home/campusBuilds',
        name: '校园建筑',
        component: './home/campusBuilds',
      },
    ],
  },
];
