import { HrService } from '../src/modules/hr.service';

describe('HrService payroll', () => {
  it('should calculate net salary', async () => {
    const service = new HrService({} as any);
    const result = await service.calculatePayroll(50000, 3000, 750, 1200, 500);
    expect(result.net).toBe(46950);
  });
});
