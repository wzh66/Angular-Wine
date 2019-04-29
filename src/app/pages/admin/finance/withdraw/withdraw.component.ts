import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {LocationStrategy} from '@angular/common';
import {ToastService, DialogService, UploaderOptions, Uploader} from 'ngx-weui';

import {AuthService} from '../../../auth/auth.service';
import {FinanceService} from '../finance.service';

@Component({
  selector: 'app-admin-finance-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class AdminFinanceWithdrawComponent implements OnInit {

  appKey;
  withdrawForm: FormGroup;
  isSubmit = false;
  loading = false;

  uploader: Uploader = new Uploader(<UploaderOptions>{
    url: '/wApi/interface/call.html?action=uploadAlipayQrCode',
    headers: [],
    params: {
      key: ''
    },
    auto: true,
    onUploadSuccess: (file, res) => {
      console.log(res);
      const _res = JSON.parse(res);
      this.withdrawForm.get('alipayqrcode').setValue(_res.result);
    }
  });

  constructor(private location: LocationStrategy,
              private toastSvc: ToastService,
              private dialogSvc: DialogService,
              private authSvc: AuthService,
              private financeSvc: FinanceService) {
  }

  ngOnInit() {
    this.appKey = this.authSvc.getStorageKey();
    this.uploader.options.params.key = this.appKey;
    this.withdrawForm = new FormGroup({
      key: new FormControl(this.appKey, [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      bankuser: new FormControl('', [Validators.required]),
      alipayqrcode: new FormControl('', [Validators.required]),
      money: new FormControl('', [Validators.required, Validators.min(100)]),
      tradePwd: new FormControl('', [Validators.required])
    });

    /*this.withdrawForm.get('money').valueChanges.subscribe(value => {
      console.log(value);
      if (value % 10 !== 0) {
        this.withdrawForm.get('money').setErrors({error: ''});
      }
    });*/
  }

  confirm() {
    console.log(this.withdrawForm.value);
    this.isSubmit = true;
    if (this.withdrawForm.invalid || this.loading) {
      return false;
    }

    if (this.withdrawForm.get('money').value % 10 !== 0) {
      this.dialogSvc.show({title: '温馨提示', content: '您的提现元素必须是10的整数倍', cancel: '', confirm: '我知道了'}).subscribe();
      return false;
    }

    this.loading = true;
    this.toastSvc.loading('提取中');
    this.financeSvc.withdrawal(this.withdrawForm.value).subscribe(res => {
      this.toastSvc.hide();
      this.loading = false;
      if (res.code === '0000') {
        this.dialogSvc.show({
          title: '温馨提示',
          content: '您已成功提现' + this.withdrawForm.get('money').value + '个元素',
          cancel: '返回上一页',
          confirm: '继续提现'
        }).subscribe((_res) => {
          if (_res.value) {
          } else {
            this.location.back();
          }
        });
      } else {
        this.dialogSvc.show({
          title: '温馨提示',
          content: res.msg,
          cancel: '',
          confirm: '我知道了'
        }).subscribe();
      }
    });
  }

  cancel() {
    this.location.back();
  }

}
