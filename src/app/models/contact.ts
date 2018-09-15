import { Address } from "./address";
import { OpenHour } from "./open.hour";
import { Owner } from "./owner";

export interface Contact {
  name: string,
  owner: Owner,
  address: Address,
  phone: string,
  email: string,
  facebook: string,
  openHours: OpenHour[]
}