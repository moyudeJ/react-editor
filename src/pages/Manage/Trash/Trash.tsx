import React, { FC, useState } from 'react'

import { Typography, Table, Empty, Tag, Space, Button, Modal, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import ListSearch from '../../../components/ListSearch/ListSearch'
import { useLoadQuestionList } from '../../../hooks/useLoadQuestionList'
import styles from '../common.module.scss'
import ListPage from '../../../components/ListPage/ListPage'
import { deleteQuestion, updateQuestion } from '../../../services/question'

const { Title } = Typography
const { confirm } = Modal

const Trash: FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])
  const { loading, data = {}, refresh } = useLoadQuestionList({ isDeleted: true })

  const tableColumns = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) => {
        return isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>
      },
    },
    {
      title: '答卷',
      dataIndex: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
  ]

  const { run: recover } = useRequest(
    async () => {
      for await (const id of selectedRowKeys) {
        await updateQuestion(id, { isDeleted: false })
      }
    },
    {
      manual: true,
      debounceWait: 500,
      onSuccess() {
        message.success('恢复成功')
        refresh()
        setSelectedRowKeys([])
      },
    }
  )

  const { run: runDel } = useRequest(
    async () => {
      await deleteQuestion(selectedRowKeys)
    },
    {
      manual: true,
      debounceWait: 500,
      onSuccess() {
        message.success('删除成功')
        refresh()
        setSelectedRowKeys([])
      },
    }
  )

  const del = () => {
    confirm({
      title: '确认彻底删除该问卷',
      icon: <ExclamationCircleOutlined />,
      content: '删除以后不可找回',
      onOk: runDel,
    })
  }

  const TableElement = (
    <>
      <Space style={{ marginBottom: '16px' }}>
        <Button type="primary" disabled={!selectedRowKeys.length} onClick={recover}>
          恢复
        </Button>
        <Button danger disabled={!selectedRowKeys.length} onClick={del}>
          彻底删除
        </Button>
      </Space>
      <Table
        rowSelection={{
          type: 'checkbox',
          onChange: selectedRowKeys => {
            setSelectedRowKeys(selectedRowKeys as string[])
          },
        }}
        dataSource={data.list}
        columns={tableColumns}
        pagination={false}
        rowKey={q => q._id}
      />
      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <ListPage total={data.total} />
      </div>
    </>
  )

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {!data?.list?.length && loading && <Empty description="暂无数据" />}
        {data?.list?.length && !loading && TableElement}
      </div>
    </>
  )
}

export default Trash
