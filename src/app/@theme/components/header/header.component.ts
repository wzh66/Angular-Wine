import {Component, Input} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {LocationStrategy} from '@angular/common';
import {DirectionService} from '../../animates/direction.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() show;
  @Input() title;

  direction;

  constructor(private titleService: Title,
              private location: LocationStrategy,
              private directionSvc: DirectionService) {
    titleService.setTitle(this.title);
    directionSvc.getScrollingStatus().subscribe(res => {
      this.direction = res;
    });
  }

  back() {
    this.location.back();
  }
}
