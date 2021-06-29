export interface StatusRepairMaster {
    repairDocNumber: string;
    qaDocNumber: string;
    OrderNumber: string;
    ProductionTeam: number;
    TotalQty: number;
    avatar: string;
    qaRepair_ID: number;
    TotalFinishQty: number;
    ToQa: number;
    cusStatus: number;
    qaRepairStatus: string;
    statusShow: string;
    qaBill_ID: number;
    showIcon: string;
    userSent: string;
    userReceive: string;
    receiveDate: Date;
    repairDate: Date;
    repairDateThai: string;
    receiveDateThai: string;
    nickNameSent: string;
    nickNameReceive: string;
}
