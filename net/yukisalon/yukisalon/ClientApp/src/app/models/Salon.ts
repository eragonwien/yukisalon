import { Contact } from "./Contact";
import { Product, Category } from "./Product";
import { User } from "./User";
import { Welcome } from "./Welcome";

export interface Salon {
  id: number,
  name: string,
  description: string,
  extraInfo: string,
  contact: Contact,
  category: Category[],
  user: User,
  welcome: Welcome
}
