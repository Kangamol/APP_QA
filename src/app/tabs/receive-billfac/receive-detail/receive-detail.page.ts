import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { QaReceiveDetail } from './../../../models/qaReceiveDetail';
import { QasalesService } from './../../../services/qasales.service';

import { UserLogin } from 'src/app/models/userLogin';
import { AuthService } from 'src/app/auth/auth.service';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';

@Component({
  selector: 'app-receive-detail',
  templateUrl: './receive-detail.page.html',
  styleUrls: ['./receive-detail.page.scss'],
})
export class ReceiveDetailPage implements OnInit, OnDestroy {

  qaReceiveDetail: QaReceiveDetail[];
  sub: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  isSub1 = false;
  isSub2 = false;
  isSub3 = false;
  user: UserLogin;

  sum1 = 0;

  receivedata = {
    OrderNumber: '',
    billId: ''
  };

  fact = '';
  showIcon = '';
  billQA;
  dateReceive;
  saleTeam = '';
  userSent = '';
  nickNameSent = '';
  thaiDate = '';

  constructor(private nav: NavController,
              private route: ActivatedRoute,
              private service: QasalesService,
              private loadingCtrl: LoadingController,
              private authService: AuthService,
              private faio: FingerprintAIO) {
                      this.receivedata.billId = this.route.snapshot.paramMap.get('bill_Id');
                      this.receivedata.OrderNumber = this.route.snapshot.paramMap.get('OrderNumber');
                      this.fact = this.route.snapshot.paramMap.get('fact');
                      this.showIcon = this.route.snapshot.paramMap.get('showIcon');
                      this.saleTeam = this.route.snapshot.paramMap.get('saleTeam');
                      this.userSent = this.route.snapshot.paramMap.get('userSent');
                      this.nickNameSent = this.route.snapshot.paramMap.get('nickNameSent');
                      this.thaiDate = this.route.snapshot.paramMap.get('thaiDateBill');
                    }

  ngOnInit() {
    this.user = this.authService.getUserInfo();
    // console.log('USer + ' , this.user);
    // console.log(this.receivedata);
    this.isSub1 = false;
    this.isSub2 = false;
    this.isSub3 = false;
    this.loadItemreceive();
  }

  async loadItemreceive() {
    this.isSub1 = true;
    const loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'กำลังโหลด'
    });
    await loading.present();

    this.sub = await this.service.qaItemsReceive(this.receivedata.billId).subscribe(
      (data: any) => {
        this.qaReceiveDetail = data;
        this.billQA = this.qaReceiveDetail[0].qaDocNumber;
        this.dateReceive = this.qaReceiveDetail[0].receiveDate;
        // console.log(data);
      },
      async (error) => {
        console.log(error);
        await loading.dismiss();
      },
      async () => {
        this.sum1 = 0;
        this.qaReceiveDetail.forEach((item) => {
          this.sum1 = this.sum1 + item.Qty;
          // this.sum1 = this.sum1 + item.Qty;
        });
        await loading.dismiss();
      });
  }

  onConfirm() {
    this.faio.show({
      title: 'ArtEvent Security',
      disableBackup: true
    })
    .then((result: any) => {
      console.log(result);
      this.confirmBill();
      alert('บันทึกข้อมูลเรียบร้อย');
      this.nav.navigateBack(['/tabs/receive-billfac']);
    })
    .catch((error) => console.log(error));
  }

  async confirmBill() {
    // console.log('UserID', this.user[0].userID);
    // console.log('billID', this.receivedata.billId);
    this.isSub2 = true;
    this.sub2 =  this.service.confirmBillreceive(this.receivedata.billId, '1').subscribe(
      (data2) => {
      // console.log('Insert Success');
    });
    this.isSub3 = true;
    this.sub3 = this.service.confirmBillreceiveShowUser(this.receivedata.billId, this.user[0].userID).subscribe(
      (data) => {
        // console.log('Insert User');
      });
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
  }


}
