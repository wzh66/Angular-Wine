import {Nav} from './footer.service';

export const FOOTER_NAV_ITEMS: Nav[] = [
  {
    page: '/index',
    icon: 'icon-home',
    selectedIcon: 'icon-home',
    name: '首页',
    selected: false,
    badge: 0
  },
  {
    page: '/front',
    icon: 'icon-list-unordered',
    selectedIcon: 'icon-list-unordered',
    name: '所有商品',
    selected: false,
    badge: 0
  },
  {
    page: '/admin',
    icon: 'icon-admin',
    selectedIcon: 'icon-admin',
    name: '购物车',
    selected: false,
    badge: 0
  },
  {
    page: '/cache',
    icon: 'icon-category',
    selectedIcon: 'icon-category',
    name: '我的',
    selected: false,
    badge: 0
  }
];
