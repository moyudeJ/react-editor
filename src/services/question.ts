import axios, { ResDataType } from './ajax'

type SearchOption = {
  keyword: string
  isStar: boolean
  isDeleted: boolean
  page: number
  pageSize: number
}

// 获取单个问卷信息
export async function getQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/${id}`
  const data = (await axios.get(url)) as ResDataType

  return data
}

// 创建问卷
export async function createQuestionService(): Promise<ResDataType> {
  const data = (await axios.post('/api/question')) as ResDataType

  return data
}

// 获取问卷列表
export async function getQuestionList(opt: Partial<SearchOption>): Promise<ResDataType> {
  const data = (await axios.get('/api/question', { params: opt })) as ResDataType

  return data
}

// 更新问卷
export async function updateQuestion(
  id: string,
  opt: { [key: string]: any }
): Promise<ResDataType> {
  const url = `/api/question/${id}`
  const data = (await axios.patch(url, opt)) as ResDataType

  return data
}

// 复制问卷
export async function duplicateQuestion(id: string): Promise<ResDataType> {
  const url = `/api/question/duplicate/${id}`
  const data = (await axios.post(url)) as ResDataType

  return data
}

// 彻底删除
export async function deleteQuestion(ids: string[]): Promise<ResDataType> {
  const url = '/api/question'
  const data = (await axios.delete(url, { data: { ids } })) as ResDataType

  return data
}
