import { Component, OnInit, Input } from '@angular/core';
import { SalonService } from "../../services/salon.service";

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  @Input() title: String;
  @Input() titleText: String;
  @Input() image: String;
  bgStyle: any = {}
  defaultImg: string = "banner.jpeg";
  constructor() { }

  ngOnInit() {
    this.getBgStyle();
  }

  getBgStyle(){
    if (!this.image) {
      this.image = this.defaultImg;
    }
    this.bgStyle["background-image"]=`linear-gradient(to top left,rgba(255,192,203, 0.60), rgba(255,192,203, 0.90)), url('assets/images/${this.image}')`;
    // this.bgStyle["background-image"]=`linear-gradient(to top left,rgba(255,192,203, 0.30), rgba(255,192,203, 0.30)), url('assets/images/${this.image}')`;
    this.bgStyle["background-position"]='center'

  }

}
