import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserActivity } from './entities/user-activity.entity';
import { CreateActivityDto } from './dto/create-activity.dto';
import { Users } from '../users/user.entity';

@Injectable()
export class AnalyticsService {
  private readonly logger = new Logger(AnalyticsService.name);

  constructor(
    @InjectRepository(UserActivity)
    private userActivityRepository: Repository<UserActivity>,
  ) {}

  async trackEvent(
    createActivityDto: CreateActivityDto,
    user: Users | null,
    ip: string,
    userAgent: string,
  ): Promise<void> {
    try {
      const activity = this.userActivityRepository.create({
        ...createActivityDto,
        user: user || undefined,
        ip,
        userAgent,
      });

      await this.userActivityRepository.save(activity);
      // this.logger.log(`Tracked event: ${createActivityDto.action}`);
    } catch (error) {
      this.logger.error(`Failed to track event: ${error.message}`);
    }
  }
}
