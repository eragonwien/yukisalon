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

  constructor(private service: MainService) { }

  ngOnInit() {
    this.getBgStyle();
  }

  getBgStyle(){
    if (this.imgName) {
      this.bgStyle["background-image"]=`url('assets/images/${this.imgName}')`;
    }
  }
}


