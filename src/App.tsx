import React from 'react'
import { RouterProvider } from 'react-router-dom'
// import 'normalize.css'
import 'antd/dist/reset.css'
import router from './router'

function App() {
  return <RouterProvider router={router} />
}

export default App
