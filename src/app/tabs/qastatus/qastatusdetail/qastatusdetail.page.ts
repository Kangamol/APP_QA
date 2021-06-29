import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { QasalesService } from 'src/app/services/qasales.service';
import { QaStatusDetail } from 'src/app/models/qastatusdetail';
import { AuthService } from 'src/app/auth/auth.service';

import { PopupQafinishPage } from './popup-qafinish/popup-qafinish.page';
import { PopupSelectrepairPage } from './popup-selectrepair/popup-selectrepair.page';
import * as moment from 'moment';
import { UserLogin } from 'src/app/models/userLogin';
import { QastatusPage } from './../../qastatus/qastatus.page';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-qastatusdetail',
  templateUrl: './qastatusdetail.page.html',
  styleUrls: ['./qastatusdetail.page.scss'],
})
export class QastatusdetailPage implements OnInit, OnDestroy {

  sub1: Subscription;
  qaStatusDetail: QaStatusDetail[];
  billID = '';
  OrderNumber = '';
  fact = '';
  billQA;
  dateReceive = '';
  saleManager = '';
  showIcon = '';
  qaDocNumber = '';
  nameReceive = '';
  avatar = '';
  thaiDate = '';
  nickNameReceive = '';
  isBackPage =  '';

  sum1 = 0;
  sum2 = 0;
  sum3 = 0;
  sum4 = 0;
  sum5 = 0;
  sum6 = 0;

  user: UserLogin;
  qaPage: QastatusPage;
  repairReturn = [];
  repairReturn2 = [];

  sub2: Subscription;
  sub3: Subscription;
  sub4: Subscription;

  sub5: Subscription;
  sub6: Subscription;

  isSub1 = false;
  isSub2 = false;
  isSub3 = false;
  isSub4 = false;
  isSub5 = false;
  isSub6 = false;

  selectAllFinish = true;

  RepairBillID: any;
  

  constructor(private nav: NavController,
              private loadingCtrl: LoadingController,
              private route: ActivatedRoute,
              private modal: ModalController,
              private service: QasalesService,
              private authService: AuthService,
              private faio: FingerprintAIO,
              private storage: Storage) {
                      this.billID = this.route.snapshot.paramMap.get('billID');
                      this.OrderNumber = this.route.snapshot.paramMap.get('OrderNumber');
                      this.fact = this.route.snapshot.paramMap.get('fact');
                      this.showIcon = this.route.snapshot.paramMap.get('showIcon');
                      this.saleManager = this.route.snapshot.paramMap.get('saleManager');
                      this.qaDocNumber = this.route.snapshot.paramMap.get('qaDocNumber');
                      this.dateReceive = this.route.snapshot.paramMap.get('billDate');
                      this.nameReceive = this.route.snapshot.paramMap.get('nameReceive');
                      this.avatar = this.route.snapshot.paramMap.get('avatar');
                      this.thaiDate = this.route.snapshot.paramMap.get('thaiDate');
                      this.nickNameReceive = this.route.snapshot.paramMap.get('nickNameReceive');
                      this.isBackPage = this.route.snapshot.paramMap.get('isBackPage');

                    }

  ngOnInit() {
    this.user = this.authService.getUserInfo();
  }

  ionViewWillEnter() {
    this.isSub1 = false;
    this.isSub2 = false;
    this.isSub3 = false;
    this.isSub4 = false;
    this.isSub5 = false;
    this.isSub6 = false;

    this.selectAllFinish = true;

    this.user = this.authService.getUserInfo();
    this.loaddata();
  }

  async loaddata() {
    const loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'กำลังโหลด'
    });
    await loading.present();
    this.isSub1 = true;
    this.sub1 = this.service.qaStatusDetail(this.billID).subscribe(
     (data) => {
       this.qaStatusDetail = data;
       this.billQA = data[0].qaDocNumber;
       this.dateReceive = data[0].receiveDate;
      //  console.log(this.qaStatusDetail);
       },
       async (error) => {
         console.log(error);
         await loading.dismiss();
       },
       async () => {
        // หาผลรวม
        this.sum1 = this.sum2 = this.sum3 = this.sum4 = this.sum5 = this.sum6 = 0;
        this.qaStatusDetail.forEach((item) => {
          this.sum1 = this.sum1 + item.Qty;
          this.sum2 = this.sum2 + item.FinishQty;
          this.sum3 = this.sum3 + (item.Qty - item.FinishQty - (item.RepairQty - item.RepairFinish));
          this.sum4 = this.sum4 + (item.RepairQty - item.RepairFinish);
          this.sum5 = this.sum5 + item.SelectQaFinish;
          this.sum6 = this.sum6 + item.SelectToRepair;
        });
        await loading.dismiss();
       });
    }

    selectAll() {
      if (this.selectAllFinish) {
        this.selectAllFinish = false;
        this.sum5 = 0;
        this.qaStatusDetail.forEach((item: QaStatusDetail) => {
          item.SelectQaFinish = item.Qty - item.FinishQty - (item.RepairQty - item.RepairFinish) - item.RepairSent - item.SelectToRepair;
          this.sum5 = this.sum5 + item.SelectQaFinish;
        });
      } else  {
        this.selectAllFinish = true;
        this.sum5 = 0;
        this.qaStatusDetail.forEach((item: QaStatusDetail) => {
          item.SelectQaFinish = 0;
          this.sum5 = this.sum5 + item.SelectQaFinish;
        });
      }
    }

    async openModalFinish(i: QaStatusDetail) {
      const modal = await this.modal.create({
        component: PopupQafinishPage,
        componentProps: {
          userSelected: i
        }
      });
      modal.onWillDismiss().then(dataReturn => {
        // console.log(dataReturn);
        if (dataReturn.data === undefined) {
          i.SelectQaFinish = 0;
        } else {
          i.SelectQaFinish = dataReturn.data;
          this.sum5 = 0;
          this.qaStatusDetail.forEach((item) => {
            this.sum5 = this.sum5 + item.SelectQaFinish;
          });
        }
      });
      return await modal.present();
    }

    async openModalRepair(i: QaStatusDetail) {
      const modal = await this.modal.create({
        component: PopupSelectrepairPage,
        componentProps: {
          userSelected: i,
          repairReturn: this.repairReturn
        }
      });
      modal.onWillDismiss().then(dataReturn => {
        // console.log('dataReturn++', dataReturn.data);
        i.SelectToRepair = 0;
        if (dataReturn.data) {
          // console.log('No filter',this.repairReturn);
          this.repairReturn = this.repairReturn.filter((n: QaStatusDetail) => {
            return n.bill_Item !== i.bill_Item;
          });
          // console.log('filter Success',this.repairReturn);
          dataReturn.data.forEach((item) => {
            i.SelectToRepair = i.SelectToRepair + item.count;
            if (item.count > 0) {
              this.repairReturn.push(item);
              // console.log(this.repairReturn);
            }
          }
          );
          this.sum6 = 0;
          this.qaStatusDetail.forEach((data) => {
            this.sum6 = this.sum6 + data.SelectToRepair;
          });
          // console.log(this.repairReturn);
        }
      });
      return await modal.present();
    }

  async onConfirm() {
    if (this.sum5 > 0 || this.sum6 > 0) {
    await this.faio.show({
        title: 'ArtEvent Security',
        disableBackup: true
      }).then(async (result: any) => {
        console.log(result);
        if (this.sum5 > 0) {
          await this.confirmFinish();
        }
        if (this.sum6 > 0) {
          await this.insertRepairMaster();
        }
      }).then(() => {
            alert('บันทึกข้อมูลแล้ว');
            }).then(async  () => {
              await this.nav.navigateBack(['/tabs/qastatus']);
            }).catch((error) => console.log(error));
    } else {
            alert('ไม่ได้ใส่ข้อมูล');
            }
  }

  // async onConfirm() {
  //   if (this.sum5 > 0 || this.sum6 > 0) {

  //     this.faio.show({
  //       title: 'ArtEvent Security',
  //       disableBackup: true
  //     })
  //     .then((result: any) => {
  //       console.log(result);
  //       if (this.sum5 > 0) {
  //         this.confirmFinish();
  //       }
  //       if (this.sum6 > 0) {
  //         this.confirmRepairBill().then((showAlert) => {
  //           console.log(showAlert);
  //         });
  //       }
  //     }).then((data) => {
  //       alert(data);
  //     }).then(() => {
  //       this.nav.navigateBack(['/tabs/qastatus']);
  //     }).catch((error) => console.log(error));
  //   } else {
  //     alert('ไม่ได้ใส่ข้อมูล');
  //   }
  // }



  async confirmRepairBill() {
    await this.insertRepairMaster();
    return 'เปิดบิลซ่อมสำเร็จแล้ว';
}

  async insertRepairMaster() {
    const loading = await this.loadingCtrl.create({
      spinner: 'dots',
      message: ''
    });
    await loading.present();
    const docPrefix = 'RP' + moment().format('YYMM');
    const myData = {
      repairDocNumber: docPrefix,
      qaBill_ID: Number(this.billID),
      userID: this.user[0].userID,
      OrderNumber: this.OrderNumber,
      receiver: 0,
      qaRepairStatus: ''
    };
    console.log(myData);
    this.isSub2 = true;
    this.sub2 = this.service.insertRepairBillMaster(myData).subscribe((data) => {
      // console.log(data);
      this.RepairBillID = data;
    },
    async (err) => {
      await loading.dismiss();
      console.log(err);
    },
    async () => {
      // console.log('Master Success', this.RepairBillID);
      await this.insertRepairDetail(this.RepairBillID);
      await loading.dismiss();
      console.log('อันนี้ท้ายสุด');
    }
    );
  }

  async insertRepairDetail(repairID: number) {
    const loading = await this.loadingCtrl.create({
      spinner: 'dots',
      message: ''
    });
    await loading.present();
    let repairItem = 0;

    for (const repairDetail of this.qaStatusDetail) {
      if (repairDetail.SelectToRepair > 0) {
        repairItem = repairItem + 1;
        console.log('นี้คือเลขที่Detail = ' , this.RepairBillID);
        const myDetailData = {
          qaRepair_ID: repairID,
          repair_Item: repairItem,
          bill_Item: Number(repairDetail.bill_Item),
          repairTypeID: 1,
          Qty: Number(repairDetail.SelectToRepair)
        };
        console.log('this My', myDetailData);
        this.isSub3 = true;
        this.sub3 = this.service.insertRepairBillDetail(myDetailData).subscribe((data2) => {
          // console.log(data2);
      },
      async (err) => {
        console.log(err);
      },
      async () => {
        console.log('Detail Success');
        this.repairReturn.forEach(async (items, idxs) => {
          if (items.bill_Item === myDetailData.bill_Item) {
            const myReason = {
            qaRepairID: this.RepairBillID,
            repairItem: myDetailData.repair_Item,
            reasonNo: Number(items.reasonNo),
            typeID: Number(items.typeID),
            Qty: Number(items.count)
            };
            console.log(myReason);
            this.isSub4 = true;
            this.sub4 = this.service.insertRepairReason(myReason).subscribe((datareason) => {
            },
            async (err) => {
              console.log(err);
            },
            async () => {
              console.log('Reason Success');
            }
            );
          }});


        // console.log('Detail Success + บิลไอเทม', myDetailData.bill_Item);
        // await this.insertReason(myDetailData.repair_Item, myDetailData.bill_Item);
    }
    );
    }
    }
    await loading.dismiss();
  }

    async insertReason(repairItemdetail: number, BillItem: number) {
      const loading = await this.loadingCtrl.create({
        spinner: 'dots',
        message: ''
      });
      await loading.present();
      // console.log('ก่อนเข้า Loop + ', this.repairReturn);
      for (const reasonloop of this.repairReturn) {
        // console.log('เช็คว่าตรงกันไหม +', reasonloop.bill_Item);
        if (reasonloop.bill_Item === BillItem) {
        const myReason = {
        qaRepairID: this.RepairBillID,
        repairItem: repairItemdetail,
        reasonNo: reasonloop.reasonNo,
        typeID: reasonloop.typeID,
        Qty: reasonloop.count
        };
        console.log('MyReason + ', myReason);
        this.isSub4 = true;
        this.sub4 = this.service.insertRepairReason(myReason).subscribe((datareason) => {
          // console.log('return', datareason);
        },
        async (err) => {
          console.log(err);
        },
        async () => {
          console.log('Reason Success');
        }
        );
    }
    }
      await loading.dismiss();
    }


  async confirmFinish() {
    const loading = await this.loadingCtrl.create({
      spinner: 'dots',
      message: ''
    });
    await loading.present();
    const docPrefix = 'FN' + moment().format('YYMM');
    const myData = {
      finishDocNumber: docPrefix,
      qaBill_ID: Number(this.billID),
      userID: this.user[0].userID,
      OrderNumber: this.OrderNumber,
      receiver: 0
    };
    let finishItem = 0;
    // console.log('FinishMaster+++', myData);
    this.isSub5 = true;
    this.sub5 = this.service.insertFinishMaster(myData).subscribe(
      (data) => {
        this.qaStatusDetail.forEach((item, idx) => {
          if (item.SelectQaFinish > 0) {
            finishItem = finishItem + 1;
            const myDetailData = {
              qaFinish_ID: Number(data),
              finish_Item: finishItem,
              bill_Item: Number(item.bill_Item),
              Qty: Number(item.SelectQaFinish)
            };

            // console.log('FinishDetail+++', myDetailData);
            this.isSub6 = true;
            this.sub6 = this.service.insertFinishDetail(myDetailData).subscribe(
              (dataDetail) => {
                // console.log(dataDetail);
              }
            );
          }
        });
      }
    );
    await loading.dismiss();
    }

    

    async backPage() {
      this.nav.back();

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
      if (this.isSub4) {
        this.sub4.unsubscribe();
      }
      if (this.isSub5) {
        this.sub5.unsubscribe();
      }
      if (this.isSub6) {
        this.sub6.unsubscribe();
      }
    }

}
