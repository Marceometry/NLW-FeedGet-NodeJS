import { FeedbacksRepositorySpy, MailAdapterSpy } from '@/domain/test'
import { FeedbackModel, FeedbackType } from '@/domain/models'
import { SubmitFeedbackUseCase, SubmitFeedbackUseCaseRequest } from '.'

const feedbacksRepositorySpy = new FeedbacksRepositorySpy()
const mailAdapterSpy = new MailAdapterSpy()

const submitFeedback = new SubmitFeedbackUseCase(
  feedbacksRepositorySpy,
  mailAdapterSpy
)

const payload: SubmitFeedbackUseCaseRequest = {
  type: 'BUG',
  comment: 'comment',
  screenshot: 'data:image/png;base64screenshot.jpg',
  username: 'username',
  email: 'email',
  userId: 'id',
}

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await submitFeedback.execute(payload)

    expect(feedbacksRepositorySpy.callsCount).toBe(1)
    expect(mailAdapterSpy.callsCount).toBe(1)
  })

  it('should throw an error if type is empty', async () => {
    const promise = submitFeedback.execute({
      ...payload,
      type: '' as FeedbackType,
    })

    expect(promise).rejects.toThrow()
  })

  it('should throw an error if comment is empty', async () => {
    const promise = submitFeedback.execute({ ...payload, comment: '' })

    expect(promise).rejects.toThrow()
  })

  it('should throw an error if userId is empty', async () => {
    const promise = submitFeedback.execute({ ...payload, userId: '' })

    expect(promise).rejects.toThrow()
  })

  it('should throw an error if screenshot is invalid', async () => {
    const promise = submitFeedback.execute({
      ...payload,
      screenshot: 'screenshot.jpg',
    })

    expect(promise).rejects.toThrow()
  })
})
