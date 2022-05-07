export enum FeedbackTypesEnum {
  BUG = 'Bug',
  IDEA = 'Ideia',
  OTHER = 'Outro',
}

export type FeedbackType = keyof typeof FeedbackTypesEnum

export type FeedbackModel = {
  type: FeedbackType
  comment: string
  screenshot?: string
}
