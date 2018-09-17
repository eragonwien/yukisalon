import { Component, OnInit } from "@angular/core";
import { MainService } from "../main.service";
import { Salon } from "../models/salon";
import { About } from "../models/about";
import { Product } from "../models/product";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"]
})
export class AboutComponent implements OnInit {
  title: string;
  aboutSalon: About;
  aboutOwner: About;
  features: Product[];
  featuresCount: number = 3;

  constructor(private mainService: MainService) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.mainService.getSalonData().subscribe((salon: Salon) => {
      this.title = "Über uns";
      this.aboutSalon = {
        title: "Über " + salon.name,
        text: salon.about.text,
        extraText: salon.about.extraText
      };
      this.aboutOwner = {
        title: "Über " + salon.owner.name,
        text: salon.owner.name + " " + salon.owner.description,
        extraText: salon.owner.extraInfo
      };
      this.features = this.mainService.getFeatures(salon.categories, this.featuresCount);
    });
  }
}
