import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-hero-img',
  templateUrl: './hero-img.component.html',
  styleUrls: ['./hero-img.component.css']
})
export class HeroImgComponent implements OnInit {
  title: String;
  titleText: String;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.title = this.route.snapshot.data['title'];
    this.titleText = this.route.snapshot.data['titleText'];
  }

}
