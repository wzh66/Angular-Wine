import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {LocationStrategy} from '@angular/common';
import {Slide} from '../../../../@theme/animates/router.animation';
import {FooterService} from '../../../../@theme/modules/footer/footer.service';
import {AuthService} from '../../../auth/auth.service';
import {OrderService} from '../order.service';
import {interval as observableInterval, timer as observableTimer} from 'rxjs';
import {PayDto} from '../../../../@core/dto/pay.dto';

import {MaskComponent, PickerConfig, PickerService, ToastService} from 'ngx-weui';

import {UaService} from '../../../../@core/data/ua.service';
import {CheckoutService} from '../../checkout/checkout.service';
import {getIndex} from '../../../../utils/utils';

@Component({
  selector: 'app-admin-order-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  animations: [Slide]
})
export class AdminOrderItemComponent implements OnInit {

  config: PickerConfig = <PickerConfig>{
    cancel: '取消',
    confirm: '确定',
    backdrop: true
  };

  key;
  order;
  products = [];
  oda;
  payType;
  orderNo = this.route.snapshot.params['no'];

  @ViewChild('customForm', {static: false}) private customForm;
  @ViewChild('mask', {static: false}) private mask: MaskComponent;
  formData;
  checkoutForm: FormGroup;
  showType;
  listenerTimer;
  payQrCode;
  qrCodeUrl;
  payTypes;
  payTypeIndex = 0;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: LocationStrategy,
              private toastSvc: ToastService,
              private pickerSvc: PickerService,
              private uaSvc: UaService,
              private footerSvc: FooterService,
              private authSvc: AuthService,
              private orderSvc: OrderService,
              private checkoutSvc: CheckoutService) {
    footerSvc.setActive(3);
  }

  ngOnInit() {
    this.key = this.authSvc.getKey();
    this.checkoutForm = new FormGroup({
      orderNos: new FormControl('', [Validators.required]),
      payType: new FormControl('', [Validators.required]),
      key: new FormControl(this.key, [Validators.required]),
      returnUrl: new FormControl(window.location.origin + '/msg/success?type=cart', [Validators.required]),
      openId: new FormControl(this.authSvc.getOid(), [])
    });

    this.checkoutSvc.get(this.key).subscribe(res => {
      const payTypes = [];
      res.forEach(item => {
        payTypes.push({
          label: item.mchname,
          value: item.paytype,
          isDefault: item.isdefault
        });
      });
      this.payTypes = payTypes;
      this.payTypeIndex = getIndex(this.payTypes, 'isDefault', 1);
      this.payType = this.payTypes[this.payTypeIndex];
      this.checkoutForm.get('payType').setValue(this.payType.value);
    });

    this.orderSvc.getOrderInfo(this.key, this.orderNo).subscribe(res => {
      console.log('res:', res);
      this.order = res.order;
      this.oda = res.oda;
      this.products = res.goods;
      this.payType = res.payType;
      console.log(this.products);
      this.checkoutForm.get('orderNos').setValue(this.order.orderno);
    });
  }

  showPayTypes() {
    this.pickerSvc.show([this.payTypes], '', [this.payTypeIndex], this.config).subscribe(res => {
      this.payType = res.items[0];
      this.checkoutForm.get('payType').setValue(res.value);
      this.checkout();
    });
  }

  checkout() {
    if (this.checkoutForm.invalid) {
      return false;
    }
    this.toastSvc.loading('结算中', 0);
    this.orderSvc.pay(this.checkoutForm.value).subscribe(res => {
      if (!res) {
        this.toastSvc.hide();
        return false;
      }
      this.showType = res.showType;
      if (this.showType === 0) {
        this.listenerTimer = observableInterval(3000).subscribe(() => {
          this.checkoutSvc.listener(this.key, res.tradeNo).subscribe(_res => {
            this.toastSvc.hide();
            if (_res.consume.paystatus !== 0) {
              // this.userInfo.balance = _res.userInfo.balance;
              this.listenerTimer.unsubscribe();
              if (_res.consume.paystatus === 1) {
                this.router.navigate(['/msg/success'], {queryParams: {type: 'cart', orderNo: res.orderNo}});
              }
              if (_res.consume.paystatus === 2) {
                this.toastSvc.success('支付失败', 3000);
              }
              /*this.mask.hide();*/
            }
          });
        });
      }
      if (this.showType === 1) {
        this.toastSvc.hide();
        this.qrCodeUrl = res.showMsg;
        this.mask.show();
        this.listenerTimer = observableInterval(3000).subscribe(() => {
          this.checkoutSvc.listener(this.key, res.orderNo).subscribe(_res => {
            if (_res.consume.paystatus !== 0) {
              // this.userInfo.balance = _res.userInfo.balance;
              this.listenerTimer.unsubscribe();
              if (_res.consume.paystatus === 1) {
                this.toastSvc.success('充值成功', 3000);
              }
              if (_res.consume.paystatus === 2) {
                this.toastSvc.success('充值失败', 3000);
              }
              this.mask.hide();
            }
          });
        });
      }
      if (this.showType === 2) {
        this.toastSvc.hide();
      }
      if (this.showType === 3) {
        this.toastSvc.hide();
        const body: PayDto = {
          appId: res.appId,
          timeStamp: res.timeStamp,
          nonceStr: res.nonceStr,
          package: res.package,
          signType: res.signType,
          paySign: res.paySign,
          orderNo: res.orderNo
        };
        this.checkoutSvc.wxPay(body);
        // this.router.navigate(['/msg/success'], {queryParams: {type: 'cart', orderNo: res.orderNo}});
        // window.location.href = res.showMsg;
      }
      if (this.showType === 4) {
        this.toastSvc.hide();
        if (this.uaSvc.isWx()) {
          window.location.href = '/redirect?redirect=' + res.showMsg;
        } else {
          window.location.href = res.showMsg;
        }
      }
      if (this.showType === 5) {
        this.formData = res.formData;
        observableTimer(1000).subscribe(() => {
          this.customForm.nativeElement.submit();
          this.toastSvc.hide();
        });
      }
      if (this.showType === 7) {
        this.toastSvc.hide();
        this.payQrCode = res.showMsg;
        this.mask.show();
      }
    });
  }

  back() {
    this.location.back();
  }
}
