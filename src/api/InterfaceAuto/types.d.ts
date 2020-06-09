export interface IApiData{
  id:number;
  apiName:string;
  requestUrl:string;
  method:string;
  requestBody:any;
  requestHeaders:any;
  requestParams:any;
  requestValidate:any;
  lastUpdateM:string;
  verified:boolean;
}
export interface IJsonFormatData {
  level:number;
  type:string;
  key:string;
  value:any;
  children:any;
}
