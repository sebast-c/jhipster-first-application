import { type ILocation } from '@/shared/model/location.model';

export interface IDepartment {
  id?: number;
  departmentName?: string;
  location?: ILocation | null;
}

export class Department implements IDepartment {
  constructor(
    public id?: number,
    public departmentName?: string,
    public location?: ILocation | null,
  ) {}
}
