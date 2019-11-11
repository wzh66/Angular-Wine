import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {LocationStrategy} from '@angular/common';
import {ActionSheetConfig, ActionSheetService, ToastService, DialogService} from 'ngx-weui';
import {DirectionService} from '../../../@theme/animates/direction.service';
import {FooterService} from '../../../@theme/modules/footer/footer.service';
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
  items = [];
  total = 0;
  key;
  config: ActionSheetConfig = <ActionSheetConfig>{
    title: '请选择您要添加的祝福语',
    skin: 'ios',
    backdrop: true
  };
  direction;

  cartForm: FormGroup;

  constructor(private actionSheetSvc: ActionSheetService,
              private location: LocationStrategy,
              private toastSvc: ToastService,
              private dialogSvc: DialogService,
              private directionSvc: DirectionService,
              private footerSvc: FooterService,
              private authSvc: AuthService,
              private cartSvc: CartService) {
    directionSvc.get().subscribe(res => {
      this.direction = res.direction;
    });
    footerSvc.setActive(2);
  }

  ngOnInit() {
    this.key = this.authSvc.getKey();
    this.cartForm = new FormGroup({
      key: new FormControl(this.key, [Validators.required]),
      productId: new FormControl('', [Validators.required]),
      qty: new FormControl('', [Validators.required]),
    });
    this.getData();
  }

  getData() {
    this.cartSvc.get(this.key).subscribe(res => {
      this.items = res;
      this.cartSvc.updateCount(this.items.length);
      this.getTotal();
    });
  }

  numChange(item, e) {
    this.cartForm.get('productId').setValue(item.productid);
    this.cartForm.get('qty').setValue(e);
    this.save(this.cartForm.value);
  }

  getTotal() {
    let total = 0;
    this.items.forEach(item => {
      total = total + item.totalprice;
    });
    this.total = total;
  }

  /*show(e, item) {
    this.actionSheetSvc.show(this.wishes, this.config).subscribe((res: any) => {
      if (!res.value) {
        e.target.previousElementSibling.querySelector('input').focus();
        item.remark = '';
        item.focus = true;
      } else {
        item.remark = res.text;
        this.setMark(item.id, item.remark);
      }
    });
  }*/

  save(body) {
    this.cartSvc.save(body).subscribe(res => {
      this.getData();
    });
  }

  /*setMark(id, remark) {
    this.cartSvc.saveMark({key: this.key, cartId: id, remark: remark})
      .subscribe(res => {
        console.log(res);
      });
  }*/

  remove(id) {
    this.dialogSvc.show({title: '', content: '你确定要删除？', cancel: '取消', confirm: '确定'}).subscribe(value => {
      if (value.value) {
        this.cartSvc.remove({key: this.key, cartId: id}).subscribe(res => {
          console.log(res);
          this.getData();
        });
      }
    });
  }

  onCustom(e) {
    this.dialogSvc.show({title: '', content: '您确定要清空购物车吗？', cancel: '取消', confirm: '确定'}).subscribe(value => {
      if (value.value) {
        console.log(value);
        this.toastSvc.loading('', 0);
        this.cartSvc.clear(this.key).subscribe(res => {
          this.toastSvc.hide();
          this.getData();
        });
      }
    });
  }

  onCancel() {
    this.location.back();
  }
}
