import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { mail: string; password: string }) {
    const { mail, password } = body;
    
    const user = await this.authService.validateUser(mail, password);
    
    if (!user) {
      return { message: 'Credenciales incorrectas' };
    }

    return { 
      message: 'Inicio de sesión exitoso', 
      user,
      token: 'fake-jwt-token-' + Date.now()
    };
  }
}
