import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userData: any) {
    return this.authService.register(userData);
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('carPlateNumber') carPlateNumber: string,
  ) {
    return this.authService.login(email, carPlateNumber);
  }
}
