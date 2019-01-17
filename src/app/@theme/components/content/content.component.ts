import {Component, OnInit, Input} from '@angular/core';
import {DirectionService} from '../../animates/direction.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {
  @Input() paddingHeader = false;
  @Input() paddingFooter = false;

  scrollTop = 0;

  constructor(private directionSvc: DirectionService) {
  }

  onScroll(e) {
    e.preventDefault();
    const top = e.target.scrollTop;
    let direction = '';
    if (top > this.scrollTop) {
      direction = 'down';
    } else {
      direction = 'up';
    }
    this.directionSvc.setScrollingStatus(direction);
    this.scrollTop = top;
  }
}
