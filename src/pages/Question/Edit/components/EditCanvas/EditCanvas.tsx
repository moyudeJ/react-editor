import React, { FC } from 'react'
import QuestionTitle from '../../../../../components/QuestionComponents/QuestionTitle/Component'
import QuestionInput from '../../../../../components/QuestionComponents/QuestionInput/Component'
import styles from './EditCanvas.module.scss'
import { Spin } from 'antd'
import { useGetComponentInfo } from '../../../../../hooks/useGetComponentInfo'

type PropsType = {
  loading: boolean
}

const EditCanvas: FC<PropsType> = props => {
  const { loading } = props
  const { componentList } = useGetComponentInfo()

  console.log(componentList)

  if (loading) return <Spin style={{ textAlign: 'center' }} />

  return (
    <div className={styles.canvas}>
      <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionTitle />
        </div>
      </div>
      <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionInput />
        </div>
      </div>
    </div>
  )
}

export default EditCanvas
