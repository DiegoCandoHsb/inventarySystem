export interface userDetails {
  lastname: string;
  secondname: string;
  secondlastname: string;
  phone: 0;
  admissionDate: string;
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
  confirmPassword?: string;
  details?: userDetails;
  active?: boolean;
}

export const humanResDefData: hsbUserPlainData = {
  id: "",
  name: "",
  email: "",
  password: "",
  lastname: "",
  secondname: "",
  secondlastname: "",
  phone: 0,
  admissionDate: "",
  remainingDays: 0,
  vacations: [],
  addedDays: 0,
  takenDays: 0,
  permissions: [],
  active: true,
};

export interface hsbUserPlainData {
  id: string;
  name: string;
  email: string;
  password: string;
  details?: userDetails;
  active?: boolean;
  lastname: string;
  secondname: string;
  secondlastname: string;
  phone: 0;
  admissionDate: string;
  remainingDays?: number;
  vacations?: any[];
  addedDays?: number;
  takenDays?: number;
  permissions?: any[];
}
