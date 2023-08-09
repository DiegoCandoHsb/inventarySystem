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
  };
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
  confirmPassword: ""
}
