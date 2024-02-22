import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { ComponentStateType } from '../store/componentsReducer'

export const useGetComponentInfo = () => {
  const data = useSelector<StateType>(state => state.components) as ComponentStateType
  const { componentList } = data

  return { componentList }
}
