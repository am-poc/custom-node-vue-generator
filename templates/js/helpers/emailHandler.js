const nodemailer = require('nodemailer');
const smtpConfig = {
    service: "Gmail",
    secure: true, // use SSL
    auth: {
        user: 'abdul.muhsin104@gmail.com',
        pass: 'flex@43300'
    }
};
const transporter = nodemailer.createTransport(smtpConfig)


// verify connection configuration
transporter.verify(function(error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take our messages');
    }
});


exports.sendEmail = async (subject, message, receiver, sender, attachment) => {
    //console.log({attachment})
    var mailOptions = {
        from: sender,
        to: receiver,
        subject: subject,
        text: message,
        attachments:[{   // filename and content type is derived from path
            path: `${attachment}`
        }]
    };

    return new Promise((resolve, reject) =>
        {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                reject(error)
            } else {
                console.log('Email sent: ' + info.response);
                resolve('Email sent: ' + info.response)
            }
        })
    })


}
