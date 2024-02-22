import React, { FC, Suspense } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Button, Space, Divider, message } from 'antd'
import { useRequest } from 'ahooks'
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons'
import Loading from '../components/Loading/Loading'
import styles from './ManageLayout.module.scss'
import { createQuestionService } from '../services/question'

const ManageLayout: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const { run: handlerClick } = useRequest(createQuestionService, {
    manual: true,
    onSuccess: result => {
      message.success('创建成功')
      nav(`/question/edit/${result.id}`)
    },
  })

  return (
    <div className={styles.container}>
      <Space className={styles.left} direction="vertical">
        <Button type="primary" size="large" icon={<PlusOutlined />} onClick={handlerClick}>
          创建问卷
        </Button>
        <Divider style={{ borderTop: 'transparent' }} />
        <Button
          type={pathname.startsWith('/manage/list') ? 'default' : 'text'}
          size="large"
          icon={<BarsOutlined />}
          onClick={() => nav('/manage/list')}
        >
          我的问卷
        </Button>
        <Button
          type={pathname.startsWith('/manage/star') ? 'default' : 'text'}
          size="large"
          icon={<StarOutlined />}
          onClick={() => nav('/manage/star')}
        >
          星标问卷
        </Button>
        <Button
          type={pathname.startsWith('/manage/trash') ? 'default' : 'text'}
          size="large"
          icon={<DeleteOutlined />}
          onClick={() => nav('/manage/trash')}
        >
          回收站
        </Button>
      </Space>
      <div className={styles.right}>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  )
}

export default ManageLayout
