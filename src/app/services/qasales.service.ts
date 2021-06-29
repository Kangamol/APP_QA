import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserLogin } from './../models/userLogin';
import { Qastatus } from './../models/qastatus';
import { QaReceiveMaster } from './../models/qaReceiveMaster';
import { QaReceiveDetail } from './../models/qaReceiveDetail';
import { QaStatusDetail } from './../models/qastatusdetail';
import { StatusRepairMaster } from './../models/statusRepairMaster';
import { RepairReceiveItems } from './../models/repairReceiveItems';
// import { StatusOrder } from './../models/statusOrder';
import { QaFinishMaster } from './../models/qaFinishMaster';
import { QaFinishDetail } from 'src/app/models/qaFinishDetail';
import { RepairTypePopup } from './../models/repairTypePopup';
import { OrderStatusDetail } from 'src/app/models/orderStatusDetail';
import { OrderStatusMaster } from 'src/app/models/orderStatusMaster';
import { ReportRepairByOrder } from 'src/app/models/reportRepairByOrder';
import { ViewBillOrderItem } from 'src/app/models/viewBillOrderItem';
import { OrderDetailSumRepair } from 'src/app/models/orderDetailSumRepair'
import { ReportRepairByItem } from 'src/app/models/reportRepairByItem'

@Injectable({
  providedIn: 'root'
})
export class QasalesService {

  mainApi = 'http://172.16.0.2:3000/';

  constructor(private http: HttpClient) { }

  // แสดงข้อมูลสถานะของแต่ละ Order Tab4
  getOrderStatus(saleID: string): Observable<OrderStatusMaster[]> {
    return this.http.get<OrderStatusMaster[]>(`${this.mainApi}orderStatusSales/${saleID}`);
  }

  // แสดงข้อมูลสถานะของแต่ละ Item ของ Order Tab4
  getOrderDetail(orderNumber: string): Observable<OrderStatusDetail[]> {
    return this.http.get<OrderStatusDetail[]>(`${this.mainApi}OrderDetailSale?orderNumber=${orderNumber}`);
  }

  // ดึงข้อมูล Report งานซ่อม แบบ Order
  reportRepairbyOrder(orderNumber: string): Observable<ReportRepairByOrder[]> {
    return this.http.get<ReportRepairByOrder[]>(`${this.mainApi}reportRepairbyorder?orderNumber=${orderNumber}`);
  }

  // ดึงข้อมูล Report งานซ่อม แบบItem Popup
  // reportRepairbyItem(orderNumber: string, OrderItem: number): Observable<ReportRepairByOrder[]> {
  //   return this.http.get<ReportRepairByOrder[]>(`${this.mainApi}reportRepairbyitem/${OrderItem}?orderNumber=${orderNumber}`);
  // }

  // (TAB1 หน้าดึงรูป เปลี่ยนรูป TAB 1)
  appUser(userid: string): Observable<UserLogin> {
    return this.http.get<UserLogin>(`${this.mainApi}getuser/${userid}`);
  }

  // (สถานะงานในกแผนก QA TAB 2 )
  qaStatus(manager: string): Observable<Qastatus[]> {
    return this.http.get<Qastatus[]>(`${this.mainApi}qaStatus/${manager}`);
  }
  // (สถานะงานในกแผนก QA กดเข้าไปดูเป็นรายการเพื่อนำไปQA เสร็จหรือส่งซ่อม TAB 2 )
  qaStatusDetail(billID: string): Observable<QaStatusDetail[]> {
    return this.http.get<QaStatusDetail[]>(this.mainApi + 'qaStatusItems/' + billID);
  }

  // (รับงานจา่กFac เข้า แผนก QA TAB 3)
  qaBillReceive(saleManger: string): Observable<QaReceiveMaster[]> {
    return this.http.get<QaReceiveMaster[]>(`${this.mainApi}qabillreceive/${saleManger}`);
  }

  // (กดรับงานจากFac เข้าแผนก QA Detail TAB 3)
  qaItemsReceive(billID: string): Observable<QaReceiveDetail[]> {
    return this.http.get<QaReceiveDetail[]>(`${this.mainApi}qaBillReceiveitems/${billID}`);
  }

  // (ดูสถานะการซ่อม และ หน้าแรกของกดรับงานซ่อม TAB4)
  statusRepairMaster(sales: string): Observable<StatusRepairMaster[]> {
    return this.http.get<StatusRepairMaster[]>(`${this.mainApi}qaStatusRepair/${sales}`);
  }

  // (รับงานซ่อมที่กลับมาจากผลิต TAB4 Detail)
  repairReceiveItems(repairID: string): Observable<RepairReceiveItems[]> {
    return this.http.get<RepairReceiveItems[]>(`${this.mainApi}repairbillreceivefacitems/${repairID}`);
  }

  // แสดงสถานะของOrder TAB5
  // statusOrder(fact: string): Observable<StatusOrder[]> {
  //   return this.http.get<StatusOrder[]>(`${this.mainApi}wipfact/${fact}`);
  // }

  // ยืนยันรับงานที่ส่งลงมาจากฝ่ายผลิต TAB 2(เปลี่ยนสถานะ)
  confirmBillreceive(billID: string, status: string) {
    return this.http.put(`${this.mainApi}updateQaBillStatus/${billID}/${status}`, {
    });
  }

  // ยืนยันรับงานที่ส่งลงมาจากฝ่ายผลิต TAB 2(แสดงชื่อ และ วันที่รับ)
  confirmBillreceiveShowUser(billID: string, receiver: string) {
    return this.http.put(`${this.mainApi}updateQaBillReceiver/${billID}/${receiver}`, {
    });
  }

  // ยืนยันรับงานซ่อม ใส่ข้อมูลไปที่ ToQA Tab3 รับงานซ่อม
  updateQaRepairBillFinishQty(repairID: string, repairItem: string, ToQa: string) {
    return this.http.put(`${this.mainApi}updateQaRepairBillFinishQty/${repairID}/${repairItem}/${ToQa}`, {
    });
  }
  // ยืนยันส่งงานไปซ่อม เช็คข้อมูลว่า RepairFinish เท่ากับ QTY หรือยัง Tab3 รับงานซ่อม
  checkRepairBillFinish(repairID: string): Observable<any> {
    return this.http.get<any>(`${this.mainApi}checkRepairBillFinish/${repairID}`);
  }

  // อัพเดท Status ของรับงานซ่อม เมื่อ RepairFinish เท่ากับ QTY เมื่องานครบ Tab3 รับงานซ่อม
  updateQaRepairBill(repairID: string) {
    return this.http.put(`${this.mainApi}updateQaRepairBill/${repairID}`, {
    });
  }


  insertRepairBillMaster(i: any): Observable<number> {
    const body = {
      repairDocNumber: i.repairDocNumber,
      qaBill_ID: i.qaBill_ID,
      userID: i.userID,
      OrderNumber: i.OrderNumber,
      receiver: i.receiver
    };
    // console.log('api -> ', body);
    return this.http.post<number>(this.mainApi + 'insertRepairBillMaster', body);
  }

  insertRepairBillDetail(i: any): Observable<any> {
    // insertRepairBillDetail(i: any) {
    const body = {
      qaRepair_ID: Number(i.qaRepair_ID),
      repair_Item: Number(i.repair_Item),
      bill_Item: Number(i.bill_Item),
      repairTypeID: Number(i.repairTypeID),
      Qty: Number(i.Qty)
    };
    // console.log('i service = ', i);
    // console.log('body service = ', body);
    // return true;
    return this.http.post<any>(this.mainApi + 'insertRepairBillDetail', body);
  }

  // แสดงข้อมูลอาการเสีย Input 1 PopupRepair
  repairTypeMaster(): Observable<any[]> {
    return this.http.get<any[]>(`${this.mainApi}repairTypeMaster`);
  }
  // แสดงข้อมูลอาการเสีย โดยส่ง Value Input 1 มา Input 2 PopupRepair
  repairTypeDetail(typeID: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.mainApi}repairTypeDetail/${typeID}`);
  }

  // แสดงข้อมูลอาการเสีย โดยส่งไม่ได้ส่งค่าอะไรมา
  repairTypeDetail2(): Observable<any[]> {
    return this.http.get<any[]>(`${this.mainApi}repairTypeDetail*`);
  }

  // ยืนยันงานตรวจเสร็จ Master Tab1 qaStatus
  insertFinishMaster(i: any): Observable<number> {
    const body = {
      finishDocNumber: i.finishDocNumber,
      qaBill_ID: i.qaBill_ID,
      userID: i.userID,
      OrderNumber: i.OrderNumber,
      receiver: i.receiver
    };
    // console.log('api -> ', body);
    return this.http.post<number>(this.mainApi + 'insertFinishMaster', body);
  }

  // ยืนยันงานตรวจเสร็จ Detail Tab1 qaStatus
  insertFinishDetail(i: any): Observable<any> {
    const body = {
      qaFinish_ID: Number(i.qaFinish_ID),
      finish_Item: Number(i.finish_Item),
      bill_Item: Number(i.bill_Item),
      Qty: Number(i.Qty)
    };
    // console.log('i service = ', i);
    // console.log('body service = ', body);
    // return true;
    return this.http.post<any>(this.mainApi + 'insertFinishDetail', body);
  }

  // ใส่เหตุผลอาการเสียตอนส่งซ่อม Tab1 qaStatus
  insertRepairReason(i: any): Observable<any> {
    const body = {
      qaRepairID: Number(i.qaRepairID),
      repairItem: Number(i.repairItem),
      reasonNo: Number(i.reasonNo),
      typeID: Number(i.typeID),
      Qty: Number(i.Qty)
    };
    // console.log('แสดงอาการเสีย = ', body);
    return this.http.post<any>(this.mainApi + 'insertRepairReason', body);
  }

  // Qa เสร็จ Master Tab1
  qaFinishMaster(sales: string): Observable<QaFinishMaster[]> {
    return this.http.get<QaFinishMaster[]>(`${this.mainApi}qaFinishMaster/${sales}`);
  }

  // Qa เสร็จ Detail Tab1
  qaFinishDetail(finishID: string): Observable<QaFinishDetail[]> {
    return this.http.get<QaFinishDetail[]>(`${this.mainApi}qaFinishDetail/${finishID}`);
  }

  // แสดงอาการเสีย
  repairTypePopup(repairID: number, repairItem: number): Observable<RepairTypePopup[]> {
    return this.http.get<RepairTypePopup[]>(`${this.mainApi}getRepairReason/${repairID}/${repairItem}`);
  }

  // เช็คค่า QTY ในบิลซ่อม ไม่ให้เกิน Bill
  checkQtyRepair(billID: number, billItem: number): Observable<QaStatusDetail> {
    return this.http.get<QaStatusDetail>(`${this.mainApi}checkQtyRepair/${billID}/${billItem}`);
  }

  // ยกเลิกบิลซ่อม
  cancelBillRepair(repairID: string) {
    return this.http.put(`${this.mainApi}cancelBillRepair/${repairID}`, {
    });
  }

  // ดูอาการเสีย
  getRepairReason(repairID: string, repairItem: number): Observable<any> {
    return this.http.get<any>(this.mainApi + 'getRepairReason/' + repairID + '/' + repairItem);
  }

  repairFinishMaster(salesID: string): Observable<StatusRepairMaster[]> {
    return this.http.get<StatusRepairMaster[]>(`${this.mainApi}repairFinishMaster/${salesID}`);
  }

  // ดูข้อมูล Billของแต่ละ Item ใน Order 14-12-2563 Popup => OrderDetail
  viewBillOrderItem(orderNumber: string, OrderItem: number): Observable<ViewBillOrderItem[]> {
    return this.http.get<ViewBillOrderItem[]>(`${this.mainApi}viewBillOrderItem/${OrderItem}?orderNumber=${orderNumber}`);
  }

  orderDetailSumRepair(orderNumber): Observable<OrderDetailSumRepair[]> {
    return this.http.get<OrderDetailSumRepair[]>(`${this.mainApi}orderDetailSumRepair/?orderNumber=${orderNumber}`)
  }

  orderRepairByType(orderNumber: string, typeID: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.mainApi}orderRepairByType/${typeID}?orderNumber=${orderNumber}`);
  }

  // ดึงข้อมูล Report งานซ่อม แบบItem Popup
  reportRepairbyItem(orderNumber: string, OrderItem: number): Observable<ReportRepairByItem[]> {
    return this.http.get<ReportRepairByItem[]>(`${this.mainApi}reportRepairbyitem/${OrderItem}?orderNumber=${orderNumber}`);
  }
}
