import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-popup-qafinish',
  templateUrl: './popup-qafinish.page.html',
  styleUrls: ['./popup-qafinish.page.scss'],
})
export class PopupQafinishPage implements OnInit {

  selectQaFinish: number;

  @Input() public userSelected: {
    ItemNo: string,
    NewPict: string,
    ProductCode: string,
    Qty: number,
    SelectQaFinish: number,
    SelectToRepair: number,
    TotalFinishQty: number,
    RepairQty: number,
    FinishQty: number,
    RepairFinish: number,
    RepairSent: number
  };

  constructor(private modal: ModalController) { }

  ngOnInit() {
    this.selectQaFinish = this.userSelected.SelectQaFinish;
  }

  async closeModal() {
    // console.log('sent back', this.selectQty);
    await this.modal.dismiss(this.selectQaFinish);
  }

}
