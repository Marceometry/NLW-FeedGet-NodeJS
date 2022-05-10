import { FeedbackModel } from '@/domain/models'

export interface FeedbackCreateResponse {
  id: string
}

export interface FeedbacksRepository {
  create: (data: FeedbackModel) => Promise<FeedbackCreateResponse>
  getList: (userId: string) => Promise<FeedbackModel[]>
}
