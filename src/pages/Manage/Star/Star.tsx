import React, { FC } from 'react'
import { Typography, Empty } from 'antd'
import ListSearch from '../../../components/ListSearch/ListSearch'
import QuestionCard from '../../../components/QuestionCard/QuestionCard'
import { useLoadQuestionList } from '../../../hooks/useLoadQuestionList'
import styles from '../common.module.scss'
import ListPage from '../../../components/ListPage/ListPage'

const { Title } = Typography

const Star: FC = () => {
  const { loading, data = {} } = useLoadQuestionList({ isStar: true })

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {!data?.list?.length && loading && <Empty description="暂无数据" />}
        {!loading &&
          data?.list?.length &&
          data?.list?.map((q: any) => {
            const { _id } = q

            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer}>
        <ListPage total={data.total} />
      </div>
    </>
  )
}

export default Star
