import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {getIndex} from '../../utils/utils';

@Pipe({
  name: 'repairDate',
  pure: false
})

@Injectable()
export class RepairDatePipe implements PipeTransform {
  transform(value): any {
    value = value.split('.')[0].replace(/\-/g, '/');
    return value;
  }
}

@Pipe({
  name: 'keys',
  pure: false
})

@Injectable()
export class KeysPipe implements PipeTransform {
  transform(value, args: string[]): any {
    const keys = [];
    for (const key in value) {
      if (key) {
        keys.push({key: key, value: value[key]});
      }
    }
    return keys;
  }
}

@Pipe({
  name: 'searchKey',
  pure: false
})

@Injectable()
export class SearchKeyPipe implements PipeTransform {
  transform(value, searchKey): any {
    if (!searchKey) {
      return value;
    }

    return value.replace(searchKey, '<em>' + searchKey + '</em>');
  }
}

@Pipe({
  name: 'getLabel',
  pure: false
})

@Injectable()
export class GetLabelPipe implements PipeTransform {
  transform(value, array: any): any {
    if (!value || !array) {
      return value;
    }
    const label = array[getIndex(array, 'value', value)].label;
    return label;
  }
}

@Pipe({
  name: 'picNumber',
  pure: false
})

@Injectable()
export class PicNumberPipe implements PipeTransform {
  transform(num): any {
    let html = '';
    num.toString().split('').forEach((n) => {
      html = html + '<em><img src="/assets/game/mouse/images/num_' + n + '.png"></em>';
    });

    return html;
  }
}

@Pipe({
  name: 'rmb',
  pure: false
})
// <em class="money"><i class="rmb">￥</i><span>{{item.price}}</span><i class="decimal">.00</i></em>
@Injectable()
export class RmbPipe implements PipeTransform {
  transform(num): any {
    if (!num && num !== 0) {
      return num;
    }
    const numStr = num.toFixed(2).toString();
    let result = '';
    if (numStr.indexOf('.') === -1) {
      result = '<i class="rmb">￥</i><span>' + num + '</span><i class="decimal">.00</i>';
    } else {
      const numArr = numStr.split('.');
      result = '<i class="rmb">￥</i><span>' + numArr[0] + '</span><i class="decimal">.' + numArr[1] + '</i>';
    }

    return result;
  }
}

@Pipe({
  name: 'formatSrc',
  pure: false
})
// <em class="money"><i class="rmb">￥</i><span>{{item.price}}</span><i class="decimal">.00</i></em>
@Injectable()
export class FormatSrcPipe implements PipeTransform {
  transform(content): any {
    if (!content) {
      return content;
    }
    content = content.replace(/src="/gi, 'src="/api');

    return content;
  }
}

@Pipe({
  name: 'distance',
  pure: false
})
// <em class="money"><i class="rmb">￥</i><span>{{item.price}}</span><i class="decimal">.00</i></em>
@Injectable()
export class DistancePipe implements PipeTransform {
  transform(meters): any {
    if (!meters) {
      return meters;
    }
    let html = '';
    if (meters < 1000) {
      html = `<em class="money"><i class="rmb">距离</i><span>${meters}</span><i class="decimal">米</i></em>`;
    } else {
      html = `<em class="money"><i class="rmb">距离</i><span>${Math.round(meters / 1000)}</span><i class="decimal">公里</i></em>`;
    }

    return html;
  }
}

@Pipe({
  name: 'detail',
  pure: false
})
// <em class="money"><i class="rmb">￥</i><span>{{item.price}}</span><i class="decimal">.00</i></em>
@Injectable()
export class DetailPipe implements PipeTransform {
  transform(html): any {
    if (!html) {
      return html;
    }
    return html.replace(/img src="/g, 'img src="/api');
  }
}
