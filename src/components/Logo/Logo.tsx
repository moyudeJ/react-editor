import React, { FC, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Typography, Space } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import styles from './Logo.module.scss'
import { HOME_PATHNAME, MANAGE_INDEX_PATHNAME } from '../../router'
import { useGetUserInfo } from '../../hooks/useGetUserInfo'

const { Title } = Typography

const Logo: FC = () => {
  const [pathName, setPathName] = useState(HOME_PATHNAME)
  const { username } = useGetUserInfo()

  useEffect(() => {
    if (username) {
      setPathName(MANAGE_INDEX_PATHNAME)
    }
  }, [username])

  return (
    <div className={styles.container}>
      <Link to={pathName}>
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>问卷系统</Title>
        </Space>
      </Link>
    </div>
  )
}

export default Logo
