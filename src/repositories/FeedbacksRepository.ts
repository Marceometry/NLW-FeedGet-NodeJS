export interface FeedbackCreateData {
  type: string
  comment: string
  screenshot?: string
}

export interface FeedbackCreateResponse {
  id: string
}

export interface FeedbacksRepository {
  create: (data: FeedbackCreateData) => Promise<FeedbackCreateResponse>
}
