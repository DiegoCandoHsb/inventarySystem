export interface userSignUpData {
  name: string;
  id: string;
  email: string;
  password: string;
  details: {
    lastname: string;
    phone: string;
  };
}

export interface plainData {
  name: string;
  lastname: string;
  id: number;
  phone: number;
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
      phone: string;
    };
  };
  token: string;
}
