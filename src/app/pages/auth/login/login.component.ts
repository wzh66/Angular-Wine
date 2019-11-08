import {Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ViewEncapsulation, ElementRef} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {LocationStrategy} from '@angular/common';

import {interval as observableInterval, Observable} from 'rxjs';
import {UaService} from '../../../@core/data/ua.service';
import {LoaderService} from '../../../@core/utils/loader.service';
import {AuthService} from '../auth.service';
import {AppService} from '../../../app.service';
import {DialogService} from 'ngx-weui';
import {StorageService} from '../../../@core/utils/storage.service';
import {OverlayService, OverlayComponent} from '../../../@theme/modules/overlay';
import {fmtCallbackUrl} from '../../../utils/utils';

declare var initGeetest: any;

@Component({
  selector: 'app-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthLoginComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('container', {static: false}) private container: any;
  @ViewChild('userinfo', {static: false}) private userinfo: any;
  @ViewChild('auth', {static: false}) private auth: any;

  openid = this.route.snapshot.queryParams['openid'] ? this.route.snapshot.queryParams['openid'] : '';
  referee = this.authSvc.referee();
  sourceChannel = this.storageSvc.get('sourceChannel') ? this.storageSvc.get('sourceChannel') : '';
  callbackUrl = this.route.snapshot.queryParams['callbackUrl'];
  appConfig;

  type = this.route.snapshot.queryParams['type'] || 'signIn';

  signInForm: FormGroup;
  signUpForm: FormGroup;
  isSignInFormSubmit = false;
  isSignUpFormSubmit = false;
  loading = false;

  captchaObj;
  randomValidUid;

  authHeight;

  activeText = '获取验证码';
  activeClass = true;
  second = 59;
  timePromise;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private location: LocationStrategy,
              private storageSvc: StorageService,
              private uaSvc: UaService,
              private appSvc: AppService,
              private overlaySvc: OverlayService,
              private dialog: DialogService,
              private loadSvc: LoaderService,
              private authSvc: AuthService) {
  }

  ngAfterViewInit() {
    this.auth.nativeElement.style.height = (this.container.nativeElement.clientHeight - this.userinfo.nativeElement.clientHeight) + 'px';
  }

  ngOnInit() {
    this.storageSvc.remove('accessToken');
    this.signInForm = new FormGroup({
      loginid: new FormControl('', [Validators.required, Validators.min(10000000000), Validators.max(19999999999)]),
      pwd: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]),
      openid: new FormControl(this.openid, [])
    });

    this.signUpForm = new FormGroup({
      loginid: new FormControl('', [Validators.required, Validators.min(10000000000), Validators.max(19999999999)]),
      pwd: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]),
      tradepwd: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]),
      validCode: new FormControl('', [Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4)]),
      openid: new FormControl(this.openid, []),
      usid: new FormControl('', []),
      referee: new FormControl(this.referee, []),
      sourceChannel: new FormControl(this.sourceChannel, []),
      agree: new FormControl('', [Validators.required, Validators.requiredTrue])
    });

    this.location.onPopState(state => {
      this.overlaySvc.hide();
    });

    if (this.uaSvc.isWx()) {
      if (!this.openid) {
        window.location.href = '/api/interface/comm/auth.html?callbackUrl=' + encodeURI(window.location.href);
      }
    }

    this.randomValidUid = new Date().getTime();
    this.authSvc.getValidImg(this.randomValidUid).subscribe(res => {
      const data = JSON.parse(res.result);
      initGeetest({
        gt: data.gt,
        challenge: data.challenge,
        product: 'popup', // 产品形式，包括：float，embed，popup。注意只对PC版验证码有效
        offline: !data.success // 表示用户后台检测极验服务器是否宕机，一般不需要关注
      }, captchaObj => {
        this.handlerPopup(captchaObj);
      });
    });

    /*this.appSvc.get().subscribe(res => {
      this.appConfig = res.result;
    });*/
  }

  handlerPopup(captchaObj) {
    this.captchaObj = captchaObj;
    // 弹出式需要绑定触发验证码弹出按钮
    captchaObj.bindOn('#sendValidCode');

    // 将验证码加到id为captcha的元素里
    captchaObj.appendTo('#popup-captcha');
  }

  sendValidCode() {

    if (!this.activeClass) {
      return false;
    }

    if (this.signUpForm.get('loginid').invalid) {
      this.dialog.show({
        content: '请输入手机号！',
        cancel: '',
        confirm: '我知道了'
      }).subscribe(data => {
      });
    }

    const validate = this.captchaObj.getValidate();
    if (!validate) {
      alert('请先完成验证！');
      return false;
    }

    this.authSvc.sendValidCode({
      geetest_challenge: validate.geetest_challenge,
      geetest_validate: validate.geetest_validate,
      geetest_seccode: validate.geetest_seccode,
      randomValidUid: this.randomValidUid,
      phone: this.signUpForm.get('loginid').value,
      type: 1
    }).subscribe(res => {
      if (res.code === '0000') {
        if (!this.activeClass) {
          return false;
        }
        this.activeClass = false;
        // $scope.loadingToast.open(false);
        this.timePromise = observableInterval(1000).subscribe(() => {
          if (this.second <= 0) {
            this.timePromise.unsubscribe();

            this.second = 59;
            this.activeText = '重发验证码';
            this.activeClass = true;
            document.getElementById('sendValidCode').style.display = 'block';
            document.getElementById('origin_sendValidCode').style.display = 'none';
          } else {
            document.getElementById('sendValidCode').style.display = 'none';
            document.getElementById('origin_sendValidCode').style.display = 'block';
            this.activeText = '' + this.second + 's';
            this.activeClass = false;
            this.second = this.second - 1;
          }
        });
      }
    });
  }

  signUp() {
    this.isSignUpFormSubmit = true;
    if (this.signUpForm.invalid) {
      if (this.signUpForm.get('loginid').valid && this.signUpForm.get('pwd').valid &&
        this.signUpForm.get('validCode').valid && this.signUpForm.get('agree').invalid) {
        this.dialog.show({content: '请勾选用户协议', confirm: '我知道了', cancel: ''}).subscribe();
      }
      return false;
    }

    this.authSvc.signUp(this.signUpForm.value).subscribe(res => {
      if (res.code === '0000') {
        this.storageSvc.remove('referee');
        this.storageSvc.remove('sourceChannel');
        this.storageSvc.set('accessToken', JSON.stringify({
          id: res.result.id,
          key: res.result.key,
          openid: res.openid || this.openid,
          expires_time: Date.parse(String(new Date())) + 144000000
        }));
        if (this.callbackUrl && (this.callbackUrl.indexOf('signIn') === -1 && this.callbackUrl.indexOf('signUp') === -1)) {
          this.router.navigateByUrl(fmtCallbackUrl(this.route.snapshot.queryParams['callbackUrl']));
        } else {
          this.router.navigate(['/admin/home']);
        }
      } else {
        this.dialog.show({content: res.msg, confirm: '我知道了'}).subscribe();
      }
    });
  }

  signIn() {
    this.isSignInFormSubmit = true;
    if (this.signInForm.invalid) {
      return false;
    }

    this.authSvc.signIn(this.signInForm.value).subscribe(res => {
      if (res.code === '0000') {
        console.log(res);
        this.storageSvc.set('accessToken', JSON.stringify({
          id: res.result.id,
          key: res.result.key,
          openid: res.openid || this.openid,
          expires_time: Date.parse(String(new Date())) + 144000000
        }));

        if (this.callbackUrl && (this.callbackUrl.indexOf('signIn') === -1 && this.callbackUrl.indexOf('signUp') === -1)) {
          this.router.navigateByUrl(fmtCallbackUrl(this.route.snapshot.queryParams['callbackUrl']));
        } else {
          this.router.navigate(['/admin/home']);
        }
      } else if (res.code === '9999') {
        this.dialog.show({content: res.msg, confirm: '我知道了'}).subscribe();
      }
    });
  }

  showOverlay() {
    this.location.pushState('advert', 'overlay', this.location.path(), '');
    this.overlaySvc.show();
  }

  back() {
    this.location.back();
  }

  ngOnDestroy() {
    if (this.timePromise) {
      this.timePromise.unsubscribe();
    }
  }
}
