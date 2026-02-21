import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HrService } from './hr.service';

@ApiTags('HR Platform')
@Controller('v1')
export class HrController {
  constructor(private readonly hrService: HrService) {}

  @Get('modules')
  modules() {
    return this.hrService.getModuleCatalog();
  }

  @Post('attendance/check-in')
  checkIn(@Body() body: { employeeId: string; latitude: number; longitude: number; ip: string }) {
    return this.hrService.attendanceCheckIn(body);
  }

  @Post('payroll/calculate')
  payrollCalculate(@Body() body: { gross: number; tax: number; socialSecurity: number; overtime: number; deductions: number }) {
    return this.hrService.calculatePayroll(body.gross, body.tax, body.socialSecurity, body.overtime, body.deductions);
  }
}
