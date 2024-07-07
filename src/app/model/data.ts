export interface loginData {
    phone: string,
    password: string,
    userType?: string
}

export interface landlordData {
    id: string,
    name: string,
    phone: string,
    email: string,
    upi: string,
    photo: string,
    signature: string,
    password: string,
    userType: string
}

export interface rentBillData {
    adjustUnit: number,
    billingDate: string,
    consumer_Name: string,
    currentUnit: number,
    dueAmount: number,
    dueDate: string,
    eBill: number,
    electric_status: string,
    final_amt: number,
    id: string,
    landlord_id: string,
    landlord_name: string,
    paid_amt: number,
    payment_date: string,
    perunit: number,
    previousUnit: number,
    rent: number,
    rentholder_id: string,
    totalAmount: number,
    totalUnit: number,
    unitAdv: number,
    water_bill: number
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
    userType: string
}