import React, { FC, useState, useEffect } from 'react'
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import { Pagination } from 'antd'
import { LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE_PARAM_KEY, LIST_PAGE_SIZE } from '../../constant'

type PropsType = {
  total: number
}

const ListPage: FC<PropsType> = props => {
  const { total } = props
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE)
  const [searchParams] = useSearchParams()
  const nav = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
    const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE

    setPage(page)
    setPageSize(pageSize)
  }, [searchParams])

  const handleChange = (page: number, pageSize: number) => {
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString())
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString())

    nav({
      pathname,
      search: searchParams.toString(),
    })
  }

  return <Pagination total={total} pageSize={pageSize} current={page} onChange={handleChange} />
}

export default ListPage
