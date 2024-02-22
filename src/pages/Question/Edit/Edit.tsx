import React, { FC } from 'react'
import EditCanvas from './components/EditCanvas/EditCanvas'
import styles from './Edit.module.scss'
import { useLoadQuestionData } from '../../../hooks/useLoadQuestionData'

const Edit: FC = () => {
  const { loading } = useLoadQuestionData()

  return (
    <div className={styles.container}>
      <div style={{ background: '#fff', height: 40 }}>Header</div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>left</div>
          <div className={styles.main}>
            <div className={styles['canvas-wrapper']}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>right</div>
        </div>
      </div>
    </div>
  )
}

export default Edit
