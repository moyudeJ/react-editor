import React, { FC, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Typography, Space, Form, Input, Checkbox, Button, message } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import styles from './Login.module.scss'
import { MANAGE_INDEX_PATHNAME, REGISTER_PATHNAME } from '../../router'
import { loginService } from '../../services/user'
import { setToken } from '../../utils/user-token'

const { Title } = Typography

const USER_KEY = 'USERNAME'
const PASSWORD_KEY = 'PASSWORD'

// 记住用户
const rememberUser = (username: string, password: string) => {
  localStorage.setItem(USER_KEY, username)
  localStorage.setItem(PASSWORD_KEY, password)
}

// 删除用户
const deleteUserFromStorage = () => {
  localStorage.removeItem(USER_KEY)
  localStorage.removeItem(PASSWORD_KEY)
}

// 获取用户信息
const getUserInfoFromStorage = () => {
  return {
    username: localStorage.getItem(USER_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
  }
}

const Login: FC = () => {
  const [form] = Form.useForm()
  const nav = useNavigate()
  const { run: login } = useRequest(
    async values => {
      const { username, password } = values

      return await loginService(username, password)
    },
    {
      manual: true,
      onSuccess(result) {
        const { token } = result
        message.success('登录成功')
        setToken(token)
        nav(MANAGE_INDEX_PATHNAME)
      },
    }
  )

  const onFinish = (values: any) => {
    // 记住，就写入
    if (values.remember) {
      rememberUser(values.username, values.password)
    } else {
      deleteUserFromStorage()
    }

    login(values)
  }

  useEffect(() => {
    const { username, password } = getUserInfoFromStorage()

    form.setFieldsValue({ username, password })
  }, [])

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>登录</Title>
        </Space>
      </div>
      <div>
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} onFinish={onFinish} form={form}>
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              { min: 5, max: 20, type: 'string', message: '字符长度在 5-20 之间' },
              { pattern: /^\w+$/, message: '只能是字母数字下划线' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="remember" wrapperCol={{ offset: 8 }} valuePropName="checked">
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 18, offset: 6 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to={REGISTER_PATHNAME}>去注册</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
