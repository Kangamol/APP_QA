export interface QaStatusDetail {
    qaBill_ID: number;
    qaDocNumber: string;
    userID: number;
    billDate: string;
    receiver: number;
    receiveDate: string;
    qaBillStatus: string;
    bill_Item: number;
    OrderNumber: string;
    OrderItemNo: number;
    ProductID: string;
    Qty: number;
    ProductCode: string;
    ProductDesc: string;
    NewPict: string;
    SelectQaFinish: number;
    SelectToRepair: number;
    repairTypeID: number;
    RepairQty: number;
    FinishQty: number;
    RepairFinish: number;
    RepairSent: number;
}

