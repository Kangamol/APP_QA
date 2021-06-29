import { Component, OnInit, OnDestroy } from '@angular/core';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { QasalesService } from 'src/app/services/qasales.service';
import { StatusRepairMaster } from 'src/app/models/statusRepairMaster';
import { UserLogin } from 'src/app/models/userLogin';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-repairstatus',
  templateUrl: './repairstatus.page.html',
  styleUrls: ['./repairstatus.page.scss'],
})
export class RepairstatusPage implements OnInit, OnDestroy {

  person = false ;
  search = false ;

  sub: Subscription;
  statusRepairMaster: StatusRepairMaster[];
  statusRepairMasterGet: StatusRepairMaster[];
  user: UserLogin;
  sum1 = 0;
  sum2 = 0;
  sum3 = 0;
  sum4 = 0;

  constructor(private faio: FingerprintAIO,
              private service: QasalesService,
              private nav: NavController,
              private loadingCtrl: LoadingController,
              private authService: AuthService,
              private route: Router) { }

  ngOnInit() {
    this.user = this.authService.getUserInfo();
  }

  ionViewWillEnter() {
    this.loaddata();
    this.search = false;
    this.user = this.authService.getUserInfo();
    if (!this.user) {
      this.route.navigateByUrl('/auth');
    } else {
      // console.log('Deaprtment = ', this.user[0].userDepartment);
      this.loaddata();
    }
  }

  async loaddata() {
    const loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'กำลังโหลด'
    });
    await loading.present();

    this.sub = this.service.statusRepairMaster(this.user[0].saleManager).subscribe(
     (data) => {
       this.statusRepairMaster = data;
       this.statusRepairMasterGet = data;
      //  console.log( this.statusRepairMaster);
       },
       async (error) => {
         console.log(error);
         await loading.dismiss();
       },
       async () => {
        this.SumValues();
        await loading.dismiss();
       });
    }

  SumValues() {
    this.sum1 = this.sum2 = this.sum3 = this.sum4 = 0;
    this.statusRepairMaster.forEach((item) => {
     this.sum1 = this.sum1 + item.TotalQty;
     this.sum2 = this.sum2 + item.TotalFinishQty;
     this.sum3 = this.sum3 + (item.TotalQty - item.TotalFinishQty);
     this.sum4 = this.sum4 + item.ToQa;
    });
  }

  gotoReceiveRepair(i: StatusRepairMaster) {
    this.nav.navigateRoot(['//receive-repair', {
      repairId: i.qaRepair_ID,
      OrderNumber: i.OrderNumber,
      qaDoc: i.qaDocNumber,
      repairDoc: i.repairDocNumber,
      fact: i.ProductionTeam,
      Repairstatus: i.qaRepairStatus,
      userReceive: i.userReceive,
      userSent: i.userSent,
      avatar: i.avatar,
      showIcon: i.showIcon,
      repairDate: i.repairDate,
      repairDateThai: i.repairDateThai,
      receiveDate: i.receiveDate,
      receiveDateThai: i.receiveDateThai,
      nickNameSent: i.nickNameSent,
      nickNameReceive: i.nickNameReceive
    }]);
  }

  getBill(ev: any) {
    const val = ev.target.value;
    this.statusRepairMaster = this.statusRepairMasterGet;
    if (val && val.trim() !== '') {
      this.statusRepairMaster = this.statusRepairMaster.filter((bill: StatusRepairMaster) => {
      return (bill.OrderNumber.toLowerCase().indexOf(val.toLowerCase()) > -1 );
      });
      this.SumValues();
    } else {
       this.statusRepairMaster = this.statusRepairMasterGet;
       this.SumValues();
    }
  }

  gotoRepairFinish() {
    this.nav.navigateRoot(['/repairfinish-master']);
  }

  onClickRefresh() {
    this.loaddata();
  }

  showSearch() {
    this.search = !this.search;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
