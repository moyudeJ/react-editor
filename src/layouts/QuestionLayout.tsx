import React, { FC, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Loading from '../components/Loading/Loading'
import { useLoadUserData } from '../hooks/useLoadUserData'
import { useNavPage } from '../hooks/useNavPage'

const QuestionLayout: FC = () => {
  const { waitingUserData } = useLoadUserData()

  useNavPage(waitingUserData)

  return (
    <div style={{ height: '100vh' }}>
      <div>
        <Suspense fallback={<Loading />}>{!waitingUserData && <Outlet />}</Suspense>
      </div>
    </div>
  )
}

export default QuestionLayout
