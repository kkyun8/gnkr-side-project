import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email, password);
    return user;
  }

  async login(user: User) {
    const { id, name, image } = user;
    const payload = { id, name, image };
    return {
      token: this.jwtService.sign(payload),
      user: { id, name, image },
    };
  }
}
