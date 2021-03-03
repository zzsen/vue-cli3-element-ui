import axios from 'axios'
import Qs from 'qs'

// 仅用于开发服对接
const headers = {
  useraccount: 'test1@test.com'
}

const axiosParams = {
  baseURL: '/api',
  timeout: 10000, // 10秒超时
  responseType: 'json',
  paramsSerializer: function (params) {
    return Qs.stringify(params, { arrayFormat: 'brackets' })
  },
  withCredentials: true // 跨站点访问
}

if (process.env.NODE_ENV === 'development') {
  axiosParams.headers = headers
}

const Axios = axios.create(axiosParams)

// 拦截器
Axios.interceptors.request.use(config => {
  config.data = ~['put', 'post', 'patch'].indexOf(config.method)
    ? config.data
    : config.data
  return config
})

Axios.interceptors.response.use(response => {
  return response
  // return response.data.Code === 0
  //   ? Promise.resolve(response.data.extdata)
  //   : Promise.reject(response.message)
})

export default Axios
