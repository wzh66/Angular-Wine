import {Component, OnInit} from '@angular/core';
import {ActionSheetConfig, ActionSheetService, ToastService} from 'ngx-weui';
import {DirectionService} from '../../../@theme/animates/direction.service';
import {AuthService} from '../../auth/auth.service';
import {CartService} from './cart.service';

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
  key;
  items;
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
  direction;

  constructor(private actionSheetSvc: ActionSheetService,
              private toastSvc: ToastService,
              private directionSvc: DirectionService,
              private authSvc: AuthService,
              private cartSvc: CartService) {
    directionSvc.get().subscribe(res => {
      this.direction = res.direction;
    });
  }

  ngOnInit() {
    this.key = this.authSvc.getKey();
    this.cartSvc.get(this.key).subscribe(res => {
      this.items = res;
    });
  }

  numChange(e) {
    console.log(e);
  }

  show(e, item) {
    this.actionSheetSvc.show(this.wishes, this.config).subscribe((res: any) => {
      if (!res.value) {
        e.target.previousElementSibling.querySelector('input').focus();
        item.wish = '';
        item.focus = true;
      } else {
        item.wish = res.text;
        this.setMark(item.id, res.text);
      }
    });
  }

  setMark(id, remark) {
    this.cartSvc.saveMark({key: this.key, cartId: id, remark: remark})
      .subscribe(res => {
      console.log(res);
    });
  }

  onCustom(e) {
    this.toastSvc.loading('', 0);
    this.cartSvc.clear(this.key).subscribe(res => {
      this.toastSvc.hide();
    });
  }

  checkout() {
  }
}
