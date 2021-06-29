import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingController } from '@ionic/angular';

import { RepairReceiveItems } from 'src/app/models/repairReceiveItems';
import { QasalesService } from 'src/app/services/qasales.service';
import { AuthService } from 'src/app/auth/auth.service';
import { UserLogin } from 'src/app/models/userLogin';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { PopupRepairReasonPage } from 'src/app/tabs/repairstatus/receive-repair/popup-repair-reason/popup-repair-reason.page';


@Component({
  selector: 'app-repair-finish-detail',
  templateUrl: './repair-finish-detail.page.html',
  styleUrls: ['./repair-finish-detail.page.scss'],
})
export class RepairFinishDetailPage implements OnInit {

  sub: Subscription;

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

  checkSumToqa = 0;

  isSub1 = false;
  isSub2 = false;
  isSub3 = false;
  isSub4 = false;
  isSub5 = false;

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
    // console.log(this.repairID);
  }

  ionViewWillEnter() {
    this.isSub1 = false;
    this.isSub2 = false;
    this.isSub3 = false;
    this.isSub4 = false;
    this.isSub5 = false;
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
      //  console.log(this.repairReceive.reduce(()));
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

}
