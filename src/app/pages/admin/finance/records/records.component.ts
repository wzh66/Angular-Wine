import {Component, OnInit} from '@angular/core';
import {LocationStrategy} from '@angular/common';
import {timer as observableTimer} from 'rxjs/index';
import {InfiniteLoaderComponent} from 'ngx-weui';

import {AuthService} from '../../../auth/auth.service';
import {FinanceService} from '../finance.service';

@Component({
  selector: 'app-admin-finance-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class AdminFinanceRecordsComponent implements OnInit {
  key = this.authSvc.getKey();
  records;
  page = 1;
  totalPages;

  constructor(private location: LocationStrategy,
              private authSvc: AuthService,
              private financeSvc: FinanceService) {
  }

  ngOnInit() {
    this.financeSvc.getWithdrawals(this.key, 1).subscribe(res => {
      if (res.code === '0000') {
        this.records = res.result.list;
        console.log(this.records);
        this.totalPages = res.result.totalPages;
      }
    });
  }

  onLoadMore(comp: InfiniteLoaderComponent) {
    observableTimer(500).subscribe(() => {

      this.page = this.page + 1;

      this.financeSvc.getWithdrawals(this.key, this.page).subscribe(res => {
        this.records = this.records.concat(res.result.list);
        this.totalPages = res.result.totalPages;
      });

      if (this.page >= this.totalPages) {
        comp.setFinished();
        return;
      }
      comp.resolveLoading();
    });
  }

  back() {
    this.location.back();
  }
}
