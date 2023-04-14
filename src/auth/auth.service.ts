import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService    
    ) {}

    async signIn(username: string, pwd: string) {
        const user = await this.usersService.findOne(username);
        if (user?.password !== pwd) {
            throw new UnauthorizedException();
        }
        // The "sub" (subject) claim identifies the principal that is the subject of the JWT
        const payload = { username: username, sub: user.id}
        return {
            access_token: await this.jwtService.signAsync(payload),
        }
    }
}
