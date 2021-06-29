import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { QasalesService } from 'src/app/services/qasales.service';
import { ActivatedRoute, Router} from '@angular/router';
import { ReportRepairByOrder } from 'src/app/models/reportRepairByOrder';
import { LoadingController, NavController, ModalController } from '@ionic/angular';
import { OrderStatusDetail } from 'src/app/models/orderStatusDetail';
import { PopupRepairbyorderPage } from '../popup-repairbyorder/popup-repairbyorder.page';
import { OrderDetailSumRepair } from 'src/app/models/orderDetailSumRepair';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-report-repair-byorder',
  templateUrl: './report-repair-byorder.page.html',
  styleUrls: ['./report-repair-byorder.page.scss'],
})
export class ReportRepairByorderPage implements OnInit, OnDestroy {

  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  sub4: Subscription;
  OrderItemRepair: ReportRepairByOrder[];
  orderItems: OrderStatusDetail[];
  orderItemsGet: OrderStatusDetail[];
  DetailRepairSum: OrderDetailSumRepair[];
  orderNumber: string;
  orderRepairByType: any[];

  sum1 = 0;
  sum2 = 0;

  selectGet = false;
  isSub1 = false;
  isSub2 = false;
  isSub3 = false;



  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: QasalesService,
              private loadingCtrl: LoadingController,
              private nav: NavController,
              private modal: ModalController,
              ) {
                this.orderNumber = this.route.snapshot.paramMap.get('orderNumber');
              }

 async ngOnInit() {
    await this.loadDataSumRepair();
    await this.loadData();
    // console.log(this.DetailRepairSum.QTY);
    this.selectGet = false;
    this.isSub1 = false;
    this.isSub2 = false;
    this.isSub3 = false;
  }

  async loadData() {
    const loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'กำลังโหลดข้อมูล...'
    });
    await loading.present();
    this.sub1 = this.service.reportRepairbyOrder(this.orderNumber).subscribe(
      (data) => {
        this.OrderItemRepair = data;
        console.log(data);
      },
    async (error) => {
      console.log(error);
      await loading.dismiss();
    },
    async () => {
      await loading.dismiss();
    });
  }

  //Header DATA Sum
  async loadDataSumRepair() {
    this.isSub1 = true;
    const loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'กำลังโหลดข้อมูล...'
    });
    await loading.present();
    this.sub1 = this.service.orderDetailSumRepair(this.orderNumber).subscribe(
      (data) => {
        this.DetailRepairSum = data;
        // console.log(this.reasonReport);
      },
    async (error) => {
      console.log(error);
      await loading.dismiss();
    },
    async () => {
      // console.log('Success DATA 5555')
      // console.log(this.DetailRepairSum)
      await loading.dismiss();
    });
  }


  async alertClickHeader(type: number, qty: number) {
    if (qty > 0) {
        const modal = await this.modal.create({
          component: PopupRepairbyorderPage,
          componentProps: {
            orderNumber: this.orderNumber,
            content: 0,
            type: type,
            qtyOrder: this.DetailRepairSum[0].QTY
          }
        });
        modal.onWillDismiss().then(dataReturn => {
        });
        return await modal.present();
    } else {
      alert('ไม่มีข้อมูลซ่อม');
    }


    // await Swal.fire('5555');
    // let textShow = ''
    // const loading = await this.loadingCtrl.create({
    //   spinner: 'bubbles',
    //   message: 'กำลังโหลดข้อมูล...'
    // });
    // await loading.present();
    // this.sub4 = this.service.orderRepairByType(this.orderNumber, type).subscribe(
    //   (data) => {
    //     this.orderRepairByType = data;
    //     data.forEach((d) => {
    //       textShow = `${textShow}อาการเสีย : ${d.reasonType} จำนวน : ${d.Qty}\n`
    //     })
    //   },
    // async (error) => {
    //   console.log(error);
    //   await loading.dismiss();
    // },
    // async () => {
    //   console.log(textShow)
    //   console.log(this.orderRepairByType)
    //   await loading.dismiss();
    //   alert(textShow);
    //   // await Swal.fire(textShow);
    // });

  }

  getSum() {
    this.selectGet = !this.selectGet;
    this.orderItems = this.orderItemsGet;
    if (this.selectGet) {
      this.orderItems = this.orderItems.filter((sum: OrderStatusDetail) => {
      return (sum.SumRepair > 0);
      }),
      this.sumValues();
    } else {
      this.orderItems = this.orderItemsGet;
      this.sumValues();
    }
  }

  sumValues() {
    this.sum1 = this.sum2 = 0;
    this.orderItems.forEach((item) => {
      this.sum1 = this.sum1 + item.TotalQty;
      this.sum2 = this.sum2 + item.SumRepair;
    });
  }

  backToOrderStatus() {
    this.nav.back();
  }

  async openModalReportRepair(i: OrderStatusDetail) {
    // console.log(i);
    if (i.SumRepair > 0) {
      const modal = await this.modal.create({
        component: PopupRepairbyorderPage,
        componentProps: {
          product: i,
          orderNumber: this.orderNumber,
          content: 1
        }
      });
      modal.onWillDismiss().then(dataReturn => {
        // console.log(dataReturn);
      });
      return await modal.present();
    }

  }



  ngOnDestroy() {
    if (this.isSub1) {
      this.sub1.unsubscribe();
    }
    if (this.isSub2) {
      this.sub2.unsubscribe();
    }
    if (this.isSub3) {
      this.sub3.unsubscribe();
    }
  }

}
