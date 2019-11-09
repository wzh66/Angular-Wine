import {Component, OnInit} from '@angular/core';
import {CashCardService} from './cash-card.service';
import {StorageService} from '../../../@core/utils/storage.service';
import {Location} from '@angular/common';
import {DialogService} from 'ngx-weui';

@Component({
  selector: 'app-admin-cash-card',
  templateUrl: './cash-card.component.html',
  styleUrls: ['./cash-card.component.scss']
})
export class AdminCashCardComponent implements OnInit {
  cashItems = [];

  constructor(private storageSvc: StorageService,
              private cashSvc: CashCardService,
              private location: Location) {
  }

  ngOnInit() {
    this.cashSvc.get().subscribe(res => {
      res.list.forEach((item) => {
        item.count = 1;
      });
      this.cashItems = res.list;
    });
  }

  numChange(item, e) {
    this.storageSvc.set('cashItems', JSON.stringify(this.cashItems));
    console.log(this.cashItems);
  }

  back() {
    this.location.back();
  }

}
