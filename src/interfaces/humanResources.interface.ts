export interface userDetails {
  lastname: string;

  secondname: string;

  secondlastname: string;

  phone: number;

  admissionDate?: Date;

  remainingDays?: number;

  vacations?: any[];

  addedDays?: number;

  takenDays?: number;

  permissions?: any[];
}

export interface Hsbuser {
  id: string;

  name: string;

  email: string;

  password: string;

  details?: userDetails;

  active?: boolean;
}
