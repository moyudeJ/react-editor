import type { FC } from 'react'
import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput'
import QuestionTitleConf, { QuestionTitlePropType } from './QuestionTitle'

// 统一，各个组件的 props type
export type ComponentPropsType = QuestionInputPropsType & QuestionTitlePropType

// 统一，组件的配置
export type ComponentConfType = {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}

// 全部组件配置的列表
const componentConfList: ComponentConfType[] = [QuestionInputConf, QuestionTitleConf]

// 根据类型找到对应组件
export function getComponentConfByType(type: string) {
  return componentConfList.find(c => c.type === type)
}
