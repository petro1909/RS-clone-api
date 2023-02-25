import nodemailer from "nodemailer";
export default class EmailService {
    sendEmail(reciever, text) {
        const senderEmail = "officialzenapp@gmail.com";
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: senderEmail,
                pass: "wqtjppknwfjkvqii",
            },
        });
        const mailOptions = {
            from: senderEmail,
            to: reciever,
            subject: "subject",
            text: text,
        };
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err);
            } else {
                console.log("Email sent:" + info.response);
            }
        });
    }
}
