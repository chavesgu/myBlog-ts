export interface State {
  info:{
    user?:string,
    photo?:string,
    email?:string,
    phone?:number,
  }|null,
  needUpdateInfo:boolean
}