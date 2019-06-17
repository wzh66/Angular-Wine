import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

import {StorageService} from '../../../../../@core/utils/storage.service';
import {FooterService} from '../../../../../@theme/modules/footer/footer.service';
import {AuthService} from '../../../../auth/auth.service';
import {AddressService} from '../address.service';
import {DialogService, PickerService, ToastService} from 'ngx-weui';
import {GeoService} from '../../../../../@core/data/geo.service';
import {DATA} from '../../../../../@core/data/cn';

declare var qq: any;

@Component({
  selector: 'app-admin-setting-address-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class AdminSettingAddressEditComponent implements OnInit, OnDestroy {

  id = parseInt(this.route.snapshot.params['id'], 10);
  settingForm: FormGroup;
  loading = false;

  constructor(private route: ActivatedRoute,
              private geoSvc: GeoService,
              private storageSvc: StorageService,
              private toastSvc: ToastService,
              private dialogSvc: DialogService,
              private pickerSvc: PickerService,
              private footerSvc: FooterService,
              private authSvc: AuthService,
              private addressSvc: AddressService) {
    footerSvc.setActive(3);
  }

  ngOnInit() {
    this.settingForm = new FormGroup({
      // id: new FormControl('', [Validators.required]),
      key: new FormControl(this.authSvc.getKey(), [Validators.required]),
      addrId: new FormControl(this.id ? this.id : '', [Validators.required]),
      lnker: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(4)]),
      mobile: new FormControl('', [Validators.required]),
      rgnpro: new FormControl('', [Validators.required]),
      rgncity: new FormControl('', [Validators.required]),
      rgnarea: new FormControl('', []),
      rgndtl: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      areaCode: new FormControl('', [Validators.required]),
      x: new FormControl('', []),
      y: new FormControl('', [])
    });

    if (!this.id) {
      this.settingForm.get('addrId').disable();
    }

    if (this.id) {
      this.addressSvc.get(this.settingForm.get('key').value, this.id).subscribe(res => {
        this.settingForm.get('lnker').setValue(res.busMemberAddress.consignee);
        this.settingForm.get('mobile').setValue(res.busMemberAddress.phone);
        this.settingForm.get('rgnpro').setValue(res.busMemberAddress.province);
        this.settingForm.get('rgncity').setValue(res.busMemberAddress.city);
        this.settingForm.get('rgnarea').setValue(res.busMemberAddress.district);
        this.settingForm.get('rgndtl').setValue(res.busMemberAddress.address);
        this.settingForm.get('areaCode').setValue(res.busMemberAddress.areacode);
        this.settingForm.get('x').setValue(res.busMemberAddress.x);
        this.settingForm.get('y').setValue(res.busMemberAddress.y);
        if (this.settingForm.get('lat').invalid || this.settingForm.get('lng').invalid) {
          this.geoSvc.get().then(() => {
            const geo = new qq.maps.Geolocation('PDBBZ-2NVWV-7GAPA-UKVP5-YED6S-FRB6L', 'danius');
            geo.getLocation((position) => {
              const body = {key: this.settingForm.get('key').value, lat: position.lat, lng: position.lng};
              this.geoSvc.getPosition(body).subscribe((result) => {
                this.settingForm.get('x').setValue(result.location.lng);
                this.settingForm.get('y').setValue(result.location.lat);
              });
            }, (err) => {
              this.dialogSvc.show({content: '请打开授权或打开定位开关', cancel: '', confirm: '我知道了'}).subscribe();
            }, {failTipFlag: true});
          });
        }
      });
    } else {
      this.geoSvc.get().then((res) => {
        const geo = new qq.maps.Geolocation('PDBBZ-2NVWV-7GAPA-UKVP5-YED6S-FRB6L', 'danius');
        geo.getLocation((position) => {
          const body = {key: this.settingForm.get('key').value, lat: position.lat, lng: position.lng};
          this.geoSvc.getPosition(body).subscribe((result) => {
            this.settingForm.get('rgnpro').setValue(result.addressComponent.province);
            this.settingForm.get('rgncity').setValue(result.addressComponent.city);
            this.settingForm.get('rgnarea').setValue(result.addressComponent.district);
            this.settingForm.get('rgndtl').setValue(result.addressComponent.street + result.sematic_description);
            this.settingForm.get('areaCode').setValue(result.addressComponent.adcode);
            this.settingForm.get('x').setValue(result.location.lng);
            this.settingForm.get('y').setValue(result.location.lat);
          });
        }, (err) => {
          this.dialogSvc.show({content: '请打开授权或打开定位开关', cancel: '', confirm: '我知道了'}).subscribe();
        }, {failTipFlag: true});
      });
    }
  }

  showPicker() {
    this.pickerSvc.showCity(DATA, this.settingForm.get('areaCode').value).subscribe((res: any) => {
      this.settingForm.get('rgnpro').setValue(res.items[0].name);
      this.settingForm.get('rgncity').setValue(res.items[1].name);
      if (res.items[2]) {
        this.settingForm.get('rgnarea').setValue(res.items[2].name);
      } else {
        this.settingForm.get('rgnarea').setValue('');
      }
      this.settingForm.get('areaCode').setValue(res.value);
    });
  }

  onSubmit() {
    alert(JSON.stringify(this.settingForm.value));
    if (this.loading || this.settingForm.invalid) {
      return false;
    }
    this.loading = true;
    this.toastSvc.loading('操作中...', 0);
    this.geoSvc.gps({
      key: this.authSvc.getKey(),
      city: this.settingForm.get('rgncity').value,
      addr: this.settingForm.get('rgndtl').value
    }).subscribe(res => {
      this.settingForm.get('x').setValue(res.result.location.lng);
      this.settingForm.get('y').setValue(res.result.location.lat);
      this.addressSvc.save(this.settingForm.value).subscribe(() => {
        this.loading = false;
        this.toastSvc.hide();
        window.history.back();
      });
    });
  }

  ngOnDestroy() {
    this.dialogSvc.destroyAll();
    this.pickerSvc.destroyAll();
  }

}
