import * as uuid from 'uuid';
import { EmailService } from 'src/email/email.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    constructor(private emailService: EmailService) { }

    async createUser(name: string, email: string, password: string) {
        await this.checkUserExists(email);
    
        const signupVerifyToken = uuid.v1();
    
        await this.saveUser(name, email, password, signupVerifyToken);
        await this.sendMemberJoinEmail(email, signupVerifyToken);
    }
    
    private checkUserExists(email: string) {
        return false; // TODO: DB 연동 후 구현
    }
    
    private saveUser(name: string, email: string, password: string, signupVerifyToken: string) {
        return; // TODO: DB 연동 후 구현
    }
    
    private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
        await this.emailService.sendMemberJoinVerification(email, signupVerifyToken);
    }
}
