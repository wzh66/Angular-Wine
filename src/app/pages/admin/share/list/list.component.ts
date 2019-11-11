import {Component, OnInit} from '@angular/core';
import {ShareService} from '../share.service';
import {AuthService} from '../../../auth/auth.service';

@Component({
  selector: 'app-admin-share-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class AdminShareListComponent implements OnInit {
  list = [];
  key = this.authSvc.getKey();

  constructor(private shareSvc: ShareService,
              private authSvc: AuthService) {
  }

  ngOnInit() {
    this.shareSvc.getList(this.key).subscribe(res => {
      this.list = res.list;
      console.log(this.list);
    });
  }

}
