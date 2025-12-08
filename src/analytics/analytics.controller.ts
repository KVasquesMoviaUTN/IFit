import { Controller, Post, Body, Req, UseGuards, Logger } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('analytics')
export class AnalyticsController {
  private readonly logger = new Logger(AnalyticsController.name);

  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post('track')
  async trackEvent(@Body() createActivityDto: CreateActivityDto, @Req() req: Request) {
    const ip = req.ip || req.connection.remoteAddress || '';
    const userAgent = req.headers['user-agent'] || '';
    
    // Check if user is authenticated via header (manual check or custom guard)
    // For now, we'll rely on the frontend sending the token if available, 
    // but since this endpoint might be called by public users, we can't enforce AuthGuard globally.
    // If we want to link to user, we should decode the token if present.
    
    // Ideally, we use a custom decorator or guard that doesn't throw 401 but attaches user if valid.
    // For simplicity, let's assume the user ID might be passed in metadata or we just track anonymous for now unless we implement OptionalAuthGuard.
    
    // Let's try to extract user from request if AuthGuard was used. 
    // But we can't use AuthGuard('jwt') because it blocks unauthenticated users.
    
    // I'll implement a simple token extraction here or just skip user linking for anonymous for now.
    // Let's assume for now we just track IP/UA. 
    // If the user is logged in, the frontend can send the user ID in metadata, OR we can implement OptionalAuthGuard.
    
    // Let's keep it simple: Public endpoint.
    
    return this.analyticsService.trackEvent(createActivityDto, null, ip as string, userAgent);
  }
}
