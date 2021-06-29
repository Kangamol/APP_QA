import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserLogin } from 'src/app/models/userLogin';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { QasalesService } from 'src/app/services/qasales.service';
import { Router } from '@angular/router';
import { StatusRepairMaster } from 'src/app/models/statusRepairMaster';

@Component({
  selector: 'app-repair-finish-master',
  templateUrl: './repair-finish-master.page.html',
  styleUrls: ['./repair-finish-master.page.scss'],
})
export class RepairFinishMasterPage implements OnInit, OnDestroy {


  search = false ;
  sub: Subscription;
  user: UserLogin;
  statusRepairMaster: StatusRepairMaster[];
  sum1 = 0;
  sum2 = 0;
  sum3 = 0;
  sum4 = 0;


  constructor(private nav: NavController,
              private service: QasalesService,
              private authService: AuthService,
              private loadingCtrl: LoadingController,
              private route: Router) { }

  ngOnInit() {
    this.user = this.authService.getUserInfo();
  }

  ionViewWillEnter() {
    // this.loaddata();
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

    this.sub = this.service.repairFinishMaster(this.user[0].saleManager).subscribe(
     (data) => {
      this.statusRepairMaster = data;
      // console.log(this.statusRepairMaster);
       },
       async (error) => {
         console.log(error);
         await loading.dismiss();
       },
       async () => {
         this.sum1 = this.sum2 = this.sum3 = this.sum4 = 0;
         this.statusRepairMaster.forEach((item) => {
          this.sum1 = this.sum1 + item.TotalQty;
          this.sum2 = this.sum2 + item.TotalFinishQty;
          this.sum3 = this.sum3 + (item.TotalQty - item.TotalFinishQty);
          this.sum4 = this.sum4 + item.ToQa;
         });
         await loading.dismiss();
       });
    }

  backToQaStatusRepair() {
    this.nav.navigateBack(['/tabs/repairstatus']);
  }

  gotoRepairFinishDetail(i: StatusRepairMaster) {
    this.nav.navigateForward(['/repairfinish-detail', {
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

  onClickRefresh() {
    this.loaddata();
  }

  getBill(ev: any) {
    const val = ev.target.value;
    if (val && val.trim() !== '') {
      this.statusRepairMaster = this.statusRepairMaster.filter((bill: StatusRepairMaster) => {
      return (bill.OrderNumber.toLowerCase().indexOf(val.toLowerCase()) > -1 );
      });
      this.sum1 = this.sum2 = this.sum3 = this.sum4 = 0;
      this.statusRepairMaster.forEach((item) => {
       this.sum1 = this.sum1 + item.TotalQty;
       this.sum2 = this.sum2 + item.TotalFinishQty;
       this.sum3 = this.sum3 + (item.TotalQty - item.TotalFinishQty);
       this.sum4 = this.sum4 + item.ToQa;
      });
    } else {
       this.loaddata();
    }
  }

  showSearch() {
    this.search = !this.search;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
