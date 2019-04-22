import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ActionSheetConfig, ActionSheetService, ToastService, DialogService} from 'ngx-weui';
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
  total = 0;
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

  cartForm: FormGroup;

  constructor(private actionSheetSvc: ActionSheetService,
              private toastSvc: ToastService,
              private dialogSvc: DialogService,
              private directionSvc: DirectionService,
              private authSvc: AuthService,
              private cartSvc: CartService) {
    directionSvc.get().subscribe(res => {
      this.direction = res.direction;
    });
  }

  ngOnInit() {
    this.key = this.authSvc.getKey();
    this.cartForm = new FormGroup({
      key: new FormControl(this.key, [Validators.required]),
      productId: new FormControl(this.key, [Validators.required]),
      specId: new FormControl(this.key, [Validators.required]),
      qty: new FormControl(this.key, [Validators.required]),
      remark: new FormControl(this.key, [Validators.required])
    });
    this.getData();
  }

  getData() {
    this.cartSvc.get(this.key).subscribe(res => {
      this.items = res;
      console.log(res);
      this.getTotal();
    });
  }

  numChange(item, e) {
    this.cartForm.get('productId').setValue(item.productid);
    this.cartForm.get('specId').setValue(item.specid);
    this.cartForm.get('qty').setValue(e);
    this.cartForm.get('remark').setValue(item.remark);
    this.save(this.cartForm.value);
  }

  getTotal() {
    let total = 0;
    this.items.forEach(item => {
      total = total + item.totalprice;
    });
    this.total = total;
  }

  show(e, item) {
    this.actionSheetSvc.show(this.wishes, this.config).subscribe((res: any) => {
      if (!res.value) {
        e.target.previousElementSibling.querySelector('input').focus();
        item.remark = '';
        item.focus = true;
      } else {
        item.remark = res.text;
        this.setMark(item.id, res.text);
      }
    });
  }

  save(body) {
    this.cartSvc.save(body).subscribe(res => {
      this.getData();
    });
  }

  setMark(id, remark) {
    this.cartSvc.saveMark({key: this.key, cartId: id, remark: remark})
      .subscribe(res => {
        console.log(res);
      });
  }

  remove(id) {
    this.cartSvc.remove({key: this.key, cartId: id}).subscribe(res => {
      console.log(res);
      this.getData();
    });
  }

  onCustom(e) {
    this.dialogSvc.show({title: '', content: '您确定要清空购物车吗？', cancel: '不了', confirm: '是的'}).subscribe(value => {
      if (value) {
        this.toastSvc.loading('', 0);
        this.cartSvc.clear(this.key).subscribe(res => {
          this.toastSvc.hide();
          this.getData();
        });
      }
    });
  }
}
