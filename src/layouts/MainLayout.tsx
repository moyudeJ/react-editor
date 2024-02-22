import React, { FC, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import Logo from '../components/Logo/Logo'
import UserInfo from '../components/UserInfo/UserInfo'
import Loading from '../components/Loading/Loading'
import styles from './MainLayout.module.scss'
import { useLoadUserData } from '../hooks/useLoadUserData'
import { useNavPage } from '../hooks/useNavPage'

const { Header, Content, Footer } = Layout

const MainLayout: FC = () => {
  const { waitingUserData } = useLoadUserData()

  useNavPage(waitingUserData)

  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo />
        </div>
      </Header>
      <Content className={styles.main}>
        <Suspense fallback={<Loading />}>{!waitingUserData && <Outlet />}</Suspense>
      </Content>
      <Footer className={styles.footer}>问卷系统 &copy; 2024 - present. Created by buildX</Footer>
    </Layout>
  )
}

export default MainLayout
