export interface loginData {
    phone: string,
    password: string,
    userType?: string,
    fcm_token?:string,
    recaptcha:string
}

export interface landlordData {
    id: string,
    dor:string,
    name: string,
    phone: string,
    email: string,
    upi: string,
    photo: string,
    signature: string,
    password: string,
    userType: string,
    plan:string,
    rcrCount:number,
    account_no:number|null,
    ifsc:string,
    passkey_info:any
}

export interface rentBillData {
    adjustUnit: number,
    billingDate: string,
    bill_period:string,
    consumer_Name: string,
    currentUnit: number,
    dueAmount: number,
    dueDate: string,
    eBill: number,
    split_ebill:string,
    electric_status: string,
    final_amt: number,
    id: string,
    landlord_id: string,
    landlord_name: string,
    paid_amt: number,
    payment_date: string,
    payment_method:string,
    perunit: number,
    previousUnit: number,
    rent: number,
    rentholder_id: string,
    totalAmount: number,
    totalUnit: number,
    unitAdv: number,
    water_bill: number,
    maintenance:number,
    service:number,
    transaction_id:string,
    pendingBills:[{
        id:string,
        billingDate:string,
        amount:number
    }]
}

export interface rentholderData {
    current_unit: number,
    deedURL: string,
    doj: string,
    email: string,
    id: string,
    landlord_id: string,
    landlord_name: string,
    member_count: number,
    name: string,
    paid_amt: number,
    password: string,
    phone: string,
    photo: string,
    rent: number,
    userType: string,
    deposit_amt:number
}

export interface updateRentholderData{
    current_unit?: number,
    deedURL?: string,
    email?: string,
    member_count?: number,
    name?: string,
    password?: string,
    phone?: string,
    photo?: string,
    rent?: number
}