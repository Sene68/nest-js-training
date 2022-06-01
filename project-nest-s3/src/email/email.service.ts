import Mail = require('nodemailer/lib/mailer');
import * as nodemailer from 'nodemailer';

import { Injectable } from '@nestjs/common';

interface EmailOptions {
    to: string;
    subject: string;
    html: string;
}

@Injectable()
export class EmailService {
    private transporter: Mail;

    //Gmail의 Password의 경우 2단계 인증도 진행해야하고 앱 비밀번호를 사용해야 전송된다.
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'YOUR_EMAIL', // TODO: config
                pass: 'YOUR_PASSWORD' // TODO: config
            }
        });
    }

    async sendMemberJoinVerification(emailAddress: string, signupVerifyToken: string) {
        const baseUrl = 'http://localhost:3000';

        const url = `${baseUrl}/users/email-verify?signupVerifyToken=${signupVerifyToken}`;

        const mailOptions: EmailOptions = {
            to: emailAddress,
            subject: '가입 인증 메일',
            html: `
              가입확인 버튼를 누르시면 가입 인증이 완료됩니다.<br/>
              <form action="${url}" method="POST">
                <button>가입확인</button>
              </form>
            `
        }
      
        return await this.transporter.sendMail(mailOptions);
    }
}
