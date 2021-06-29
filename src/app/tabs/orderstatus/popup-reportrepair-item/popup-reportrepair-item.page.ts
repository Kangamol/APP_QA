import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { QasalesService } from 'src/app/services/qasales.service';
import { Subscription } from 'rxjs';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { ReportRepairByOrder } from 'src/app/models/reportRepairByOrder';
import { ViewBillOrderItem } from 'src/app/models/viewBillOrderItem'

@Component({
  selector: 'app-popup-reportrepair-item',
  templateUrl: './popup-reportrepair-item.page.html',
  styleUrls: ['./popup-reportrepair-item.page.scss'],
})
export class PopupReportrepairItemPage implements OnInit, OnDestroy {

  sub1: Subscription;
  sub2: Subscription;
  ReportRepairItem: ReportRepairByOrder[];
  viewBillOrder: ViewBillOrderItem[];

  sum: number;

  @Input() public product: {
    ItemNo: number,
    NewPict: string,
    OrderNumber: string,
    ProductCode: string,
    ProductDesc: string,
    SumRepair: number,
    TotalFinish: number,
    TotalQA: number,
    TotalQty: number,
    TotalRepair: number
  };

  constructor(private service: QasalesService,
              private loadingCtrl: LoadingController,
              private modal: ModalController,
              private nav: NavController) { }

  ngOnInit() {

    //*****************แก้ไขเปลี่ยนจากดูสถานะซ่อม เป็นดูบิลของ Item  16/12/2563******************

    this.loadData2();

    
  }
// เช็คสถานะซ่อมของ แต่ละ Item เก่า
  // async loadData() {
  //   const loading = await this.loadingCtrl.create({
  //     spinner: 'dots',
  //     message: 'กำลังโหลดข้อมูล...'
  //   });
  //   await loading.present();
  //   // start loading
  //   this.sub1 = this.service.reportRepairbyItem(this.product.OrderNumber, this.product.ItemNo).subscribe(data => {
  //     this.ReportRepairItem = data;
  //     // console.log(this.ReportRepairItem);
  //   },
  //   async (error) => {
  //     console.log(error);
  //     await loading.dismiss();
  //   },
  //   async () => {
  //     this.sum = 0;
  //     this.ReportRepairItem.forEach((item) => {
  //       // this.sum = this.sum + item.Qty;
  //     });

  //     await loading.dismiss();

  //   });
  // }

  //เช็คบิลของแต่ละ Item
  async loadData2() {
    const loading = await this.loadingCtrl.create({
      spinner: 'dots',
      message: 'กำลังโหลดข้อมูล...'
    });
    await loading.present();
    // start loading
    this.sub2 = this.service.viewBillOrderItem(this.product.OrderNumber, this.product.ItemNo).subscribe(data => {
      this.viewBillOrder = data;
      // console.log(this.viewBillOrder);
    },
    async (error) => {
      console.log(error);
      await loading.dismiss();
    },
    async () => {
      await loading.dismiss();
    }
    );
  }

  async closeModal() {
    // console.log('sent back', this.selectQty);
    await this.modal.dismiss();
  }

  async gotoQastatusDetail(i: ViewBillOrderItem) {
    await this.closeModal();
   await this.nav.navigateForward(['/qastatusdetail', {
      billID: i.qaBill_ID,
      OrderNumber: this.product.OrderNumber,
      qaDocNumber: i.qaDocNumber,
      fact: ' ',
      showIcon: i.showIcon,
      saleManager: ' ',
      billDate: i.receiveDate,
      nameReceive: i.fullName,
      avatar: i.avatar,
      thaiDate: i.thaiDate,
      nickNameReceive: i.nickName,
      isBackPage: '1'
    }]);
 
  }

  ngOnDestroy() {
    this.sub2.unsubscribe();
  }




}
