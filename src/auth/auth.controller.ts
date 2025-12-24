import { Controller, Post, Body, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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

    return this.authService.login(user);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const { token } = await this.authService.login(req.user);
    console.log('NODE_ENV:', process.env.NODE_ENV);
    console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
    
    // Force trim to avoid whitespace issues
    const nodeEnv = (process.env.NODE_ENV || '').trim();
    console.log(`Current NODE_ENV: '${nodeEnv}'`);
    
    const isProduction = nodeEnv === 'production';
    console.log('Is Production:', isProduction);

    const frontendUrl = isProduction
      ? 'https://modofit.shop' 
      : (process.env.FRONTEND_URL || 'http://localhost:3001');
      
    console.log('Redirecting to:', frontendUrl);
    res.redirect(`${frontendUrl}/sso-callback?token=${token}`);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Req() req) {
    return this.authService.getProfile(req.user.userId);
  }
}
