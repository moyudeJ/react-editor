import React, { FC, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { Button, Space, Divider, Tag, Popconfirm, message, Modal } from 'antd'
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import styles from './QuestionCard.module.scss'
import { duplicateQuestion, updateQuestion } from '../../services/question'

type PropsType = {
  _id: string
  title: string
  isStar: boolean
  isPublished: boolean
  answerCount: number
  createdAt: string
}

const { confirm } = Modal

const QuestionCard: FC<PropsType> = props => {
  const { _id, title, isPublished, answerCount, createdAt, isStar } = props
  const [isStared, setIsStared] = useState(isStar)
  const nav = useNavigate()

  const { run: changeStared, loading: changeStaredLoading } = useRequest(
    async () => {
      await updateQuestion(_id, { isStar: !isStared })
    },
    {
      manual: true,
      onSuccess() {
        setIsStared(!isStared)
        message.success('更新成功')
      },
    }
  )

  const { run: onCopy, loading: duplicateLoading } = useRequest(
    async () => {
      return await duplicateQuestion(_id)
    },
    {
      manual: true,
      onSuccess(result) {
        message.success('更新成功')
        nav(`/question/edit/${result.id}`)
      },
    }
  )

  const { run: runDel, loading: deleteedLoading } = useRequest(
    async () => {
      return await updateQuestion(_id, { isDeleted: true })
    },
    {
      manual: true,
      onSuccess() {
        message.success('删除成功')
      },
    }
  )

  const onDel = () => {
    confirm({
      title: '删除',
      content: '确认删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      onOk: runDel,
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
            <Space>
              {isStared && <StarOutlined style={{ color: 'red' }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
            <span>答卷: {answerCount}</span>
            <span>{createdAt}</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: '12px 0' }} />
      <div className={styles['button-container']}>
        <div className={styles.left}>
          <Space>
            <Button
              size="small"
              type="text"
              icon={<EditOutlined />}
              onClick={() => nav(`/question/edit/${_id}`)}
            >
              编辑问卷
            </Button>
            <Button
              size="small"
              type="text"
              disabled={!isPublished}
              icon={<LineChartOutlined />}
              onClick={() => nav(`/question/stat/${_id}`)}
            >
              数据统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button
              type="text"
              size="small"
              icon={<StarOutlined />}
              disabled={changeStaredLoading}
              onClick={changeStared}
            >
              {isStared ? '取消标星' : '标星'}
            </Button>
            <Popconfirm title="是否复制问卷" okText="确定" cancelText="取消" onConfirm={onCopy}>
              <Button type="text" size="small" icon={<CopyOutlined />} disabled={duplicateLoading}>
                复制
              </Button>
            </Popconfirm>
            <Button
              type="text"
              size="small"
              icon={<DeleteOutlined />}
              onClick={onDel}
              disabled={deleteedLoading}
            >
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
