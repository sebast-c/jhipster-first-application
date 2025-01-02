import { type IDepartment } from '@/shared/model/department.model';

export interface IEmployee {
  id?: number;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  hireDate?: Date | null;
  salary?: number | null;
  commissionPct?: number | null;
  manager?: IEmployee | null;
  department?: IDepartment | null;
}

export class Employee implements IEmployee {
  constructor(
    public id?: number,
    public firstName?: string | null,
    public lastName?: string | null,
    public email?: string | null,
    public phoneNumber?: string | null,
    public hireDate?: Date | null,
    public salary?: number | null,
    public commissionPct?: number | null,
    public manager?: IEmployee | null,
    public department?: IDepartment | null,
  ) {}
}
