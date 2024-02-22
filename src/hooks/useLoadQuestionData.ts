import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useRequest } from 'ahooks'
import { getQuestionService } from '../services/question'
import { resetComponents } from '../store/componentsReducer'

export const useLoadQuestionData = () => {
  const { id = '' } = useParams()
  const dispatch = useDispatch()

  const { run, data, loading } = useRequest(
    async (id: string) => {
      if (!id) throw new Error('查无问卷')

      const data = await getQuestionService(id)
      return data
    },
    { manual: true }
  )

  useEffect(() => {
    run(id)
  }, [id])

  useEffect(() => {
    if (!data) return
    const { componentList } = data

    dispatch(resetComponents({ componentList }))
  }, [data])

  return { loading }
}
