import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('Shifts')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('shifts')
export class ShiftsController {
  constructor(private readonly shiftsService: ShiftsService) {}

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: 'Create a new shift' })
  @ApiResponse({ status: 201, description: 'The shift has been successfully created.' })
  create(@Body() createShiftDto: CreateShiftDto) {
    return this.shiftsService.create(createShiftDto);
  }

  @Get()
  @Roles('admin', 'employee')
  @ApiOperation({ summary: 'Get all shifts (optional date range)' })
  @ApiQuery({ name: 'start', required: false })
  @ApiQuery({ name: 'end', required: false })
  findAll(@Query('start') start?: string, @Query('end') end?: string) {
    return this.shiftsService.findAll(start, end);
  }

  @Get('user/:userId')
  @Roles('admin', 'employee')
  @ApiOperation({ summary: 'Get shifts for a specific user' })
  findByUser(@Param('userId') userId: string) {
    return this.shiftsService.findByUser(+userId);
  }

  @Get(':id')
  @Roles('admin', 'employee')
  @ApiOperation({ summary: 'Get a shift by ID' })
  findOne(@Param('id') id: string) {
    return this.shiftsService.findOne(+id);
  }

  @Patch(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Update a shift' })
  update(@Param('id') id: string, @Body() updateShiftDto: UpdateShiftDto) {
    return this.shiftsService.update(+id, updateShiftDto);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Delete a shift' })
  remove(@Param('id') id: string) {
    return this.shiftsService.remove(+id);
  }
}
