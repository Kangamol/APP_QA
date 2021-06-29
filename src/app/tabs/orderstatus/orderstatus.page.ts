import { Component, OnInit, OnDestroy} from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { QasalesService } from 'src/app/services/qasales.service';
import { Subscription } from 'rxjs';
import { UserLogin } from 'src/app/models/userLogin';
import { LoadingController, NavController } from '@ionic/angular';
import { OrderStatusMaster } from 'src/app/models/orderStatusMaster';

@Component({
  selector: 'app-orderstatus',
  templateUrl: './orderstatus.page.html',
  styleUrls: ['./orderstatus.page.scss'],
})
export class OrderstatusPage implements OnInit, OnDestroy {

  user: UserLogin;
  sub: Subscription;
  orderStatus: OrderStatusMaster[];
  orderStatusGet: OrderStatusMaster[];

  search = false;

  sum1 = 0;
  sum2 = 0;
  sum3 = 0;
  sum4 = 0;
  sum5 = 0;


  constructor(private authService: AuthService,
              private route: Router,
              private service: QasalesService,
              private loadingCtrl: LoadingController,
              private nav: NavController
              ) { }

  ngOnInit() {
    this.user = this.authService.getUserInfo();
  // console.log('onInit Deaprtment = ', this.user[0].userDepartment);
  }

  ionViewWillEnter() {
    this.search = false;
    // this.person = false;
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

    this.sub = this.service.getOrderStatus(this.user[0].saleManager).subscribe(data => {
      // console.log(data);
      this.orderStatus = data;
      this.orderStatusGet = data;
      },
    async (error) => {
      console.log(error);
      await loading.dismiss();
      },
    async () => {
      // หาผลรวม
      this.SumValues();
      await loading.dismiss();
      });
    }

  getBill(ev: any) {
    const val = ev.target.value;
    this.orderStatus = this.orderStatusGet;
    if (val && val.trim() !== '') {
      this.orderStatus = this.orderStatus.filter((bill: OrderStatusMaster) => {
      return (bill.OrderNumber.toLowerCase().indexOf(val.toLowerCase()) > -1 );
      });
      // หาผลรวม
      this.SumValues();

    } else {
        // this.loaddata();
        this.orderStatus = this.orderStatusGet;
        this.SumValues();
    }
  }

  SumValues() {
    this.sum1 = this.sum2 = this.sum3 = this.sum4 = this.sum5 = 0;
    this.orderStatus.forEach((item) => {
      this.sum1 = this.sum1 + item.TotalQty;
      this.sum2 = this.sum2 + item.Balance;
      this.sum3 = this.sum3 + item.TotalQaRepair;
      this.sum4 = this.sum4 + (item.TotalQaBill - item.TotalQaRepair - item.TotalQaFinish);
      this.sum5 = this.sum5 + item.TotalQaFinish;
    });
  }

  showSearch() {
    this.search = !this.search;
  }

  onClickRefresh() {
    this.loaddata();
  }

selectItem(selectData: OrderStatusMaster) {
  this.nav.navigateForward(['/orderitems', {
    orderNumber: selectData.OrderNumber,
    thaiDate: selectData.thaiDate,
    DueDate: selectData.DueDate,
    totalQty: selectData.TotalQty,
    finishQty: selectData.TotalQaFinish,
    repairQty: selectData.TotalQaRepair,
    Balance: selectData.Balance,
    qaQty: selectData.TotalQaBill,
    avatar: selectData.avatar,
    fac: selectData.ProductionTeam,
    totalRepairSum: selectData.Totalrepairsum,
    dateLate: selectData.dateLate
  }]);
}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
