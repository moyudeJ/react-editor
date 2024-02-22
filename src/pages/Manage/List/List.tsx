import React, { FC, useState, useEffect, useRef, useMemo } from 'react'
import { useDebounceFn, useRequest } from 'ahooks'
import { useSearchParams } from 'react-router-dom'
import { Typography, Spin, Empty } from 'antd'
import ListSearch from '../../../components/ListSearch/ListSearch'
import QuestionCard from '../../../components/QuestionCard/QuestionCard'
// import { useLoadQuestionList } from '../../../hooks/useLoadQuestionList'
import styles from '../common.module.scss'
import { getQuestionList } from '../../../services/question'
import { LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE } from '../../../constant'

const { Title } = Typography

const List: FC = () => {
  // const { loading, data = {} } = useLoadQuestionList()
  const containerRef = useRef<HTMLDivElement>(null)
  const [searchParams] = useSearchParams()
  const [started, setStarted] = useState(false)
  const [list, setList] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const hasMoreData = total > list.length

  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionList({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword: searchParams.get(LIST_PAGE_PARAM_KEY) || '',
      })

      return data
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: l, total } = result

        console.log('result', result)

        setList(list.concat(l))
        setTotal(total)
        setPage(page + 1)
      },
    }
  )

  const { run } = useDebounceFn(
    () => {
      const elem = containerRef.current
      if (elem == null) return
      const domRect = elem.getBoundingClientRect()
      if (domRect == null) return
      const { bottom } = domRect
      if (bottom <= document.body.clientHeight) {
        load() // 真正加载数据
        setStarted(true)
      }
    },
    {
      wait: 1000,
    }
  )

  useEffect(() => {
    run()
  }, [searchParams])

  useEffect(() => {
    if (hasMoreData) {
      window.addEventListener('scroll', run) // 防抖
    }

    return () => {
      window.removeEventListener('scroll', run) // 解绑事件，重要！！！
    }
  }, [searchParams, hasMoreData])

  const loadMoreElement = useMemo(() => {
    if (loading || !started) return <Spin />
    if (total === 0) return <Empty description="暂无数据" />
    if (!hasMoreData) return <span>没有更多了...</span>

    return <span>开始加载下一页</span>
  }, [loading, hasMoreData, started, total])

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q

            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{loadMoreElement}</div>
      </div>
    </>
  )
}

export default List
