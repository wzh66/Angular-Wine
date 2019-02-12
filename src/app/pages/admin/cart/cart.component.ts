import {Component, OnInit} from '@angular/core';

import {ActionSheetConfig, SkinType, ActionSheetService} from 'ngx-weui';

declare interface Wish {
  text: string;
  value: number;
}

@Component({
  selector: 'app-admin-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class AdminCartComponent implements OnInit {

  items = [
    {
      id: 0,
      title: '百利甜情人',
      desc: '甜润奶油，与草莓的自然甜度搭配',
      price: '228',
      unit: '元/2.0磅',
      qty: 1,
      stock: 99,
      img: '/assets/images/items/1.jpg',
      wish: ''
    },
    {
      id: 1,
      title: '黑巧克力慕斯',
      desc: '爱尔兰百利甜酒/新西兰奶油/云南玫瑰甘露',
      price: '268',
      unit: '元/2.0磅',
      qty: 1,
      stock: 99,
      img: '/assets/images/items/2.jpg',
      wish: ''
    },
    {
      id: 2,
      title: '布朗熊&可妮兔',
      desc: '爱尔兰百利甜酒/新西兰奶油/云南玫瑰甘露',
      price: '298',
      unit: '元/2.0磅',
      qty: 1,
      stock: 99,
      img: '/assets/images/items/3.jpg',
      wish: ''
    },
    {
      id: 3,
      title: '小重组(迷迭香套餐)',
      desc: '爱尔兰百利甜酒/新西兰奶油/云南玫瑰甘露',
      price: '268',
      unit: '元/2.0磅',
      qty: 1,
      stock: 99,
      img: '/assets/images/items/4.jpg',
      wish: ''
    }
  ];

  wishes: Wish[] = [
    {text: '不需要', value: 1},
    {text: '生日快乐', value: 2},
    {text: 'Happy Birthday', value: 3},
    {text: '我要自己填写', value: 0}
  ];

  config: ActionSheetConfig = <ActionSheetConfig>{
    title: '请选择您要添加的祝福语',
    skin: 'ios',
    backdrop: true
  };

  constructor(private actionSheetSvc: ActionSheetService) {
  }

  ngOnInit() {
  }

  show(e, item) {
    this.actionSheetSvc.show(this.wishes, this.config).subscribe((res: any) => {
      if (!res.value) {
        e.target.previousElementSibling.querySelector('input').focus();
        item.wish = '';
        item.focus = true;
      } else {
        item.wish = res.text;
      }
    });
  }

  onCustom(e) {
    console.log(e);
  }

}
