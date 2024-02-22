import React, { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

// import Login from '../pages/Login/Login'

import MainLayout from '../layouts/MainLayout'
import ManageLayout from '../layouts/ManageLayout'
import QuestionLayout from '../layouts/QuestionLayout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        Component: lazy(() => import('../pages/Home/Home')),
      },
      {
        path: 'login',
        // element: <Login />,
        Component: lazy(() => import('../pages/Login/Login')),
      },
      {
        path: 'register',
        Component: lazy(() => import('../pages/Register/Register')),
      },
      {
        path: 'manage',
        element: <ManageLayout />,
        children: [
          {
            path: 'list',
            Component: lazy(() => import('../pages/Manage/List/List')),
          },
          {
            path: 'star',
            Component: lazy(() => import('../pages/Manage/Star/Star')),
          },
          {
            path: 'trash',
            Component: lazy(() => import('../pages/Manage/Trash/Trash')),
          },
        ],
      },
    ],
  },
  {
    path: 'question',
    element: <QuestionLayout />,
    children: [
      {
        path: 'edit/:id',
        Component: lazy(() => import('../pages/Question/Edit/Edit')),
      },
      {
        path: 'stat/:id',
        Component: lazy(() => import('../pages/Question/Stat/Stat')),
      },
    ],
  },
  {
    path: '*',
    Component: lazy(() => import('../pages/NotFound/NotFound')),
  },
])

// 常量
export const HOME_PATHNAME = '/'
export const LOGIN_PATHNAME = '/login'
export const REGISTER_PATHNAME = '/register'
export const MANAGE_INDEX_PATHNAME = '/manage/list'
export const MANAGE_STAR_PATHNAME = '/manage/star'
export const MANAGE_TRASH_PATHNAME = '/manage/trash'

export const isLoginOrRegister = (pathname: string) => {
  if ([LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) return true
  return false
}

export const isNoNeedUserInfo = (pathname: string) => {
  if ([HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) return true
  return false
}

export default router
