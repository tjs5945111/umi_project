export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/zjlb',
    name: '证据列表',
    icon: 'smile',
    component: './Zjlb',
  },
  {
    path: '/zjlb/detail',
    component: './Zjlb/zjDeatil',
  },
  {
    path: '/yylb',
    name: '预约列表',
    icon: 'smile',
    component: './Yylb',
  },
  {
    path: '/yylb/detail',
    component: './Yylb/yyDeatil',
  },
  {
    path: '/rygl',
    name: '人员管理',
    icon: 'smile',
    component: './Rygl',
  },
  {
    path: '/rygl/detail',
    component: './Rygl/ryDeatil',
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/zjlb',
  },
  {
    component: './404',
  },
];
