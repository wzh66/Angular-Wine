import {Component, Input, OnInit, Output} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {LocationStrategy} from '@angular/common';
import {DirectionService} from '../../animates/direction.service';
import {MenuService} from '../menu/menu.service';
import {WxService} from '../wx';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() show;
  @Input() title;
  @Input() leftNav = 'back';
  @Input() rightNav = '';
  @Input() className = 'black';
  @Input() custom = '';
  @Output() onCustom;

  direction;

  constructor(private titleService: Title,
              private location: LocationStrategy,
              private directionSvc: DirectionService,
              private menuSvc: MenuService,
              private wxSvc: WxService) {
    directionSvc.get().subscribe(res => {
      this.direction = res.direction;
    });
  }

  ngOnInit() {
    this.titleService.setTitle(this.title);
  }

  share() {
    console.log('show');
    this.wxSvc.show({}).subscribe(res => {
    });
  }

  menu() {
    this.menuSvc.show();
  }

  search() {
    console.log('search');
  }

  back() {
    this.location.back();
  }
}
