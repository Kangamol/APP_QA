import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { QasalesService } from 'src/app/services/qasales.service';

@Component({
  selector: 'app-popup-repair-reason',
  templateUrl: './popup-repair-reason.page.html',
  styleUrls: ['./popup-repair-reason.page.scss'],
})
export class PopupRepairReasonPage implements OnInit, OnDestroy {

  sub: Subscription;
  reasonItems: any;

  @Input() userSelected: {
    bill_Item: number,
    NewPict: string,
    ProductCode: string,
    Qty: number,
    repairTypeID: number,
    repairTypeDesc: string,
    RepairFinish: number,
    ToQa: number,
    repair_Item: number,
    reviseQty: number
  };

  @Input() repairID: string;

  constructor(private modal: ModalController,
              private service: QasalesService) { }

  ngOnInit() {
    this.sub = this.service.getRepairReason(this.repairID , this.userSelected.repair_Item).subscribe(
      (data) => {
        // console.log(data);
        this.reasonItems = data;
      }
    );
  }

  async closeModal() {
    await this.modal.dismiss();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
