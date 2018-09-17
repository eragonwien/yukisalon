import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Salon } from '../models/salon';
import { OpenHour } from '../models/open.hour';
import { Product } from '../models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title: string;
  welcomeTitle: string;
  welcomeText: string;
  welcomeExtraText: string;
  openHours: OpenHour[];
  features: Product[];
  featuresCount: number = 3;

  constructor(private mainService: MainService) { }

  ngOnInit() {
    this.mainService.getSalonData()
      .subscribe((salon: Salon) => {
        this.title = salon.name;
        this.welcomeTitle = "Willkommen in " + this.title;
        this.welcomeText = salon.about ? salon.about.text : "";
        this.welcomeExtraText = salon.about ? salon.about.extraText : "";
        this.openHours = salon.openHours;
        this.features = this.mainService.getFeatures(salon.categories, this.featuresCount);
      });
  }

}
