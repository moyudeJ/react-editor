import Component from './Component'
import { QuestionTitleDefaultProps } from './interface'

export * from './interface'

// 组件的配置
export default {
  title: '标题',
  type: 'questionTitle',
  Component,
  defaultProps: QuestionTitleDefaultProps,
}
