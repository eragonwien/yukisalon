export class User {
  id: number;
  roleId: number;
  salonId: number;
  name: string;
  email: string;
  password: string;
  description: string;
  extraInfo: string;
  isActive: boolean;
  isDisplayed: boolean;

  constructor(salonId: number) {
    this.salonId = salonId;
  }
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
