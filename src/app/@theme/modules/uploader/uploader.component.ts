import {Component} from '@angular/core';

import {Uploader, UploaderOptions} from 'ngx-weui';
import {UploaderService} from './uploader.service';

@Component({
  selector: 'app-overlay',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent {

  uploader: Uploader = new Uploader({
    url: './upload.php',
    headers: [{name: 'auth', value: 'test'}],
    params: {
      a: 1,
      b: new Date(),
      c: 'test',
      d: 12.123,
    },
    // 自定义transport
    // uploadTransport: function(item: FileItem) {
    //     return Observable.create(observer => {
    //         setTimeout(() => {
    //             observer.next(true);
    //             observer.complete();
    //         }, 1000 * 3);
    //     });
    // },
    onFileQueued() {
      console.log('onFileQueued', arguments);
    },
    onFileDequeued() {
      console.log('onFileDequeued', arguments);
    },
    onStart() {
      console.log('onStart', arguments);
    },
    onCancel() {
      console.log('onCancel', arguments);
    },
    onFinished() {
      console.log('onFinished', arguments);
    },
    onUploadStart() {
      console.log('onUploadStart', arguments);
    },
    onUploadProgress() {
      console.log('onUploadProgress', arguments);
    },
    onUploadSuccess() {
      console.log('onUploadSuccess', arguments);
    },
    onUploadError() {
      console.log('onUploadError', arguments);
    },
    onUploadComplete() {
      console.log('onUploadComplete', arguments);
    },
    onUploadCancel() {
      console.log('onUploadCancel', arguments);
    },
    onError() {
      console.log('onError', arguments);
    },
  } as UploaderOptions);

  img: any;
  imgShow = false;

  onGallery(item: any) {
    this.img = [{file: item._file, item}];
    this.imgShow = true;
  }

  onDel(item: any) {
    console.log(item);
    this.uploader.removeFromQueue(item.item);
  }
}
