import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import { LOGIN_PATHNAME } from '../../router'
import styles from './UserInfo.module.scss'
import { removeToken } from '../../utils/user-token'
import { useGetUserInfo } from '../../hooks/useGetUserInfo'

const UserInfo: FC = () => {
  const nav = useNavigate()
  const { username, nickname } = useGetUserInfo()

  const logout = () => {
    removeToken()
    message.success('退出成功')
    nav(LOGIN_PATHNAME)
  }

  const UserInfo = (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <UserOutlined />
        {nickname}
      </span>
      <Button type="link" onClick={logout}>
        退出
      </Button>
    </>
  )

  const Login = (
    <Link to={LOGIN_PATHNAME} className={styles.login}>
      登录
    </Link>
  )

  return <>{username ? UserInfo : Login}</>
}

export default UserInfo
