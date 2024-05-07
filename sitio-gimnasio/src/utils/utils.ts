import { createTransport } from "nodemailer";

export function sendMail(mailTo: string, asunto: string, text: string) {
    createTransport({
        service: "gmail",
        auth: {
            user: process.env.NEXT_PUBLIC_EMAIL,
            pass: process.env.NEXT_PUBLIC_PASSWORD
        }
    }).sendMail({
        from: process.env.NEXT_PUBLIC_EMAIL,
        to: mailTo,
        subject: asunto,
        text: text,
    }).catch(err => console.log(err))
}