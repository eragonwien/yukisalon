import { Component } from '@angular/core';
import { SalonService } from "../services/salon.service";
import { Welcome } from "../models/Welcome"
import { Salon } from "../models/Salon"
import { Contact } from '../models/Contact';
import { Category } from '../models/Product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [SalonService]
})
export class HomeComponent {

  title: string;
  welcome: Welcome;
  contacts: Contact[];
  categories: Category[];

  constructor(private salonService: SalonService) {}

  ngOnInit(): void {
    this.salonService.Salon.subscribe((salon: Salon) => {
      this.welcome = salon.welcome[0]; // first
      this.contacts = salon.contact;
      this.categories = salon.category;
      this.title = salon.name;
    });
  }
}
