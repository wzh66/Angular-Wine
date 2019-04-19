import {Component, Input, OnDestroy} from '@angular/core';
import {DirectionService} from '../../animates/direction.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnDestroy {
  @Input() paddingHeader = false;
  @Input() paddingFooter = false;
  @Input() monitor = '';

  scrollTop = 0;

  constructor(private directionSvc: DirectionService) {
  }

  onScroll(e) {
    if (this.monitor === 'scroll') {
      e.preventDefault();
      this.directionSvc.set({
        direction: e.target.scrollTop > this.scrollTop ? 'down' : 'up', // 滚动方向 '上' 或者 '下'
        scrollTop: e.target.scrollTop, // 滚动位置到顶端的距离
        clientHeight: e.target.clientHeight, // 容器的高度
        scrollHeight: e.target.scrollHeight // 内容高度
      });
      if (e.target.scrollTop >= 0) {
        if (e.target.scrollTop <= e.target.scrollHeight) {
          this.scrollTop = e.target.scrollTop;
        } else {
          this.scrollTop = e.target.scrollHeight;
        }
      } else {
        this.scrollTop = 0;
      }
    }
  }

  ngOnDestroy() {
    this.directionSvc.set({
      direction: '',
      scrollTop: 0,
      scrollHeight: '',
      clientHeight: ''
    });
  }
}
