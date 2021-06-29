import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { QasalesService } from 'src/app/services/qasales.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { OrderStatusDetail } from 'src/app/models/orderStatusDetail';
import { ModalController } from '@ionic/angular';

import { PopupReportrepairItemPage } from '../popup-reportrepair-item/popup-reportrepair-item.page';

@Component({
  selector: 'app-orderitems',
  templateUrl: './orderitems.page.html',
  styleUrls: ['./orderitems.page.scss'],
})
export class OrderitemsPage implements OnInit, OnDestroy {

  orderItems: OrderStatusDetail[];
  sub: Subscription;
  // ส่งมาจาก orderstaus
  orderNumber: string;
  thaiDate: any;
  DueDate: any;
  totalQty: any;
  finishQty: any;
  totalRepairSum: any;
  dateLate: any;
  repairQty: any;
  qaQty: any;
  avatar: any;
  fac: any;
  Balance: any;

  constructor(private service: QasalesService,
              private route: ActivatedRoute,
              private router: Router,
              private nav: NavController,
              private loadingCtrl: LoadingController,
              private modal: ModalController) {
                      this.orderNumber = this.route.snapshot.paramMap.get('orderNumber');
                      this.thaiDate = this.route.snapshot.paramMap.get('thaiDate');
                      this.DueDate = this.route.snapshot.paramMap.get('DueDate');
                      this.totalQty = this.route.snapshot.paramMap.get('totalQty');
                      this.finishQty = this.route.snapshot.paramMap.get('finishQty');
                      this.totalRepairSum = this.route.snapshot.paramMap.get('totalRepairSum');
                      this.dateLate = this.route.snapshot.paramMap.get('dateLate');
                      this.repairQty = this.route.snapshot.paramMap.get('repairQty');
                      this.qaQty = this.route.snapshot.paramMap.get('qaQty');
                      this.avatar = this.route.snapshot.paramMap.get('avatar');
                      this.fac = this.route.snapshot.paramMap.get('fac');
                      this.Balance = this.route.snapshot.paramMap.get('Balance');
                    }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    const loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'กำลังโหลดข้อมูล...'
    });
    await loading.present();
    // start loading
    this.sub = this.service.getOrderDetail(this.orderNumber).subscribe(data => {
      this.orderItems = data;
      // console.log(this.orderItems);
    },
    async (error) => {
      console.log(error);
      await loading.dismiss();
    },
    async () => {
      await loading.dismiss();
    });
  }

 async backToOrderStatus() {
    await this.nav.navigateBack(['/tabs/orderstatus']);
  }

  gotoReportRepair() {
    this.nav.navigateForward(['/report-repair-byorder', {
      orderNumber: this.orderNumber
    }]);
  }

  async openModalReportRepair(i: OrderStatusDetail) {
    // console.log(i);
    // if (i.SumRepair > 0) {
      const modal = await this.modal.create({
        component: PopupReportrepairItemPage,
        componentProps: {
          product: i,
        }
      });
      modal.onWillDismiss().then(dataReturn => {
      });
      return await modal.present();
    // }

  }



  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
