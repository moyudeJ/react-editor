import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { UserStateType } from '../store/userReducer'

export const useGetUserInfo = () => {
  const user = useSelector<StateType>(state => state.user) as UserStateType
  const { username, nickname } = user

  return { username, nickname }
}
