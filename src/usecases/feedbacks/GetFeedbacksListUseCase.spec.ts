import { FeedbacksRepositorySpy } from '@/domain/test'
import { GetFeedbacksListUseCase } from '.'

const feedbacksRepositorySpy = new FeedbacksRepositorySpy()

const submitFeedback = new GetFeedbacksListUseCase(feedbacksRepositorySpy)

describe('Get feedbacks list', () => {
  it('should be able to submit a feedback', async () => {
    await submitFeedback.execute('id')

    expect(feedbacksRepositorySpy.callsCount).toBe(1)
  })

  it('should throw an error if id is empty', async () => {
    const promise = submitFeedback.execute('')

    expect(promise).rejects.toThrow()
  })
})
