import {Component, Input} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {LocationStrategy} from '@angular/common';
import {DirectionService} from '../../animates/direction.service';
import {MenuService} from '../../modules/menu/menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() show;
  @Input() title;
  @Input() showMenu = '';

  direction;

  constructor(private titleService: Title,
              private location: LocationStrategy,
              private directionSvc: DirectionService,
              private menuSvc: MenuService) {
    titleService.setTitle(this.title);
    directionSvc.get().subscribe(res => {
      this.direction = res.direction;
    });
  }

  menu() {
    this.menuSvc.show();
  }

  back() {
    this.location.back();
  }
}
