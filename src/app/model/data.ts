export interface loginData{
    phone:string,
    password:string,
    userType?:string
}

export interface landlordData{
    id:string,
    name:string,
    phone:string,
    email:string,
    upi:string,
    photo?:string,
    signature?:string,
    password:string,
    userType:string,
    termNconditions:boolean
}