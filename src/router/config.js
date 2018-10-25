import {
  Login,
  Register,
  BossInfo,
  GeniusInfo,
  Chat
} from '@/container'
export default [
  {
    path: '/login',
    label: '登录',
    component: Login
  },
  {
    path: '/register',
    label: '注册',
    component: Register
  },
  {
    path: '/bossinfo',
    label: '添加boss信息',
    component: BossInfo
  },
  {
    path: '/geniusinfo',
    label: '添加求职者信息',
    component: GeniusInfo
  },
  {
    path: '/chat/:id',
    label: '聊天页',
    component: Chat
  },
  // {
  //   path: '/boss',
  //   label: 'boss',
  //   component: '',
  //   child: [
  //     {
  //       path: '/detail',
  //       label: '详情',
  //       component: ''
  //     }
  //   ]
  // }
 
]
