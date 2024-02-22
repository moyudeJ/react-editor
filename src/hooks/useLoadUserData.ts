import { useState, useEffect } from 'react'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import { loginReducer } from '../store/userReducer'
import { useGetUserInfo } from './useGetUserInfo'
import { getUserInfoService } from '../services/user'

export const useLoadUserData = () => {
  const [waitingUserData, setWaitingUserData] = useState(true)
  const { username } = useGetUserInfo()
  const dispatch = useDispatch()
  const { run } = useRequest(
    async () => {
      const data = await getUserInfoService()
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        const { username, nickname } = result

        dispatch(loginReducer({ username, nickname }))
      },
      onFinally() {
        setWaitingUserData(false)
      },
    }
  )

  useEffect(() => {
    if (username) {
      // 存在则返回，不需要重新请求
      setWaitingUserData(false)
      return
    }

    run()
  }, [username])

  return { waitingUserData }
}
