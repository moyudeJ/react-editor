import React, { useState, useEffect } from 'react'
import type { ChangeEvent, FC } from 'react'
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import { Input } from 'antd'
import { LIST_SEARCH_PARAM_KEY } from '../../constant'

const { Search } = Input

const ListSearch: FC = () => {
  const [keyWord, setKeyWord] = useState('')
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  const nav = useNavigate()

  useEffect(() => {
    const curVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
    setKeyWord(curVal)
  }, [searchParams])

  const onSearch = (value: string) => {
    nav({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`,
    })
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyWord(event.target.value)
  }

  return (
    <Search
      value={keyWord}
      size="large"
      placeholder="输入关键字"
      style={{ width: 260 }}
      onChange={onChange}
      onSearch={onSearch}
    />
  )
}

export default ListSearch
