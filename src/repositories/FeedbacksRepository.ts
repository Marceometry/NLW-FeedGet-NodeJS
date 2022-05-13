import { FeedbackModel } from '@/domain/models'

export interface FeedbackCreateResponse {
  id: string
}

export interface FeedbacksRepository {
  create: (data: FeedbackModel) => Promise<FeedbackCreateResponse>
  getList: (clientId: string) => Promise<FeedbackModel[]>
  delete: (id: string) => Promise<boolean>
  deleteAll: (clientId: string) => Promise<boolean>
  deleteMany: (feedbacks: string[]) => Promise<boolean>
}
