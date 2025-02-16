import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('robots')
export class RobotsController {
  @Get('robots.txt')
  getRobotsTxt(@Res() res: Response) {
    res.type('text/plain').send('User-agent: *\nDisallow: /admin');
  }
}