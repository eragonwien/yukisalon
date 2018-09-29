import { Component, OnInit, Input } from '@angular/core';
import { MainService } from '../../main.service';

@Component({
  selector: 'app-hero-img',
  templateUrl: './hero-img.component.html',
  styleUrls: ['./hero-img.component.css']
})
export class HeroImgComponent implements OnInit {
  @Input() title: String;
  @Input() titleText: String;
  @Input() imgName: String;
  bgStyle: any = {}
  defaultImg: string = "banner2.jpg";

  constructor(private service: MainService) { }

  ngOnInit() {
    this.getBgStyle();
  }

  getBgStyle(){
    if (!this.imgName) {
      this.imgName = this.defaultImg;
    }
    this.bgStyle["background-image"]=`linear-gradient(to top left,rgba(255,192,203, 0.60), rgba(255,192,203, 0.90)), url('assets/images/${this.imgName}')`;
    this.bgStyle["background-position"]='center'

  }
}


