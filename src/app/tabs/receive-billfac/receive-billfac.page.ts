import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { QaReceiveMaster } from './../../models/qaReceiveMaster';
import { QasalesService } from './../../services/qasales.service';
import { UserLogin } from 'src/app/models/userLogin';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receive-billfac',
  templateUrl: './receive-billfac.page.html',
  styleUrls: ['./receive-billfac.page.scss'],
})
export class ReceiveBillfacPage implements OnInit, OnDestroy {

  sub: Subscription;
  user: UserLogin;

  qaBillReceive: QaReceiveMaster[];
  qaBillReceiveGet: QaReceiveMaster[];
  person = false ;
  search = false ;

  constructor(private nav: NavController,
              private service: QasalesService,
              private loadingCtrl: LoadingController,
              private authService: AuthService,
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
      // console.log('Deaprtment = ', this.user[0].userDepartment);
      this.loadBillShow();
    }
  }

  async loadBillShow() {
    const loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'กำลังโหลด'
    });
    await loading.present();

    this.sub = this.service.qaBillReceive(this.user[0].saleManager).subscribe(
      (data: any) => {
        this.qaBillReceive = data;
        this.qaBillReceiveGet = data;
        // console.log(this.qaBillReceive);
        // console.log(this.saleManager);
      },
        async (error) => {
          console.log(error);
          await loading.dismiss();
        },
        async () => {
          await loading.dismiss();
        });
  }

  gotoQaReceive(i: QaReceiveMaster) {
    this.nav.navigateRoot(['/receive-detail', {
      bill_Id: i.qaBill_ID,
      OrderNumber: i.OrderNumber,
      fact: i.ProductionTeam,
      showIcon: i.showIcon,
      saleTeam: i.avatar,
      userSent: i.userSent,
      nickNameSent: i.nickNameSent,
      thaiDateBill: i.thaiDateBill
    }]);
  }

  getBill(ev: any) {
    const val = ev.target.value;
    this.qaBillReceive = this.qaBillReceiveGet;
    if (val && val.trim() !== '') {
      this.qaBillReceive = this.qaBillReceive.filter((bill: QaReceiveMaster) => {
      return (bill.OrderNumber.toLowerCase().indexOf(val.toLowerCase()) > -1 );
      });
    } else {
      //  this.loadBillShow();
       this.qaBillReceive = this.qaBillReceiveGet;
    }
  }

  showPerson() {
    this.person = !this.person;
  }

  showSearch() {
    this.search = !this.search;
  }

  onClickRefresh() {
    this.loadBillShow();
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
