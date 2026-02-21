import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HrService {
  constructor(private readonly prisma: PrismaService) {}

  getModuleCatalog() {
    return {
      organization: ['company profile', 'logo upload', 'payroll config', 'timezone', 'GPS settings', 'working rules'],
      location: ['GPS location', 'radius check', 'multi location', 'remote work mode'],
      shift: ['shift schedule', 'shift code', 'shift benefit', 'individual shift'],
      holiday: ['holiday groups', 'calendar', 'auto apply'],
      employee: ['employee profile', 'import excel', 'export', 'employment status'],
      attendance: ['check in/out', 'GPS validation', 'daily log', 'lateness calculation'],
      leave: ['leave types', 'leave balance', 'leave request', 'leave approval'],
      approval: ['approval chain max 5', 'approver groups', 'dynamic approval routing'],
      payroll: ['salary', 'tax', 'social security', 'overtime', 'deductions', 'export PDF/Excel/Gov'],
      report: ['yearly', 'leave', 'salary', 'tax'],
      certificate: ['template upload', 'auto fill', 'bilingual'],
      project: ['project list', 'assign employee', 'time tracking'],
      news: ['announcement', 'target employee', 'read tracking'],
      credit: ['usage tracking', 'quota limit', 'billing logic']
    };
  }

  async attendanceCheckIn(payload: { employeeId: string; latitude: number; longitude: number; ip: string }) {
    return this.prisma.attendance.create({
      data: {
        employee_id: payload.employeeId,
        attendance_type: 'CHECK_IN',
        at_time: new Date(),
        latitude: payload.latitude,
        longitude: payload.longitude,
        is_gps_valid: true,
        source_ip: payload.ip
      }
    });
  }

  async calculatePayroll(gross: number, tax: number, socialSecurity: number, overtime: number, deductions: number) {
    const net = gross - tax - socialSecurity + overtime - deductions;
    return { gross, tax, socialSecurity, overtime, deductions, net };
  }
}
