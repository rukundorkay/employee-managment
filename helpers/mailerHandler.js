import nodemailer from  "nodemailer";

export const sendMail = async(ReceiverEmail, output,subject) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "sg2plzcpnl453271.prod.sin2.secureserver.net",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'quotation@securisafrica.net', // generated ethereal user
            pass: 'uYZtB1hqRcjL', // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Awesomity challenge 👻" <quotation@securisafrica.net>', // sender address
        to: ReceiverEmail, // list of receivers
        subject: subject, // Subject line
        //text: "Hello world?", // plain text body
        html: output, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
