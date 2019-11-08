import {Component, OnInit} from '@angular/core';
import {ShareService} from '../share.service';

@Component({
  selector: 'app-admin-share-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class AdminShareListComponent implements OnInit {
  list = [];

  constructor(private shareSvc: ShareService) {
  }

  ngOnInit() {
    this.shareSvc.getList().subscribe(res => {
      this.list = res.list;
      console.log(this.list);
    });
  }

}
