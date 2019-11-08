import {Nav} from './footer.service';

export const FOOTER_NAV_ITEMS: Nav[] = [
  {
    page: '/index',
    icon: 'icons-home',
    selectedIcon: 'icons-home_fill',
    name: '首页',
    selected: false,
    badge: 0
  },
  {
    page: '/front/list',
    icon: 'icons-newshot',
    selectedIcon: 'icons-newshot_fill',
    name: '分类',
    selected: false,
    badge: 0
  },
  {
    page: '/admin/cart',
    icon: 'icons-cart',
    selectedIcon: 'icons-cart_fill',
    name: '购物车',
    selected: false,
    badge: 0
  },
  {
    page: '/admin/home',
    icon: 'icons-people',
    selectedIcon: 'icons-people_fill',
    name: '个人中心',
    selected: false,
    badge: 0
  }
];
