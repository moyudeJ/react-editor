import React, { FC, useEffect, useState } from 'react'
import Nprogress from 'nprogress'

const Loading: FC = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      Nprogress.start()
      setVisible(true)
    }, 100)

    return () => {
      clearTimeout(timer)
      Nprogress.done()
    }
  }, [])

  if (!visible) return null

  return <div>loading...</div>
}

export default Loading
