import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { QasalesService } from './../../services/qasales.service';
import { Router } from '@angular/router';

import { Qastatus } from './../../models/qastatus';
import { UserLogin } from './../../models/userLogin';

@Component({
  selector: 'app-qastatus',
  templateUrl: './qastatus.page.html',
  styleUrls: ['./qastatus.page.scss'],
})
export class QastatusPage implements OnInit, OnDestroy {

  user: UserLogin;
  sub: Subscription;
  qaStatus: Qastatus[];
  qaStatusGet: Qastatus[];
  person = false ;
  search = false;


  sum1 = 0;
  sum2 = 0;
  sum3 = 0;
  sum4 = 0;

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
      spinner: 'dots',
      message: 'กำลังโหลด'
    });
    await loading.present();

    this.sub = this.service.qaStatus(this.user[0].saleManager).subscribe(
     (data) => {
       this.qaStatus = data;
       this.qaStatusGet = data;
      //  console.log(this.qaStatus);
       },

      async (err) => {
        console.log(err);
        await loading.dismiss();
      },
      async () => {
        // หาผลรวม
        this.SumValues();
        await loading.dismiss();
        });
  }

  SumValues() {
    this.sum1 = this.sum2 = this.sum3 = this.sum4 = 0;
    this.qaStatus.forEach((item) => {
      this.sum1 = this.sum1 + item.TotalQty;
      this.sum2 = this.sum2 + item.TotalFinishQty;
      this.sum3 = this.sum3 + (item.TotalQty - item.TotalFinishQty - (item.TotalRepairQty - item.TotalRepairFinish));
      this.sum4 = this.sum4 + (item.TotalRepairQty - item.TotalRepairFinish);
    });
  }

  getBill(ev: any) {
    const val = ev.target.value;
    // console.log(val);
    this.qaStatus = this.qaStatusGet;
    if (val && val.trim() !== '') {
      this.qaStatus = this.qaStatus.filter((bill: Qastatus) => {
      return (bill.OrderNumber.toLowerCase().indexOf(val.toLowerCase()) > -1 );
      });
      this.SumValues();
      // });
    } else {
      //  this.loaddata();
      this.qaStatus = this.qaStatusGet;
      this.SumValues();
    }
  }

  showPerson() {
    this.person = !this.person;
  }

  showSearch() {
    this.search = !this.search;
  }

  onClickRefresh() {
    this.loaddata();
  }

  gotoQastatusDetail(i: Qastatus) {
    this.nav.navigateRoot(['/qastatusdetail', {
      billID: i.qaBill_ID,
      OrderNumber: i.OrderNumber,
      qaDocNumber: i.qaDocNumber,
      fact: i.ProductionTeam,
      showIcon: i.showIcon,
      saleManager: i.saleManager,
      billDate: i.billDate,
      nameReceive: i.nameReceive,
      avatar: i.avatar,
      thaiDate: i.thaiDate,
      nickNameReceive: i.nickNameReceive,
      isBackPage: '2'
    }]);
  }

  gotoqaFinishMaster() {
    this.nav.navigateRoot(['/qafinish-master']);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
