export class OpenHour {
  id: number;
  day: string;
  open: string;
  close: string
}

export class Contact {
  id: number;
  address1: string;
  address2: string;
  plz: string;
  city: string;
  phone: string;
  facebook: string;
  email: string;
  openHour: OpenHour[]
}

