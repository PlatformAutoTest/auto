import request from '@/utils/request'
// export const defaultArticleData: IArticleData = {
//   id: 0,
//   status: 'draft',
//   title: '',
//   fullContent: '',
//   abstractContent: '',
//   sourceURL: '',
//   imageURL: '',
//   timestamp: '',
//   platforms: ['a-platform'],
//   disableComment: false,
//   importance: 0,
//   author: '',
//   reviewer: '',
//   type: '',
//   pageviews: 0
// }

export const getArticles = (params: any) =>
  request({
    url: '/testapi',
    method: 'get',
    params
  })
