import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useGetUserInfo } from './useGetUserInfo'
import {
  LOGIN_PATHNAME,
  MANAGE_INDEX_PATHNAME,
  isLoginOrRegister,
  isNoNeedUserInfo,
} from '../router'

export const useNavPage = (waitingUserData: boolean) => {
  const { username } = useGetUserInfo()
  const { pathname } = useLocation()
  const nav = useNavigate()

  useEffect(() => {
    if (waitingUserData) return

    // 已经登录
    if (username) {
      if (isLoginOrRegister(pathname)) {
        // 在登录页或注册页中
        nav(MANAGE_INDEX_PATHNAME) // 跳转到列表
      }
      return
    }

    // 未登录
    if (isNoNeedUserInfo(pathname)) {
      // 不需要用户信息
      return
    } else {
      nav(LOGIN_PATHNAME)
    }
  }, [pathname, username, waitingUserData])
}
