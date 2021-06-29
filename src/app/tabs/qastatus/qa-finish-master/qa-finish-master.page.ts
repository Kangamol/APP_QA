import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { QasalesService } from './../../../services/qasales.service';
import { Router } from '@angular/router';

import { QaFinishMaster } from './../../../models/qaFinishMaster';
import { UserLogin } from 'src/app/models/userLogin';

@Component({
  selector: 'app-qa-finish-master',
  templateUrl: './qa-finish-master.page.html',
  styleUrls: ['./qa-finish-master.page.scss'],
})
export class QaFinishMasterPage implements OnInit, OnDestroy {

  sub: Subscription;
  qaFinishMaster: QaFinishMaster[];
  user: UserLogin;
  search = false;
  sum1 = 0;

  constructor(private authService: AuthService,
              private loadingCtrl: LoadingController,
              private service: QasalesService,
              private nav: NavController,
              private route: Router) { }

  ngOnInit() {
    this.user = this.authService.getUserInfo();
  }

  ionViewWillEnter() {
    this.search = false;
    this.user = this.authService.getUserInfo();
    if (!this.user) {
      this.route.navigateByUrl('/auth');
    } else {
      // console.log(this.user[0].saleManager);
      this.loaddata();
    }
  }

  async loaddata() {
    const loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'กำลังโหลด'
    });
    await loading.present();

    this.sub = this.service.qaFinishMaster(this.user[0].saleManager).subscribe(
     (data) => {
       this.qaFinishMaster = data;
      //  console.log(this.qaFinishMaster);
       },

       async (err) => {
         console.log(err);
         await loading.dismiss();
       },
       async () => {
         this.sum1 = 0;
         this.qaFinishMaster.forEach((item) => {
           this.sum1 = this.sum1 + item.TotalQaFinish;
         });
         await loading.dismiss();
       });
    }

    goToqaFinishDetail(i: QaFinishMaster) {
      this.nav.navigateForward(['/qafinish-detail', {
        finishID: i.qaFinish_ID,
        OrderNumber: i.OrderNumber,
        fullName: i.fullName,
        date: i.receiveDate,
        thaiDate: i.thaiDate,
        qaDoc: i.qaDocNumber,
        showIcon: i.showIcon,
        avatar: i.avatar,
        nickName: i.nickName
      }]);
    }

    showSearch() {
      this.search = !this.search;
    }

    getBill(ev: any) {
      const val = ev.target.value;
      if (val && val.trim() !== '') {
        this.qaFinishMaster = this.qaFinishMaster.filter((bill: QaFinishMaster) => {
        return (bill.OrderNumber.toLowerCase().indexOf(val.toLowerCase()) > -1 );
        });
        this.sum1 = 0;
        this.qaFinishMaster.forEach((item) => {
          this.sum1 = this.sum1 + item.TotalQaFinish;
        });
      } else {
         this.loaddata();
      }
    }

    onClickRefresh() {
      this.loaddata();
    }

    backToQaStatus() {
      this.nav.navigateBack(['/tabs/qastatus']);
    }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
