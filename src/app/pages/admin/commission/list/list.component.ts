import {timer as observableTimer, Observable} from 'rxjs';
import {Component, OnInit, ViewChild} from '@angular/core';
import {Location} from '@angular/common';

import {AuthService} from '../../../auth/auth.service';
import {CommissionService} from '../commission.service';
import {DialogService, InfiniteLoaderComponent} from 'ngx-weui';


@Component({
  selector: 'app-admin-commission-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class AdminCommissionListComponent implements OnInit {

  key;

  @ViewChild('comp', {static: false}) private il: InfiniteLoaderComponent;

  page = 1;
  records: any;

  constructor(private location: Location,
              private dialogSvc: DialogService,
              private authSvc: AuthService,
              private commissionSvc: CommissionService) {
  }

  ngOnInit() {
    /*this.key = this.authSvc.getKey();*/

    this.getData();
  }

  onSelect(tab) {
    this.il.restart();
    this.getData();
  }

  getData() {
    this.commissionSvc.list(this.key, 1, this.page).subscribe(res => {
      this.records = res;
      console.log(this.records);
    });
  }

  onLoadMore(comp: InfiniteLoaderComponent) {
    observableTimer(1500).subscribe(() => {

      this.page = this.page + 1;

      this.commissionSvc.list(this.key, 1, this.page).subscribe(res => {
        this.records = this.records.concat(res);
        if (res.length < 20) {
          comp.setFinished();
          return;
        }
      });
      comp.resolveLoading();
    });
  }

  onCancel(e) {
    if (e === 'cancel') {
      this.location.back();
    }
  }

}
