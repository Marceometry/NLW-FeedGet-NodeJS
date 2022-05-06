import nodemailer from 'nodemailer'

export const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'e1cbe926bc4ffc',
    pass: '9ca2c617ececed',
  },
})
