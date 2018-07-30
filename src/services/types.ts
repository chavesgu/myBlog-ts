export interface Login {
  user:string,
  password:string
}

export interface Register {
  user:string,password:string,email:string,phone:number,code:number
}

export interface OldChangePass {
  oldPass:string,newPass:string
}

export interface PhoneChangePass {
  newPass:string,
  code:number
}

export interface UpdateUserInfo {
  user?:string,
  photo?:string,
  email?:string,
  phone?:number
}