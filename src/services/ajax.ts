import axios from 'axios'
import { message } from 'antd'
import { getToken } from '../utils/user-token'

const instance = axios.create({
  timeout: 10 * 1000,
})

instance.interceptors.request.use(
  config => {
    config.headers.Authorization = `Bearer ${getToken()}`

    return config
  },
  error => Promise.reject(error)
)

instance.interceptors.response.use(res => {
  const resData = (res.data || {}) as ResType
  const { errorno, data, msg } = resData

  if (errorno !== 0) {
    if (msg) {
      message.error(msg)
    }

    // throw new Error(msg)
    return {}
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data as any
})

export default instance

export type ResType = {
  errorno: number
  msg?: string
  data?: ResDataType
}

export type ResDataType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}
