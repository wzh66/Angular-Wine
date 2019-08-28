import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {GroupService} from '../group.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class GroupListComponent implements OnInit {
  key;

  constructor(private authSvc: AuthService,
              private groupSvc: GroupService) {
  }

  ngOnInit() {
    this.key = this.authSvc.getKey();
  }
}
