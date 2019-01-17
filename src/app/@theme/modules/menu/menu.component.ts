import {Component, OnInit} from '@angular/core';
import {MenuService} from './menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  show = false;

  constructor(private menuSvc: MenuService) {
    menuSvc.get().subscribe(res => {
      this.show = res;
    });
  }

  ngOnInit() {
  }
}
