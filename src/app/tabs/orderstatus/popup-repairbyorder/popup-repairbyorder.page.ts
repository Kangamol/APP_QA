import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { QasalesService } from 'src/app/services/qasales.service';
import { Subscription } from 'rxjs';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { ReportRepairByItem } from 'src/app/models/reportRepairByItem';

@Component({
  selector: 'app-popup-repairbyorder',
  templateUrl: './popup-repairbyorder.page.html',
  styleUrls: ['./popup-repairbyorder.page.scss'],
})
export class PopupRepairbyorderPage implements OnInit, OnDestroy {

  @Input() public product: {
    ItemNo: number,
    NewPict: string,
    ProductCode: string,
    ProductDesc: string,
    SumRepair: number,
    TotalQty: number
  };

  @Input() public orderNumber: string;
  @Input() public content: number;
  @Input() public type: number;
  @Input() public qtyOrder: number;

  swapContent = 0;

  isSub1 = false;
  isSub2 = false;


  ReportRepairItem: ReportRepairByItem[];
  orderRepairByType: any[];
  sub: Subscription;
  sub2: Subscription;
  sum: number;

  constructor(private service: QasalesService,
              private loadingCtrl: LoadingController,
              private modal: ModalController,
              private nav: NavController) { }

  ngOnInit() {
    this.isSub1 = false;
    this.isSub2 = false;
    this.swapContent = this.content;
    if (this.swapContent === 1) {
      this.loadData();
    } 
    if (this.swapContent === 0) {
      // console.log('นี้คือ Type'+ this.type);
      this.loaddataHeader(this.type);
    }

    }

    async loadData() {
      this.isSub1 = true;
      const loading = await this.loadingCtrl.create({
        spinner: 'dots',
        message: 'กำลังโหลดข้อมูล...'
      });
      await loading.present();
      // start loading
      this.sub = this.service.reportRepairbyItem(this.orderNumber, this.product.ItemNo).subscribe(data => {
        // console.log(data);
        this.ReportRepairItem = data;
        // console.log(this.ReportRepairItem);
      },
      async (error) => {
        console.log(error);
        await loading.dismiss();
      },
      async () => {
        // this.sum = 0;
        // this.ReportRepairItem.forEach((item) => {
        //   // this.sum = this.sum + item.Qty;
        // });
        await loading.dismiss();

      });
    }


    async loaddataHeader(type: number) {
      this.isSub2 = true;
      const loading = await this.loadingCtrl.create({
        spinner: 'bubbles',
        message: 'กำลังโหลดข้อมูล...'
      });
      await loading.present();
      this.sub2 = this.service.orderRepairByType(this.orderNumber, type).subscribe(
        (data) => {
          this.orderRepairByType = data;
        },
      async (error) => {
        console.log(error);
        await loading.dismiss();
      },
      async () => {
        // console.log(this.orderRepairByType);
        await loading.dismiss();
      });
  
    }

    async closeModal() {
      await this.modal.dismiss();
    }

  ngOnDestroy() {
    if (this.isSub1) {
      this.sub.unsubscribe();
    }
    if (this.isSub2) {
      this.sub2.unsubscribe();
    }
  }

}
