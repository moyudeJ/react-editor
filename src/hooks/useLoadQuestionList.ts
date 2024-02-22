import { useRequest } from 'ahooks'
import { useSearchParams } from 'react-router-dom'
import {
  LIST_SEARCH_PARAM_KEY,
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_PARAM_KEY,
  LIST_PAGE_SIZE,
} from '../constant'
import { getQuestionList } from '../services/question'

type OptionType = {
  isStar: boolean
  isDeleted: boolean
}

export const useLoadQuestionList = (opt: Partial<OptionType> = {}) => {
  const { isDeleted, isStar } = opt
  const [searchParams] = useSearchParams()

  const { data, loading, error, refresh } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
      const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
      const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE
      const data = await getQuestionList({ keyword, isDeleted, isStar, page, pageSize })

      return data
    },
    {
      refreshDeps: [searchParams],
    }
  )

  return { data, loading, error, refresh }
}
