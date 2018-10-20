import { Component } from '@angular/core';
import { SalonService } from "../services/salon.service";
import { Welcome } from "../models/Welcome"
import { Salon } from "../models/Salon"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [SalonService]
})
export class HomeComponent {

  title: string;
  welcome: Welcome;

  constructor(private salonService: SalonService) {}

  ngOnInit(): void {
    this.salonService.getSalon().subscribe((salon: Salon) => {
      this.welcome = salon.welcome;
      this.title = salon.name;
    });
  }
}
