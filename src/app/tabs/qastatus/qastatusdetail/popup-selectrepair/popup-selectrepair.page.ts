import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { QasalesService } from 'src/app/services/qasales.service';

@Component({
  selector: 'app-popup-selectrepair',
  templateUrl: './popup-selectrepair.page.html',
  styleUrls: ['./popup-selectrepair.page.scss'],
})
export class PopupSelectrepairPage implements OnInit, OnDestroy {

  issub1: boolean;
  issub2: boolean;

  sub: Subscription;
  sub2: Subscription;


  showReason1: any[];
  showReason2: any[];

  selectRepair = Number(0);
  sumValues = Number(0);

  reason = [];

  @Input() public userSelected: {
    ItemNo: string,
    NewPict: string,
    ProductCode: string,
    Qty: number,
    balanceQty: number,
    SelectQaFinish: number,
    SelectToRepair: number,
    bill_Item: number,
    RepairQty: number,
    FinishQty: number,
    RepairFinish: number,
    RepairSent: number
  };

  @Input() public repairReturn: any;

  constructor(private modal: ModalController,
              private service: QasalesService) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    await
    this.repairReturn.forEach(async (item) => {
      if (item.bill_Item === this.userSelected.bill_Item) {
        await this.reason.push(item);
        // console.log(this.reason);
      }
    });
    if (this.reason.length === 0) {
      this.reason = [
        {
          bill_Item: this.userSelected.bill_Item,
          typeID: 0,
          reasonNo: 0,
          count: 0
          },
          {
            bill_Item: this.userSelected.bill_Item,
            typeID: 0,
            reasonNo: 0,
            count: 0
          },
          {
            bill_Item: this.userSelected.bill_Item,
            typeID: 0,
            reasonNo: 0,
            count: 0
          },
      ];
    }
    // console.log(this.reason);
    this.issub1 = true;
    this.issub2 = false;
    this.sub = this.service.repairTypeMaster().subscribe(
      (data) => {
        this.showReason1 = data;
        // console.log('Master' , this.showReason1);
      }
    );
  }

  addItem() {
    this.reason.push({
      bill_Item: this.userSelected.bill_Item,
      typeID: 0,
      reasonNo: 0,
      count: 0
    });
  }

  getTypeID(typeID: string) {
    this.issub2 = true;
    // console.log(typeID);
    this.sub2 = this.service.repairTypeDetail(typeID).subscribe(
      (data) => {
        this.showReason2 = data;
        // console.log('Detail' , this.showReason2);
      });
  }

  sumValue() {
    this.sumValues = Number(0);
    this.reason.forEach(item => {
      this.sumValues = this.sumValues + item.count;
    });
  }

  async closeModal() {
    // console.log('PopClose', this.reason);
    await this.modal.dismiss(this.reason).then(() => this.reason = []);
  }

  ngOnDestroy() {
    if (this.issub1) {
      this.sub.unsubscribe();
    }
    if (this.issub2) {
      this.sub2.unsubscribe();
    }
  }

}
