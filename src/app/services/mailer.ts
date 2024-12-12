import { createTransport } from 'nodemailer';
import {smtpHost, smtpPort, smtpAuthUser, smtpAuthPassword, smtpSecure, smtpOwner} from "@/app/config/server"
import AuthenticationWithOtpTemplate from "./mail-templates/AuthenticationWithOtp"
import util from "node:util"
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

const smtpConfig: SMTPTransport.Options = {
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure?true:false,
    auth: {
        user: smtpAuthUser,
        pass: smtpAuthPassword
    },
};

const transporter = createTransport(smtpConfig);

export async function transportOtpToEmail (otp:string, toEmail:string) {
    const mail = util.format( AuthenticationWithOtpTemplate, otp );
    try {
        const status = await transporter.sendMail(
            {
                from: `"${smtpOwner}"<${smtpAuthUser}>`,
                to: toEmail,
                html: mail,
                subject: "OTP NOTIFICATION"
            }
        );
        return status.messageId
    } catch (error) {
        if(error instanceof Error){
            console.log(error);
            throw new Error('unable to Notify user'+toEmail)
        }
    }
}