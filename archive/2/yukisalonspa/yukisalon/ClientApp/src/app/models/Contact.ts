export class OpenHour {
  id: number = 0;
  day: string;
  open: string;
  close: string;
  isOpen: boolean = false;
}

export class Contact {
  id: number;
  salonId: number;
  address1: string;
  address2: string;
  plz: string;
  city: string;
  phone: string;
  facebook: string;
  email: string;
  openHour: OpenHour[];
  isActive: boolean;

  constructor(salonId: number) {
    this.salonId = salonId;
    this.openHour = [];
  }
}
