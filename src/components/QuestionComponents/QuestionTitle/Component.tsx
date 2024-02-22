import React, { FC } from 'react'
import { Typography } from 'antd'
import { QuestionTitleDefaultProps, QuestionTitlePropType } from './interface'

const { Title } = Typography

const QuestionTitle: FC<QuestionTitlePropType> = props => {
  const { text, level, isCenter } = { ...QuestionTitleDefaultProps, ...props }

  const getFontSize = (level: number) => {
    if (level === 1) return '24px'
    if (level === 2) return '20px'
    if (level === 3) return '16px'

    return '16px'
  }

  return (
    <Title
      level={level}
      style={{
        marginBottom: 0,
        fontSize: getFontSize(level as number),
        textAlign: isCenter ? 'center' : 'start',
      }}
    >
      {text}
    </Title>
  )
}

export default QuestionTitle
