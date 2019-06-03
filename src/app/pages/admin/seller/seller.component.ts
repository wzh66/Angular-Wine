import {Component, Inject, OnInit} from '@angular/core';

import {Uploader, UploaderOptions} from 'ngx-weui';

import {AuthService} from '../../auth/auth.service';
import {FooterService} from '../../../@theme/modules/footer/footer.service';

@Component({
  selector: 'app-admin-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss']
})

export class AdminSellerComponent implements OnInit {
  img: any;
  imgShow = false;

  uploader: Uploader = new Uploader({
    url: this.prefix_url + 'uploadStoreLogo',
    limit: 1,
    auto: true,
    // headers: [{name: 'auth', value: 'test'}],
    params: {
      key: this.authSvc.getKey()
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
    onError() {
      console.log('onError', arguments);
    }
  } as UploaderOptions);

  constructor(@Inject('PREFIX_URL') private prefix_url, private footerSvc: FooterService, private authSvc: AuthService) {
    footerSvc.setActive(3);
  }

  ngOnInit() {
  }

  onGallery(item: any) {
    this.img = [{file: item._file, item}];
    this.imgShow = true;
  }

  onDel(item: any) {
    console.log(item);
    this.uploader.removeFromQueue(item.item);
  }
}
