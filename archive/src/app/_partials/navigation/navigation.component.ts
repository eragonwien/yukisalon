import { Component, OnInit, Input } from '@angular/core';
import { MainService } from '../../main.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  @Input() logo: string;
  defaultLogo: string = "jpeg/logo.jpeg";

  isCollapsed: boolean;

  constructor(private mainService: MainService) { }

  ngOnInit() {
    this.isCollapsed = true;
    this.logo = this.mainService.getImagePathPrefix() + (this.logo ? this.logo : this.defaultLogo);
  }

}
