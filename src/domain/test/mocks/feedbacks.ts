import { FeedbackModel } from '@/domain/models'

export const mockFeedback = (): FeedbackModel => ({
  type: 'BUG',
  comment: 'comment',
  userId: 'userId',
  screenshot: 'data:image/png;base64screenshot.jpg',
})

export const mockFeedbacks = (): FeedbackModel[] => [
  mockFeedback(),
  mockFeedback(),
  mockFeedback(),
]
