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
import {getIndex} from "../../../utils/utils";

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
  key = this.authSvc.getKey();
  uid = this.authSvc.getUid();
  teamId;
  activity;
  groupForm: FormGroup;
  address;
  addresses;
  isCreated = false;
  isJoined = false;
  isOwner = false;
  isClosed = false;
  btnTxt = '';

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
    this.teamId = this.route.snapshot.queryParams['teamId'] || '';
    this.groupForm = new FormGroup({
      key: new FormControl(this.key, [Validators.required]),
      actionId: new FormControl(this.route.snapshot.params['id'], [Validators.required]),
      teamId: new FormControl(this.teamId, [])
    });

    this.groupSvc.get(this.key, this.teamId).subscribe(res => {
      this.activity = res;
      this.isJoined = typeof getIndex(this.activity.activeTeamInfo, 'userid', parseInt(this.uid, 10)) === 'number';
      this.isCreated = this.activity.activeTeamInfo.length > 0;
      this.isClosed = this.activity.activeTeamInfo.length >= 3;
      this.isOwner = this.authSvc.getUid() ===
        this.activity.activeTeamInfo[getIndex(this.activity.activeTeamInfo, 'iscommander', 1)].userid;

      if (this.isCreated) {
        if (this.isClosed) {
          this.btnTxt = '成功拼团';
        } else {
          if (this.isOwner) {
            this.btnTxt = '您已成功开团';
          } else {
            if (this.isJoined) {
              this.btnTxt = '您已成功入团';
            } else {
              this.btnTxt = '我要加入';
            }
          }
        }
      } else {
        this.btnTxt = '我要开团';
      }
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

  open(e) {
    if (e) {
      if (this.loading) {
        return false;
      }
      this.loading = true;
      this.toastSvc.loading('处理中', 0);
      this.groupSvc.create(this.groupForm.value).subscribe(res => {
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
        '?teamId=' + this.activity.activeTeamInfo[0].activeteamid,
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

}
