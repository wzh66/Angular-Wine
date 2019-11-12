import {timer as observableTimer, Observable} from 'rxjs';
import {Component, OnInit, ViewChild} from '@angular/core';
import {Location} from '@angular/common';

import {AuthService} from '../../../auth/auth.service';
import {CommissionService} from '../commission.service';
import {DialogService, InfiniteLoaderComponent} from 'ngx-weui';
import {ShareService} from '../../share/share.service';


@Component({
  selector: 'app-admin-commission-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class AdminCommissionListComponent implements OnInit {

  key = this.authSvc.getKey();
  list = [];

  constructor(private location: Location,
              private dialogSvc: DialogService,
              private authSvc: AuthService,
              private commissionSvc: CommissionService,
              private shareSvc: ShareService) {
    this.shareSvc.getList(this.key).subscribe(res => {
      this.list = res.list;
    });
  }

  ngOnInit() {
  }

  onCancel(e) {
    if (e === 'cancel') {
      this.location.back();
    }
  }

}
