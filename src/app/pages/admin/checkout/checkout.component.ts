import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {PickerService, PickerConfig, ToastService, DialogService, MaskComponent} from 'ngx-weui';

import {timer as observableTimer, interval as observableInterval} from 'rxjs';

import {GeoService} from '../../../@core/data/geo.service';
import {UaService} from '../../../@core/data/ua.service';
import {DirectionService} from '../../../@theme/animates/direction.service';
import {AuthService} from '../../auth/auth.service';
import {CartService} from '../cart/cart.service';
import {AddressService} from '../setting/address/address.service';
import {StoreService} from '../../../@core/data/store.service';
import {CheckoutService} from './checkout.service';
import {getIndex} from '../../../utils/utils';

declare interface Wish {
  text: string;
  value: number;
}

declare var qq: any;

@Component({
  selector: 'app-admin-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class AdminCheckoutComponent implements OnInit {
  key;
  items;
  order;
  addresses;
  address;
  stores;
  store;
  location: any = {};
  checkoutForm: FormGroup;
  loading = false;
  config: PickerConfig = <PickerConfig>{
    cancel: '取消',
    confirm: '确定',
    backdrop: true
  };
  direction;
  @ViewChild('customForm') private customForm;
  @ViewChild('mask') private mask: MaskComponent;
  formData;
  payQrCode;
  qrCodeUrl;
  payTypes;
  payTypeIndex = 0;
  payType;
  showType;
  listenerTimer;

  constructor(private router: Router,
              private uaSvc: UaService,
              private toastSvc: ToastService,
              private dialogSvc: DialogService,
              private pickerSvc: PickerService,
              private directionSvc: DirectionService,
              private geoSvc: GeoService,
              private authSvc: AuthService,
              private cartSvc: CartService,
              private addressSvc: AddressService,
              private storeSvc: StoreService,
              private checkoutSvc: CheckoutService) {
    directionSvc.get().subscribe(res => {
      this.direction = res.direction;
    });
  }

  ngOnInit() {
    this.key = this.authSvc.getKey();
    this.checkoutForm = new FormGroup({
      payType: new FormControl('', [Validators.required]),
      key: new FormControl(this.key, [Validators.required]),
      returnUrl: new FormControl(window.location.origin + '/msg/success?type=cart', [Validators.required]),
      deliveryType: new FormControl(0, [Validators.required]),
      storeId: new FormControl('', [Validators.required]),
      addrId: new FormControl('', [Validators.required]),
      openId: new FormControl('', [])
    });
    this.checkoutSvc.getItems(this.key).subscribe(res => {
      this.order = res;
    });
    this.checkoutSvc.get(2, this.key).subscribe(res => {
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
    this.addressSvc.get(this.key).subscribe(res => {
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
        this.addresses = addresses;
        this.checkoutForm.get('addrId').setValue(this.address.id);
        this.storeSvc.get({key: this.key, addrId: this.checkoutForm.get('addrId').value}).subscribe(_res => {
          this.store = _res[0];
          const stores = [];
          _res.forEach(store => {
            stores.push({
              label: '[' + store.storename + ']' + store.address,
              value: store
            });
          });
          this.stores = stores;
          this.checkoutForm.get('storeId').setValue(this.store.id);
          if (this.stores.length < 1) {
            this.dialogSvc.show({
              title: '',
              content: this.checkoutForm.get('deliveryType').value ? '该区域暂时没有开通配送服务' : '该区域暂时没有自提门店',
              cancel: '',
              confirm: '我知道了'
            }).subscribe();
          }
        });
      }
    });
    this.geoSvc.get().then((res) => {
      const geo = new qq.maps.Geolocation('PDBBZ-2NVWV-7GAPA-UKVP5-YED6S-FRB6L', 'danius');
      geo.getLocation((position) => {
        this.location.location = position.lat + ',' + position.lng;
        this.geoSvc.getPosition(this.location.location).subscribe((result) => {
          this.location.address = result.result.address;
          /*this.clockForm.get('address').setValue(result.result.address);*/
        });
      }, (err) => {
        this.dialogSvc.show({content: '请打开授权或打开定位开关', cancel: '', confirm: '我知道了'}).subscribe();
      }, {failTipFlag: true});
    });
  }

  numChange(e) {
    console.log(e);
  }

  show(type) {
    if (type === 'address') {
      this.pickerSvc.show([this.addresses], '', [0], this.config).subscribe(res => {
        this.checkoutForm.get('addrId').setValue(res.value.id);
      });
    } else {
      this.pickerSvc.show([this.stores], '', [0], this.config).subscribe(res => {
        this.checkoutForm.get('storeId').setValue(res.value.id);
      });
    }
  }

  showPayTypes() {
    this.pickerSvc.show([this.payTypes], '', [this.payTypeIndex], this.config).subscribe(res => {
      this.payType = res.items[0];
      this.checkoutForm.get('payType').setValue(res.value);
    });
  }

  checkout() {
    if (this.loading || this.checkoutForm.invalid) {
      return false;
    }

    this.loading = true;
    this.toastSvc.loading('结算中', 0);
    this.checkoutSvc.pay(this.checkoutForm.value).subscribe(res => {
      this.showType = res.result.showType;
      if (res.result.showType === 0) {
        this.loading = false;
        this.listenerTimer = observableInterval(3000).subscribe(() => {
          this.checkoutSvc.listener(this.key, res.result.orderNo).subscribe(_res => {
            if (_res.result.consume.paystatus !== 0) {
              // this.userInfo.balance = _res.result.userInfo.balance;
              this.listenerTimer.unsubscribe();
              if (_res.result.consume.paystatus === 1) {
                this.toastSvc.hide();
                this.router.navigate(['/msg/success'], {queryParams: {type: 'cart', orderNo: res.result.orderNo}});
              }
              if (_res.result.consume.paystatus === 2) {
                this.toastSvc.success('充值失败', 3000);
              }
              /*this.mask.hide();*/
            }
          });
        });
      }
      if (res.result.showType === 1) {
        this.loading = false;
        this.toastSvc.hide();
        this.qrCodeUrl = res.result.showMsg;
        this.mask.show();
        this.listenerTimer = observableInterval(3000).subscribe(() => {
          this.checkoutSvc.listener(this.key, res.result.orderNo).subscribe(_res => {
            if (_res.result.consume.paystatus !== 0) {
              // this.userInfo.balance = _res.result.userInfo.balance;
              this.listenerTimer.unsubscribe();
              if (_res.result.consume.paystatus === 1) {
                this.toastSvc.success('充值成功', 3000);
              }
              if (_res.result.consume.paystatus === 2) {
                this.toastSvc.success('充值失败', 3000);
              }
              this.mask.hide();
            }
          });
        });
      }
      if (res.result.showType === 2) {
      }
      if (res.result.showType === 3) {
        window.location.href = res.result.showMsg;
      }
      if (res.result.showType === 4) {
        if (this.uaSvc.isWx()) {
          window.location.href = '/redirect?redirect=' + res.result.showMsg;
        } else {
          window.location.href = res.result.showMsg;
        }
      }
      if (res.result.showType === 5) {
        this.loading = true;
        this.toastSvc.show('结算中', 0, '', 'loading');
        this.formData = res.result.formData;
        observableTimer(1000).subscribe(() => {
          this.customForm.nativeElement.submit();
        });
      }
      if (res.result.showType === 7) {
        this.loading = false;
        this.toastSvc.hide();
        this.payQrCode = res.result.showMsg;
        this.mask.show();
      }
    });
  }
}
