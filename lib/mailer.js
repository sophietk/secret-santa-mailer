const nodemailer = require('nodemailer')

class Mailer {
  constructor ({ host, secureConnection, port, auth }) {
    this.transporter = nodemailer.createTransport({
      host,
      secureConnection,
      port,
      auth: {
        user: auth.user,
        pass: auth.pass
      }
    }, {
      from: 'noreply@secret-santa-mailer.dev'
    })
  }

  sendMail ({ from, to, subject, html }) {
    return new Promise((resolve, reject) => {
      this.transporter.sendMail({
        from,
        to,
        subject,
        html
      }, (err, data) => {
        if (err) {
          reject(err)
          return
        }
        if (data.rejected.length > 0) {
          reject(data)
          return
        }
        resolve(data)
      })
    })
  }
}

module.exports = Mailer
