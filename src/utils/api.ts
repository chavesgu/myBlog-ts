import Axios,{AxiosRequestConfig} from 'axios'
import qs from 'qs';
import store from '../store/'

//添加请求拦截器
Axios.interceptors.request.use(config => {
  //在发送请求之前做某事，比如说 设置loading动画显示
  store.commit('loadingStart');
  return config
}, error => {
  //请求错误时做些事
  return Promise.reject(error)
});
//添加响应拦截器
Axios.interceptors.response.use(response => {
  //对响应数据做些事，比如说把loading动画关掉
  store.commit('loadingOver');
  return response.data
}, error => {
  //请求错误时做些事
  // if (error.response.status===401){
  //
  // }
  store.commit('loadingOver');
  return Promise.reject(error)
});


export default Axios.create({
  baseURL: process.env.NODE_ENV==="development"?'/api':'https://admin.chavesgu.com',

  transformRequest: [function (data, headers) {
    // Do whatever you want to transform the data
    return qs.stringify(data);
  }],

  // `transformResponse` allows changes to the response data to be made before
  // it is passed to then/catch
  transformResponse: [function (data) {
    // Do whatever you want to transform the data
    return data;
  }],

  // `headers` are custom headers to be sent
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },

  // `params` are the URL parameters to be sent with the request
  // Must be a plain object or a URLSearchParams object
  // params: {
  //   ID: 12345
  // },

  // `data` is the data to be sent as the request body
  // Only applicable for request methods 'PUT', 'POST', and 'PATCH'
  // When no `transformRequest` is set, must be of one of the following types:
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - Browser only: FormData, File, Blob
  // - Node only: Stream, Buffer
  // data: {
  //   firstName: 'Fred'
  // },

  // `timeout` specifies the number of milliseconds before the request times out.
  // If the request takes longer than `timeout`, the request will be aborted.
  timeout: 10000,

  // `withCredentials` indicates whether or not cross-site Access-Control requests
  // should be made using credentials
  withCredentials: true, // default

  // `responseType` indicates the type of data that the server will respond with
  // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // default

  // `onUploadProgress` allows handling of progress events for uploads
  // onUploadProgress: function (progressEvent) {
  //   // Do whatever you want with the native progress event
  // },

  // `onDownloadProgress` allows handling of progress events for downloads
  // onDownloadProgress: function (progressEvent) {
  //   // Do whatever you want with the native progress event
  // },

  // `maxContentLength` defines the max size of the http response content in bytes allowed
  // maxContentLength: 2000,

  // `validateStatus` defines whether to resolve or reject the promise for a given
  // HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
  // or `undefined`), the promise will be resolved; otherwise, the promise will be
  // rejected.
  // validateStatus: function (status) {
  //   return status >= 200 && status < 300; // default
  // },
});