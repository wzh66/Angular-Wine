import {Component, OnInit} from '@angular/core';
import {DialogService} from 'ngx-weui';

@Component({
  selector: 'app-admin-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  constructor(private dialogSvc: DialogService) {
    this.dialogSvc.show({title: '系统提示', content: '去死吧', cancel: '返回', confirm: '确定'}).subscribe();
  }

  ngOnInit() {
  }

}
