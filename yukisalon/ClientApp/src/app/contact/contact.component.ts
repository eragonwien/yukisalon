import { Component, OnInit } from '@angular/core';
import { Contact, OpenHour } from "../models/Contact";
import { Salon } from "../models/Salon";
import { SalonService } from "../services/salon.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {

  contacts: Contact[];

  constructor(private salonService: SalonService) { }

  ngOnInit() {
    this.salonService.Salon.subscribe((salon: Salon) => {
      this.contacts = salon.contact;
    });
  }

}
