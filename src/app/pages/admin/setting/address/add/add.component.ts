import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {GeoService} from '../../../../../@core/data/geo.service';
import {StorageService} from '../../../../../@core/utils/storage.service';
import {FooterService} from '../../../../../@theme/modules/footer/footer.service';
import {AuthService} from '../../../../auth/auth.service';
import {AddressService} from '../address.service';
import {DialogService, PickerService} from 'ngx-weui';

import {DATA} from '../../../../../@core/data/cn';


declare var qq;

@Component({
  selector: 'app-admin-setting-address-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AdminSettingAddressAddComponent implements OnInit, OnDestroy {

  key;
  callbackUrl;

  settingForm: FormGroup;
  loading = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private storageSvc: StorageService,
              private geoSvc: GeoService,
              private dialogSvc: DialogService,
              private pickerSvc: PickerService,
              private footerSvc: FooterService,
              private authSvc: AuthService,
              private addressSvc: AddressService) {
    footerSvc.setActive(3);
  }

  ngOnInit() {
    this.key = this.authSvc.getKey();
    this.callbackUrl = this.route.snapshot.queryParams['callbackUrl'];

    this.settingForm = new FormGroup({
      // id: new FormControl('', [Validators.required]),
      key: new FormControl('', [Validators.required]),
      lnker: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(4)]),
      mobile: new FormControl('', [Validators.required]),
      rgnpro: new FormControl('', [Validators.required]),
      rgncity: new FormControl('', [Validators.required]),
      rgnarea: new FormControl('', []),
      rgndtl: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      areaCode: new FormControl('', [Validators.required]),
      lat: new FormControl('', [Validators.required]),
      lng: new FormControl('', [Validators.required])
    });

    this.settingForm.get('key').setValue(this.key);
    this.geoSvc.get().then((res) => {
      const geo = new qq.maps.Geolocation('PDBBZ-2NVWV-7GAPA-UKVP5-YED6S-FRB6L', 'danius');
      geo.getLocation((position) => {
        this.settingForm.get('lat').setValue(position.lat);
        this.settingForm.get('lng').setValue(position.lng);
        const body = {key: this.key, lat: position.lat, lng: position.lng};
        this.geoSvc.getPosition(body).subscribe((result) => {
          console.log(result);
          this.settingForm.get('rgnpro').setValue(result.addressComponent.province);
          this.settingForm.get('rgncity').setValue(result.addressComponent.city);
          this.settingForm.get('rgnarea').setValue(result.addressComponent.district);
          this.settingForm.get('rgndtl').setValue(result.addressComponent.street + result.sematic_description);
          this.settingForm.get('areaCode').setValue(result.addressComponent.adcode);
          console.log(this.settingForm.value);
        });
      }, (err) => {
        this.dialogSvc.show({content: '请打开授权或打开定位开关', cancel: '', confirm: '我知道了'}).subscribe();
      }, {failTipFlag: true});
    });
  }

  showPicker() {
    this.pickerSvc.showCity(DATA, this.settingForm.get('areaCode').value).subscribe((res: any) => {
      console.log(res);
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
    if (this.loading || this.settingForm.invalid) {
      return false;
    }
    this.loading = true;
    this.addressSvc.save(this.settingForm.value).subscribe(res => {
      if (this.callbackUrl) {
        this.router.navigate([this.callbackUrl]);
      } else {
        window.history.back();
      }
    });
  }

  ngOnDestroy() {
    this.dialogSvc.destroyAll();
    this.pickerSvc.destroyAll();
  }

}
