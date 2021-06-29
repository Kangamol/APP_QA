import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingController } from '@ionic/angular';

import { RepairReceiveItems } from '../../../models/repairReceiveItems';
import { QasalesService } from '../../../services/qasales.service';
import { AuthService } from 'src/app/auth/auth.service';
import { UserLogin } from 'src/app/models/userLogin';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { PopupRepairReasonPage } from './popup-repair-reason/popup-repair-reason.page';

@Component({
  selector: 'app-receive-repair',
  templateUrl: './receive-repair.page.html',
  styleUrls: ['./receive-repair.page.scss'],
})
export class ReceiveRepairPage implements OnInit, OnDestroy {

  sub: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  sub4: Subscription;
  sub5: Subscription;
  sub6: Subscription;
  repairReceive: RepairReceiveItems[];
  repairID = '';
  fact = '';
  OrderNumber = '';
  qaDoc = '';
  repairDoc = '';
  Repairstatus = '';
  user: UserLogin;

  userReceive = '';
  userSent = '';
  avatar = '';
  showIcon = '';
  repairDate = '';
  repairDateThai = '';
  receiveDate = '';
  receiveDateThai = '';
  nickNameSent = '';
  nickNameReceive = '';
  repairReturn = [];

  sum1 = 0;
  sum2 = 0;
  sum3 = 0;
  sum4 = 0;

  // ส่งไป Popup เพื่อเช็ค Qty
  qabillID = '';

  dataCheck: any;

  checkSumToqa = 0;

  isSub1 = false;
  isSub2 = false;
  isSub3 = false;
  isSub4 = false;
  isSub5 = false;
  isSub6 = false;

  constructor(private route: ActivatedRoute,
              private service: QasalesService,
              private nav: NavController,
              private loadingCtrl: LoadingController,
              private authService: AuthService,
              private modal: ModalController,
              private faio: FingerprintAIO) {
                      this.repairID = this.route.snapshot.paramMap.get('repairId');
                      this.OrderNumber = this.route.snapshot.paramMap.get('OrderNumber');
                      this.fact = this.route.snapshot.paramMap.get('fact');
                      this.qaDoc = this.route.snapshot.paramMap.get('qaDoc');
                      this.repairDoc = this.route.snapshot.paramMap.get('repairDoc');
                      this.Repairstatus = this.route.snapshot.paramMap.get('Repairstatus');
                      this.userReceive = this.route.snapshot.paramMap.get('userReceive');
                      this.userSent = this.route.snapshot.paramMap.get('userSent');
                      this.avatar = this.route.snapshot.paramMap.get('avatar');
                      this.showIcon = this.route.snapshot.paramMap.get('showIcon');
                      this.repairDate = this.route.snapshot.paramMap.get('repairDate');
                      this.repairDateThai = this.route.snapshot.paramMap.get('repairDateThai');
                      this.receiveDate = this.route.snapshot.paramMap.get('receiveDate');
                      this.receiveDateThai = this.route.snapshot.paramMap.get('receiveDateThai');
                      this.nickNameReceive = this.route.snapshot.paramMap.get('nickNameReceive');
                      this.nickNameSent = this.route.snapshot.paramMap.get('nickNameSent');
                    }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.isSub1 = false;
    this.isSub2 = false;
    this.isSub3 = false;
    this.isSub4 = false;
    this.isSub5 = false;
    this.isSub6 = false;
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
    this.sub = this.service.repairReceiveItems(this.repairID).subscribe(
     (data) => {
       this.repairReceive = data;
      //  console.log(this.repairReceive);
       },
       async (error) => {
         console.log(error);
         await loading.dismiss();
       },
       async () => {
         this.sum1 = this.sum2 = this.sum3 = this.sum4 = 0;
         this.repairReceive.forEach((item) => {
           this.sum1 = this.sum1 + item.Qty;
           this.sum2 = this.sum2 + item.RepairFinish;
           this.sum3 = this.sum3 + (item.Qty - item.RepairFinish);
           this.sum4 = this.sum4 + item.ToQa;
         });
         await loading.dismiss();
       });
    }

  cancelBillRepair() {
    this.faio.show({
      title: 'ArtEvent Security',
      disableBackup: true
    })
    .then((result: any) => {
      console.log(result);
      this.isSub6 = true;
      this.sub6 = this.service.cancelBillRepair(this.repairID).subscribe(
        (data) => {
          console.log(data);
        });
      alert('ยกเลิกบิลแล้ว');
      this.nav.navigateBack(['/tabs/repairstatus']);
    })
    .catch((error) => console.log(error));

  }

  // onConfirm() {
  //   this.faio.show({
  //     title: 'ArtEvent Security',
  //     disableBackup: true
  //   })
  //   .then((result: any) => {
  //     console.log(result);
  //     this.confirmBill().then((data) => {
  //       alert(data);
  //     }).then(() => {
  //       this.nav.navigateBack(['/tabs/repairstatus']);
  //     });
  //   });

  // }

    async onConfirm() {
     await this.faio.show({
        title: 'ArtEvent Security',
        disableBackup: true
      }).then(async (result: any) => {
        console.log(result);
        await this.confirmBill().then((data) => {
          alert(data);
        }).then(async () => {
          // console.log('มาก่อนหรือหลัง');
        await this.nav.navigateBack(['/tabs/repairstatus']);
        });
      });
  }


  async confirmBill() {
    if ( this.sum4 > 0) {
      const loading2 = await this.loadingCtrl.create({
        spinner: 'dots',
        message: ''
      });
      await loading2.present();
      for (const up1 of this.repairReceive) {
        this.isSub2 = true;
        this.sub2 = this.service.updateQaRepairBillFinishQty(this.repairID, up1.repair_Item.toString(), up1.ToQa.toString())
        .subscribe((data) => { console.log('ใส่ข้อมูลแล้ว', data); },
          async (err) => {
            console.log(err);
          },
          async () => {
            this.isSub3 = true;
            // เช็คสถานะพร้อมอัพเดทสถานะ
            this.sub3 = this.service.updateQaRepairBill(this.repairID).subscribe((data2) => {
              console.log(data2);
              },
              async (err) => {
                console.log(err);
              },
              async () => {
                console.log('อัพเดทสถานะแล้ว');
              }
              );
            });
      }
      await loading2.dismiss();
      return ('บันทึกข้อมูลเรียบร้อย');
    } else {
      alert('ไม่มีข้อมูล');
      return ('Error');
    }
  }


  async openShowReason(i: RepairReceiveItems) {
    const modal = await this.modal.create({
      component: PopupRepairReasonPage,
      componentProps: {
        userSelected: i,
        repairID: this.repairID,
      }
    });
    modal.onWillDismiss().then(dataReturn => {
      // console.log(dataReturn.data);
      });
    return await modal.present();
    }


  ngOnDestroy() {
    if (this.isSub1) {
      this.sub.unsubscribe();
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
