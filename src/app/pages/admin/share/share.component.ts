import {Component, OnInit, ViewChild} from '@angular/core';

import {DialogService} from 'ngx-weui';
import {AuthService} from '../../auth/auth.service';
import {UserService} from '../../../@core/data/user.service';

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
      console.log(res);
      this.user = res;
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
