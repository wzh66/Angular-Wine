import {Component, OnInit} from '@angular/core';
import {CashCardService} from './cash-card.service';

@Component({
  selector: 'app-admin-cash-card',
  templateUrl: './cash-card.component.html',
  styleUrls: ['./cash-card.component.scss']
})
export class AdminCashCardComponent implements OnInit {
  items = [];

  constructor(private cashSvc: CashCardService) {
  }

  ngOnInit() {
    this.cashSvc.get().subscribe(res => {
      this.items = res.list;
      console.log(this.items);
    });
  }


}
