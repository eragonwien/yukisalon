import { Component, OnInit } from '@angular/core';
import { Contact } from "../models/Contact";
import { Salon } from "../models/Salon";
import { SalonService } from "../services/salon.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [SalonService]
})
export class ContactComponent implements OnInit {

  contact: Contact;

  constructor(private salonService: SalonService) { }

  ngOnInit() {
    this.salonService.getSalon().subscribe((salon: Salon) => {
      this.contact = salon.contact;
      console.log(salon.contact);
    });
  }

}
