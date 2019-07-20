import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ToastService, PickerService} from 'ngx-weui';
import {WxService} from '../../../@theme/modules/wx';
import {AuthService} from '../../auth/auth.service';
import {CheckoutService} from '../../admin/checkout/checkout.service';
import {AddressService} from '../../admin/setting/address/address.service';
import {GroupService} from '../group.service';
import {PayDto} from '../../../@core/dto/pay.dto';

@Component({
  selector: 'app-group-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class GroupItemComponent implements OnInit {
  imgs = ['/assets/images/group/banner.jpg'];
  qty = 1;
  loading = false;
  config = {
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    pagination: true,
    autoplay: {
      delay: 3000
    }
  };
  key;
  referee = this.route.snapshot.queryParams['referee'];
  activity;
  groupForm: FormGroup;
  address;
  addresses;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private toastSvc: ToastService,
              private wxSvc: WxService,
              private pickerSvc: PickerService,
              private authSvc: AuthService,
              private checkoutSvc: CheckoutService,
              private addressSvc: AddressService,
              private groupSvc: GroupService) {
  }

  ngOnInit() {

    this.key = this.authSvc.getKey();

    this.groupForm = new FormGroup({
      key: new FormControl(this.key, [Validators.required]),
      actionId: new FormControl(this.route.snapshot.params['id'], [Validators.required]),
      teamId: new FormControl(this.route.snapshot.queryParams['teamId'], [])
    });

    this.groupSvc.get(this.key).subscribe(res => {
      console.log(res.activeAction);
      // this.activity.info = res.activeAction;
      // this.activity.group = res.activeTeamInfo;
      this.activity = res;
      console.log(this.activity);
    });

    this.addressSvc.get(this.key).subscribe(res => {
      if (res.list.length > 0) {
        this.address = res.list[0];
        const addresses = [];
        res.list.forEach(address => {
          addresses.push({
            label: '[' + address.consignee + ']' + address.province + address.city + address.district + address.address,
            value: address
          });
          if (address.status === 1) {
            this.address = address;
          }
        });
        addresses.push({label: '添加新地址', value: 0});
        this.addresses = addresses;
        // this.checkoutForm.get('addrId').setValue(this.address.id);
      }
    });
  }

  show() {
    this.pickerSvc.show([this.addresses], '', [0], {
      cancel: '取消',
      confirm: '确定',
      backdrop: true
    }).subscribe(res => {
      console.log(res);
      if (res.value === '添加新地址') {
        this.router.navigate(['/admin/setting/address/edit/0']);
      } else {
        // this.store = '';
        // this.checkoutForm.get('storeId').setValue('');
        // this.checkoutForm.get('addrId').setValue('');
        this.address = res.value;
        // this.checkoutForm.get('addrId').setValue(res.value.id);
      }
    });
  }

  onClick(e) {
    if (e) {
      if (this.loading) {
        return false;
      }
      this.loading = true;
      this.toastSvc.loading('处理中', 0);
      this.groupSvc.create(this.groupForm.value).subscribe(res => {
        console.log(res);
        this.loading = false;
        this.toastSvc.hide();
        const body: PayDto = {
          appId: res.appId,
          timeStamp: res.timeStamp,
          nonceStr: res.nonceStr,
          package: res.package,
          signType: res.signType,
          paySign: res.paySign,
          orderNo: res.orderNo
        };
        this.groupSvc.wxPay(body);
      });
    }
  }

  onShare() {
    this.wxSvc.config({
      title: '新美食计划拼拼团！',
      desc: '1块钱的' + this.activity.activeAction.productname + '需要你的助力，谢谢啦>>>',
      link: 'http://www.newplan123.com/group/item/' + this.groupForm.get('actionId').value +
        '?referee=' + this.key + '&teamId=' + this.activity.activeTeamInfo[0].activeteamid,
      imgUrl: 'http://www.newplan123.com/api' + this.activity.activeAction.headimage
    }).then(() => {
      console.log('注册成功');
      // 其它操作，可以确保注册成功以后才有效
      // this.status = '注册成功';
    }).catch((err: string) => {
      console.log(`注册失败，原因：${err}`);
      // this.status = `注册失败，原因：${err}`;
    });
    this.wxSvc.show({targetTips: '继续邀请好友吧！'}).subscribe(res => {
      console.log(res);
    });
  }

  get isOwner() {
    return !this.referee || this.referee === this.key;
  }

}
