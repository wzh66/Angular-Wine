import {Component, OnInit, ViewChild} from '@angular/core';

import {DialogService} from 'ngx-weui';
import {AuthService} from '../../auth/auth.service';
import {UserService} from '../../../@core/data/user.service';
import {H2cService} from '../../../@core/data/h2c.service';

declare var QRCode: any;
declare var html2canvas: any;

@Component({
  selector: 'app-admin-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})

export class AdminShareComponent implements OnInit {
  key;
  webHost: string;
  user;
  qrCode;
  @ViewChild('target') private target;

  constructor(private dialogSvc: DialogService,
              private authSvc: AuthService,
              private userSvc: UserService) {
  }

  ngOnInit() {
    this.key = this.authSvc.getKey();
    this.userSvc.get(this.key).subscribe(res => {
      this.webHost = res.shortLinks;
      console.log(res.shortLinks);

      this.qrCode = new QRCode(document.getElementById('qrcode'), {
        text: 'http://' + window.location.host + '/index?referee=' + this.authSvc.getUid(),
        width: 256,
        height: 256,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      });
    });
  }

  copy() {
    const copyHttp = this.target.nativeElement.querySelector('#invite_code');
    const range = document.createRange();

    range.selectNode(copyHttp);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    this.dialogSvc.show({title: '温馨提示', content: '复制成功', cancel: '', confirm: '我知道了'}).subscribe();
  }
}
