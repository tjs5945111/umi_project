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
    path: '/manager/zjlb',
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
    path: '/xtsz',
    name: '系统设置',
    icon: 'smile',
    component: './Xtsz',
  },
  {
    path: '/dzmq',
    name: '电子面签',
    icon: 'smile',
    component: './Dzmq',
  },
  {
    path: '/yzgl',
    name: '印章管理',
    icon: 'smile',
    component: './Yzgl',
  },
  {
    path: '/yzgl/detail',
    component: './Yzgl/YzDeatil',
  },
  {
    path: '/dzmq/detail',
    component: './Dzmq/dzDeatil',
  },
  {
    path: '/dzmq/add',
    component: './Dzmq/dzAdd',
  },
  {
    path: '/',
    redirect: '/manager/zjlb',
  },
  {
    component: './404',
  },
];
