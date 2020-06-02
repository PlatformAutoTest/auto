import request from '@/utils/request'
import {IApiData} from "@/api/InterfaceAuto/types";
export const defaultApiData:IApiData = {
  requestBody: '',
  requestHeaders: '',
  requestParams: '',
  requestValidate: '',
  id:0,
  apiName:'',
  method:'',
  requestUrl:'',
  lastUpdateM:'',
  verified:false
}
export const getApiDetails = (params: any) =>
  request({
    url: '/v1/apidetails',
    method: 'get',
    params
  })
export const getApiList = (params: any) =>
  request({
    url: '/v1/testapi',
    method: 'get',
    params
  })
