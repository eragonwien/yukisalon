import { Component, OnInit } from '@angular/core';
import { OpenHour } from '../../models/open.hour';
import { MainService } from '../main.service';
import { Salon } from '../../models/salon';
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  openHours: OpenHour[];
  contact: Contact;

  constructor(private mainService: MainService) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.mainService.getSalonData()
      .subscribe((salon: Salon) => {
        this.openHours = salon.openHours;
        this.contact = {
          name: salon.name,
          address: salon.address,
          email: salon.email,
          facebook: salon.facebook,
          openHours: salon.openHours,
          owner: salon.owner,
          phone: salon.phone
        };
      });
  }

}
