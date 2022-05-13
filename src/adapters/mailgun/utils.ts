import { FeedbackTypesEnum } from '@/domain/models'
import { SendMailData } from '@/adapters'

export const getEmailHtml = ({
  user,
  type,
  comment,
  screenshot,
}: SendMailData) => {
  const screenshotHTML = screenshot
    ? [
        `Acesse o dashboard para ver a screenshot: https://feedget.online/dashboard`,
      ]
    : [`Esse feedback não possui screenshot.`]

  return [
    `<table style="width: 100%; font-family: sans-serif; background-color: rgb(244, 244, 245); color: rgb(24, 24, 27);">`,
    `<thead><tr><th style="box-sizing: border-box; width: 100%; padding: 24px; text-align: center; background-color: #8257e6; color: rgb(244, 244, 245);">`,
    `<h1 style="margin: 0; width: 100%">Olá, ${user.name}! Temos um novo feedback.</h1></th></tr></thead>`,
    `<tbody><tr><td style="padding: 24px; text-align: center">`,
    `<h2 style="margin: 0">${FeedbackTypesEnum[type]}</h2>`,
    `<p style="margin: 24px 0">${comment}</p>`,
    ...screenshotHTML,
    `</td></tr></tbody></table>`,
  ].join('\n')
}
