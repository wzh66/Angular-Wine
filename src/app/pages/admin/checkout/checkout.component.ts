import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {LocationStrategy} from '@angular/common';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {
  PickerService,
  PickerConfig,
  ToastService,
  DialogService,
  MaskComponent,
  ActionSheetComponent,
  ActionSheetConfig,
  ActionSheetService, SkinType
} from 'ngx-weui';

import {timer as observableTimer, interval as observableInterval} from 'rxjs';

import {StorageService} from '../../../@core/utils/storage.service';
import {GeoService} from '../../../@core/data/geo.service';
import {UaService} from '../../../@core/data/ua.service';
import {DirectionService} from '../../../@theme/animates/direction.service';
import {FooterService} from '../../../@theme/modules/footer/footer.service';
import {OverlayService} from '../../../@theme/modules/overlay';
import {AuthService} from '../../auth/auth.service';
import {CartService} from '../cart/cart.service';
import {AddressService} from '../setting/address/address.service';
import {StoreService} from '../../../@core/data/store.service';
import {CheckoutService} from './checkout.service';
import {getIndex, onBridgeReady} from '../../../utils/utils';
import {PayDto} from '../../../@core/dto/pay.dto';

declare interface Coupon {
  text: string;
  value: number;
}

declare var qq: any;
declare var WeixinJSBridge: any;

@Component({
  selector: 'app-admin-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class AdminCheckoutComponent implements OnInit, OnDestroy {
  key;
  items;
  order;
  addresses;
  address;
  stores;
  store;
  location: any = {};
  checkoutForm: FormGroup;
  config: PickerConfig = <PickerConfig>{
    cancel: '取消',
    confirm: '确定',
    backdrop: true
  };
  direction;
  @ViewChild('customForm', {static: false}) private customForm;
  @ViewChild('mask', {static: false}) private mask: MaskComponent;
  @ViewChild('auto', {static: true}) private auto: ActionSheetComponent;
  formData;
  payQrCode;
  qrCodeUrl;
  payTypes;
  payTypeIndex = 0;
  payType;
  showType;
  listenerTimer;
  coupon: Coupon = {
    text: '',
    value: 0
  };

  menus: any[] = [{text: '不使用代金券', value: 0}];
  sheetConfig: ActionSheetConfig = {
    title: '请选择代金券',
  } as ActionSheetConfig;

  constructor(private router: Router,
              private loc: LocationStrategy,
              private uaSvc: UaService,
              private storageSvc: StorageService,
              private toastSvc: ToastService,
              private dialogSvc: DialogService,
              private pickerSvc: PickerService,
              private directionSvc: DirectionService,
              private geoSvc: GeoService,
              private footerSvc: FooterService,
              private overlaySvc: OverlayService,
              private authSvc: AuthService,
              private cartSvc: CartService,
              private addressSvc: AddressService,
              private storeSvc: StoreService,
              private checkoutSvc: CheckoutService,
              private actionSheetSvc: ActionSheetService) {
    directionSvc.get().subscribe(res => {
      this.direction = res.direction;
    });
    footerSvc.setActive(2);
  }

  ngOnInit() {
    /*this.key = this.authSvc.getKey();*/
    this.checkoutForm = new FormGroup({
      payType: new FormControl('', [Validators.required]),
      /*key: new FormControl(this.key, [Validators.required]),*/
      returnUrl: new FormControl(window.location.origin + '/msg/success?type=cart', [Validators.required]),
      deliveryType: new FormControl(1, [Validators.required]),
      /*storeId: new FormControl('', [Validators.required]),*/
      addrId: new FormControl('', [Validators.required]),
      openId: new FormControl(this.authSvc.getOid(), []),
      sendTime: new FormControl('', [Validators.required]),
    });

    this.loc.onPopState(state => {
      this.overlaySvc.hide();
    });

    this.checkoutSvc.getItems().subscribe(res => {
      this.order = res;
      if (res.giveCashCard) {
        const name = res.giveCashCard.name;
        this.dialogSvc.show({title: '', content: `<p>恭喜你获得一张${name}!</p><p>(可用于兑换商品)</p>`, cancel: '不了', confirm: '去看看'}).subscribe(value => {
          if (value.value) {
            this.router.navigate(['/admin/cash']);
          }
        });
      }
      const body = {
        text: res.giveCashCard.name,
        value: res.giveCashCard.amount
      };
      this.menus.push(body);
    });
    this.checkoutSvc.get(2).subscribe(res => {
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
    this.addressSvc.get().subscribe(res => {
      if (res.list.length > 0) {
        this.address = res.list[0];
        const addresses = [];
        res.list.forEach(address => {
          addresses.push({
            label: '[' + address.consignee + ']' + address.province + address.city + address.district + address.address,
            value: address
          });
          if (address.status === 1) {
            this.address = address;
          }
        });
        addresses.push({label: '添加新地址', value: 0});
        this.addresses = addresses;
        this.checkoutForm.get('addrId').setValue(this.address.id);
        /*this.getStore();*/
      }
    });
  }

  showDate() {
    const now = Date.parse(new Date().toString());
    const tomorrow = now + 24 * 60 * 60 * 1000;
    console.log(new Date(now));
    this.pickerSvc.showDateTime('datetime', '', new Date(tomorrow), new Date(tomorrow)).subscribe((res: any) => {
      this.checkoutForm.get('sendTime').setValue(res.formatValue);
    });
  }

  getStore() {
    this.storeSvc.get({key: this.key, addrId: this.checkoutForm.get('addrId').value}).subscribe(_res => {
      const stores = [];
      _res.forEach(store => {
        stores.push({
          label: '[' + store.storename + ']' + store.address,
          value: store
        });
      });
      this.stores = stores;
      if (this.stores.length < 1) {
        this.dialogSvc.show({
          title: '',
          content: this.checkoutForm.get('deliveryType').value ? '该区域暂时没有开通配送服务，请另选配送地址' : '该区域暂时没有自提门店',
          cancel: '',
          confirm: '我知道了'
        }).subscribe();
      } else {
        this.store = _res[0];
        console.log(this.store);
        this.checkoutForm.get('storeId').setValue(this.store.id);
      }
    });
  }

  showOverlay() {
    this.loc.pushState('advert', 'overlay', this.loc.path(), '');
    this.overlaySvc.show();
  }

  show(type) {
    if (type === 'address') {
      this.pickerSvc.show([this.addresses], '', [0], this.config).subscribe(res => {
        console.log(res);
        if (res.value === '添加新地址') {
          this.router.navigate(['/admin/setting/address/edit/0']);
        } else {
          // this.store = '';
          // this.checkoutForm.get('storeId').setValue('');
          // this.checkoutForm.get('addrId').setValue('');
          this.address = res.value;
          this.checkoutForm.get('addrId').setValue(res.value.id);
          /*this.getStore();*/
        }
      });
    } /*else {
      this.pickerSvc.show([this.stores], '', [0], this.config).subscribe(res => {
        // this.checkoutForm.get('storeId').setValue('');
        // this.checkoutForm.get('addrId').setValue('');
        this.store = res.value;
        this.checkoutForm.get('storeId').setValue(res.value.id);
      });
    }*/
  }

  showPayTypes() {
    this.pickerSvc.show([this.payTypes], '', [this.payTypeIndex], this.config).subscribe(res => {
      this.payType = res.items[0];
      this.checkoutForm.get('payType').setValue(res.value);
    });
  }

  deliveryTypeChange(e) {
    if (!e) {
      this.checkoutForm.get('addrId').enable();
    } else {
      this.checkoutForm.get('addrId').disable();
    }
    this.checkoutForm.get('deliveryType').setValue(e ? 0 : 1);
  }

  checkout() {
    /*if (this.checkoutForm.invalid) {
      return false;
    }*/
    this.toastSvc.loading('结算中', 0);
    this.checkoutSvc.pay(this.checkoutForm.value).subscribe(res => {
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
    this.loc.back();
  }

  showCoupon(type: SkinType, backdrop: boolean = true) {
    this.sheetConfig.skin = type;
    this.sheetConfig.backdrop = backdrop;
    this.actionSheetSvc.show(this.menus, this.sheetConfig).subscribe(res => {
      this.coupon = res;
    });
  }

  ngOnDestroy() {
    this.actionSheetSvc.destroyAll();
  }
}
