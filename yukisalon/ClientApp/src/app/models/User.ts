export class User {
  id: number;
  roleId: number;
  name: string;
  email: string;
  password: string;
  description: string;
  extraInfo: string;
  isActive: boolean;
}

export class Role {
  id: number;
  title: string;
  description: string;
}

export class LoginUser {
  email: string;
  password: string;
}
