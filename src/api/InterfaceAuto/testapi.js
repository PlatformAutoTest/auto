import request from '@/utils/request';
export const defaultApiData = {
    requestBody: '',
    requestHeaders: '',
    requestParams: '',
    requestValidate: '',
    id: 0,
    apiName: '',
    method: '',
    requestUrl: '',
    lastUpdateM: '',
    verified: false
};
export const getApiDetails = (params) => request({
    url: '/v1/apidetails',
    method: 'get',
    params
});
export const getApiList = (params) => request({
    url: '/v1/testapi',
    method: 'get',
    params
});
//# sourceMappingURL=testapi.js.map