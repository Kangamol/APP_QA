import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { QaFinishDetail } from 'src/app/models/qaFinishDetail';
import { QasalesService } from 'src/app/services/qasales.service';
import { UserLogin } from 'src/app/models/userLogin';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-qa-finish-detail',
  templateUrl: './qa-finish-detail.page.html',
  styleUrls: ['./qa-finish-detail.page.scss'],
})
export class QaFinishDetailPage implements OnInit, OnDestroy {

  qaFinishDetail: QaFinishDetail[];
  sub: Subscription;
  user: UserLogin;

  finishID = '';
  fullName: string;
  OrderNumber: string;
  finishdate: string;
  thaiDate: string;
  showIcon: string;
  avatar: string;
  qaDoc: string;
  nickName: string;

  constructor(private service: QasalesService,
              private loadingCtrl: LoadingController,
              private nav: NavController,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) {
                      this.finishID = this.route.snapshot.paramMap.get('finishID');
                      this.fullName = this.route.snapshot.paramMap.get('fullName');
                      this.OrderNumber = this.route.snapshot.paramMap.get('OrderNumber');
                      this.finishdate = this.route.snapshot.paramMap.get('date');
                      this.thaiDate = this.route.snapshot.paramMap.get('thaiDate');
                      this.showIcon = this.route.snapshot.paramMap.get('showIcon');
                      this.avatar = this.route.snapshot.paramMap.get('avatar');
                      this.qaDoc = this.route.snapshot.paramMap.get('qaDoc');
                      this.nickName = this.route.snapshot.paramMap.get('nickName');
                    }

  ngOnInit() {
    this.user = this.authService.getUserInfo();
  }

  ionViewWillEnter() {
    this.user = this.authService.getUserInfo();
    this.loaddata();
    if (!this.user) {
      this.router.navigateByUrl('/auth');
    } else {
      console.log(this.user[0].saleManager);
      this.loaddata();
    }
  }

  async loaddata() {
    const loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'กำลังโหลด'
    });
    await loading.present();

    this.sub = this.service.qaFinishDetail(this.finishID).subscribe(
     (data) => {
       this.qaFinishDetail = data;
      //  console.log(this.qaFinishDetail);
       },

       async (err) => {
         console.log(err);
         await loading.dismiss();
       },
       async () => {
         await loading.dismiss();
       });
    }


    ngOnDestroy() {
      this.sub.unsubscribe();
    }


}
