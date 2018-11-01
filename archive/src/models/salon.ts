import { Address } from "./address";
import { OpenHour } from "./open.hour";
import { Category } from "./category";
import { About } from "./about";
import { Owner } from "./owner";

export interface Salon {
  name: string,
  owner: Owner,
  phone: string,
  email: string,
  facebook: string,
  address: Address,
  about: About,
  openHours: OpenHour[],
  ownerDescription: string,
  description: string,
  descriptionExtra: string,
  categories: Category[]
}