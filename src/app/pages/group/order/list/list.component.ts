import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../auth/auth.service';
import {GroupService} from '../../group.service';

@Component({
  selector: 'app-group-order-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class GroupOrderListComponent implements OnInit {
  key = this.authSvc.getKey();

  constructor(private authSvc: AuthService,
              private groupSvc: GroupService) {
  }

  ngOnInit() {
    this.groupSvc.get(this.key).subscribe(res => {
      console.log(res);
    });
  }
}
