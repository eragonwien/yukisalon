export interface OpenHour {
  id: number,
  day: string,
  open: string,
  close: string
}

export interface Contact {
  id: number,
  address1: string,
  address2: string,
  plz: string,
  city: string,
  phone: string,
  facebook: string,
  email: string,
  openHour: OpenHour[]
}

