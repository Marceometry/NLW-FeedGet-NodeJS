import { FeedbackModel } from '@/domain/models'

export type FeedbackCreateData = FeedbackModel

export interface FeedbackCreateResponse {
  id: string
}

export interface FeedbacksRepository {
  create: (data: FeedbackCreateData) => Promise<FeedbackCreateResponse>
}
