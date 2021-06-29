import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UserLogin } from '../models/userLogin';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit, OnDestroy {

  sub: Subscription;
  userPict = 'http://172.16.0.15/aeweb/picture/PICTURE2//Employee//avatarShow.png';
  getPassword = '';
  enterPassword = '';

  userInfo: UserLogin;

  constructor(private authService: AuthService,
              private route: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    // console.log('auth page -> ', this.authService.getUserInfo());
    if (!this.authService.getUserInfo()) {
      this.userPict = 'http://172.16.0.15/aeweb/picture/PICTURE2//Employee//avatarShow.png';
      this.getPassword = '';
      this.enterPassword = '';
    }
  }

  async changeAvatar(e: any) {
    console.log(e.target.value);
    const event = e.target.value;
    if (event && event.trim() !== '') {
      this.sub = await this.authService.getUser(event).subscribe(
        (data: any) => {
          if (data.length > 0) {
            this.userInfo = data;
            this.userPict = data[0].userPicture;
            // this.userPict = data[0].userPicture;
            this.getPassword = data[0].userPassword;
            // this.getUserID = data[0].userID;
            // this.getUserPict = data[0].userPicture;
            // console.log(this.userInfo);
          } else {
            // No picture
            this.userPict = 'http://172.16.0.15/aeweb/picture/PICTURE2//Employee//avatarShow.png';
          }
        });
    }
  }

  login() {
    if (this.getPassword === this.enterPassword) {
      this.authService.setUserInfo(this.userInfo);
      this.authService.login();
      this.route.navigateByUrl('/tabs/orderstatus');
    } else {
      alert('Password ไม่ถูกต้อง');
    }
  }

  logout() {
    this.authService.logout();
    this.userPict = 'http://172.16.0.15/aeweb/picture/PICTURE2//Employee//avatarShow.png';
    this.getPassword = '';
    this.enterPassword = '';
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
