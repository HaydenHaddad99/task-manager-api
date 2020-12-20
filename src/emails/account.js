const sgMail = require('@sendgrid/mail')
const sendgridApiKey = "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"

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {


    sgMail.send({
        to: email,
        from: 'hayden.haddad@gmail.com',
        subject: 'Welcome to Hh_llc',
        text: `Welcome to the app,${name}. let me know how it goes4`
    })

}

const sendCancelationEmail = (email, name) => {


    sgMail.send({
        to: email,
        from: 'hayden.haddad@gmail.com',
        subject: 'Your account has been removed',
        text: `Sorry to see leave,${name}. Please let us if we can do better`
    })

}

module.exports = {

    sendWelcomeEmail, sendCancelationEmail
}
