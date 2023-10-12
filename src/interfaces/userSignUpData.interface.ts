import { Vacations } from "./user.interface";

export interface userSignUpData {
  id: string;
  name: string;
  email: string;
  password: string;
  details: {
    lastname: string;
    secondname: string;
    secondlastname: string;
    phone: string;
    payroll: "Yes" | "No";
    // vacations
    vacations?: Vacations[];
  };
  active: boolean;
}

export interface UserPlainData {
  name: string;
  lastname: string;
  secondname: string;
  id: string;
  secondlastname: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  active: boolean;
  payroll: "Yes" | "No";
  // dates data
  vacations: Vacations[];
  admissionDate: string
}

export interface LoginResponseData {
  user: {
    name: string;
    id: string;
    email: string;
    password: string;
    details: {
      lastname: string;
      secondname: string;
      secondlastname: string;
      phone: string;
      payroll: "Yes" | "No";
      // dates data
      vacations: Vacations[];
    };
  };
  token: string;
}

export const defaultUserData: UserPlainData = {
  name: "",
  lastname: "",
  secondname: "",
  secondlastname: "",
  id: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
  active: true,
  payroll: "Yes",
  // dates data
  vacations: [],
  admissionDate:''
};
