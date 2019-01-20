import { Contact } from "./Contact";
import { Product, Category } from "./Product";
import { User } from "./User";
import { Welcome } from "./Welcome";

export class Salon {
  id: number;
  name: string;
  description: string;
  extraInfo: string;
  contact: Contact[];
  category: Category[];
  user: User[];
  welcome: Welcome;
  isActive: boolean
}

export class EditSalonInfoModel {
  id: number;
  name: string;
  description: string;
  extraInfo: string;
  isActive: boolean;
  welcome: Welcome;

  constructor(salon: Salon) {
    this.id = salon.id;
    this.name = salon.name;
    this.description = salon.description;
    this.extraInfo = salon.extraInfo;
    this.isActive = salon.isActive;
    this.welcome = salon.welcome;
  }
}
